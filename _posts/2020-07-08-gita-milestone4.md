---
layout: post
title: "Milestone 4 of the gita project: speedup"
date: 2020-07-08 00:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the fourth milestone where we speed up the sub-command execution for
multiple repos.

The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- **milestone 4: speedup**
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

## introduction

In the previous posts, the `gita fetch` command executes `git fetch` in each
repo sequentially.
This is NOT efficient for multiple repos:
if the remote server of the first repo responds slowly, the execution of all
other repos is delayed.

There are two obvious solutions

1. use multiple CPU cores for multiple repos
1. switch to the next repo while waiting for the current one

The second solution doesn't require multiple CPU cores.
And the two solutions can be easily combined.

The first solution is **parallelism**.
For example, each core can work on one task. When a core finishes a task, it
grabs a new one, say, from a task queue.
This is commonly implemented as a process pool, where the number of workers
equal to the number of CPU cores.
Our git delegation tasks are particularly simple as they are independent of
each other: they are [embarrassingly parallelizable](https://en.wikipedia.org/wiki/Embarrassingly_parallel).

The second solution is **context switching**,
which doesn't require multiple cores. It can be implemented with either
a thread pool or a process pool.
When an active task blocks, the scheduler (the program that maintains the
pool) suspends it and puts the CPU resource on another task.
Overall, CPU idle time is reduced.

If you have never heard of processes and threads, it is a good time to look
them up. Roughly speaking, a running program is a process (you can see them
with `ps` or `top` command in terminal),
And a process can have subordinate processes, or sub-processes.
Threads are light-weight version of processes and they live inside
processes (try `ps -T` or `top -H` and look for rows with the same PIDs).
**The main difference is that processes don't share memories whereas threads
of the same process do.** Thus one needs to be extra careful in writing
multithreading code.

More generally, we can categorize bottlenecks in any running programs as

- CPU-bound: the waiting is due to real computation, or
- IO-bound: the waiting is due to data reading/writing, e.g., disk, web, etc.

The CPU-bound blocks require more computation powers, whereas the IO-bound blocks
can benefit from context switching.

An example is in order.

```python3
# thread_pool_example.py
import time
from timeit import default_timer as timer
from multiprocessing.pool import ThreadPool

def run_task(interval: int):
    print(f'{interval}s: start')
    time.sleep(interval)  # This waiting mimics IO block
    print(f'{interval}s: end')

if __name__ == '__main__':
    t0 = timer()
    with ThreadPool() as pool:
        pool.map(run_task, [1, 2, 1])
    t1 = timer()
    print(t1 - t0)
```
Here I use a thread pool to execute 3 trivial tasks. Each task simply sleeps
for some time, which mimics IO block.

Executing this code on my computer gives the following output

```bash
$ python3.7 thread_pool_example.py
1s: start
2s: start
1s: start
1s: end
1s: end
2s: end
2.013366460800171
```
The total execution time is slightly more than 2 seconds, instead of 4 seconds
in the serial case.
By default, the Python thread libraries don't run across different cores.
Thus the speedup in this example is fully due to [context switching](https://en.wikipedia.org/wiki/Context_switch).

There is excellent support for multiprocessing and multithreading in Python.
The relevant libraries are

* [threading](https://docs.python.org/3.6/library/threading.html)
* [subprocess](https://docs.python.org/3.6/library/subprocess.html)
* multiprocessing.pool.ThreadPool: For some reason this class is not documented.
  You can take a look at this [blog post](http://lucasb.eyer.be/snips/python-thread-pool.html).
* [multiprocessing.Pool](https://docs.python.org/3.6/library/multiprocessing.html#multiprocessing.pool.Pool)
* [concurrent.futures.ThreadPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#threadpoolexecutor)
* [concurrent.futures.ProcessPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#processpoolexecutor)

I encourage you to try them for `gita` speedup, and compare their performances.

In the  gita project, I used the Python [asyncio library](https://docs.python.org/3.6/library/asyncio.html)
(It requires Python3.6 and the API changes quite much in Python3.7). In theory it can be more efficient than
process pool or thread pool since it can switch context faster.
In practice, in particular for the gita project, I doubt there are meaningful differences.
I chose it mainly because it's slightly trickier to code.

The Python asyncio library hides all the low-level details.
To understand asynchronous execution, take a look at
[David Beazley's curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/).
Another casual reading is
[A gentle introduction to multithreading](https://www.internalpointers.com/post/gentle-introduction-multithreading).
A more technical reading is [The C10K problem](http://kegel.com/c10k.html).

In the following, I will first present a simple but problematic implementation,
then its fix, and finally unit test.

## a simple implementation with interleaving output

In my first trial, the code looks like this (and the `cmds` is `['git', 'fetch']`):

```python
async def run_async(path: str, cmds: List[str]):
    process = await asyncio.create_subprocess_exec(*cmds, cwd=path)
    await process.wait()
```
Here we create a new sub-process to execute `git fetch` in the specified `path`.
Another piece of code will call this `async` function for each repo.
And the `asyncio` library takes care of the asynchronous context switching
when IO block happens.

However, all these sub-processes share the standard output.
And the `git fetch` outputs from different repos are mixed together.
This problem can be reproduced by the following code

```python
tasks = [
    run_async('.', [
        'python3', '-c',
        f"print({i});import time; time.sleep({i});print({i})"
    ]) for i in range(4)
]
if platform.system() == 'Windows':
    loop = asyncio.ProactorEventLoop()
    asyncio.set_event_loop(loop)
else:
    loop = asyncio.get_event_loop()

try:
    loop.run_until_complete(asyncio.gather(*tasks))
finally:
    loop.close()
```
Here the tasks simply wait. The waiting time is printed
twice, once before and once after the `sleep`.
On my terminal, the output is

```python
0
0
2
1
3
1
2
3
```
Try to reason the ordering.

To fix the output order, we need to stop sharing stdout, which can be
achieved by a `PIPE`.

```python
async def run_async(path: str, cmds: List[str]):
    """
    Run `cmds` asynchronously in `path` directory
    """
    process = await asyncio.create_subprocess_exec(
        *cmds, stdout=asyncio.subprocess.PIPE, cwd=path)
    stdout, _ = await process.communicate()
    stdout and print(stdout.decode())
```

With this update, I managed to disentangle the outputs.
```python
0
0
1
1
2
2
3
3
```

## test async functions

Mocking an async input/output is tricky.
But with the previous example, it is easy to test the output directly

```python
def test_async_output(capfd):
    tasks = [
        utils.run_async('myrepo', '.', [
            'python3', '-c',
            f"print({i});import time; time.sleep({i});print({i})"
        ]) for i in range(4)
    ]
    # I don't fully understand why a new loop is needed here. Without a new
    # loop, "pytest" fails but "pytest tests/test_utils.py" works. Maybe pytest
    # itself uses asyncio (or maybe pytest-xdist does)?
    asyncio.set_event_loop(asyncio.new_event_loop())
    utils.exec_async_tasks(tasks)

    out, err = capfd.readouterr()
    assert err == ''
    assert out == 'myrepo: 0\nmyrepo: 0\n\nmyrepo: 1\nmyrepo: 1\n\nmyrepo: 2\nmyrepo: 2\n\nmyrepo: 3\nmyrepo: 3\n\n'
```

You should also take a look at this article
[Unit Testing AsyncIO Code](https://blog.miguelgrinberg.com/post/unit-testing-asyncio-code)
by Miguel Grinberg.

## v0.4: clean up and tag

This completes milestone 4. At this point, you can optionally tag the
code base using

```
git tag v0.4
```

