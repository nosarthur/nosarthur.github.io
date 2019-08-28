---
layout: post
title: "Milestone 4 of the gita project: speedup"
date: 2019-08-16 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the fourth milestone where we speedup the sub-command execution for
multiple repos. The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- **milestone 4: speedup**
- milestone 5: miscellaneous topics

So far the `gita pull` command executes `git pull` in each repo sequentially.
This is actually the least efficient way to run multiple tasks.
Suppose the remote server of the first repo has network issues, then the
execution for all other repo need to wait.

There are two obvious improvements

- work on the next repo while waiting for the current one
- use other CPU cores if they are available

Before we commit to any implementation, let's first go over some basics on
operating system (OS) in the next session.

## background: process, thread, and scheduler

If you have never heard of processes and threads, you should definitely look
them up.

Roughly speaking, one running program is a process (you can see them
with `ps` or `top` command in terminal), 

and a process can have subordinate
processes. Threads are light-weight version of processes and they live inside
processes (try `ps -T` and `top -H` and look for rows with the same PIDs).
One big difference is that processes don't share memories while threads of the
same process do. One needs to be careful about multithreading since different
threads could write to the same memory address.


- CPU-bound:
- IO-bound: 

This waiting due to data reading/writing is called IO blocks.

instruction per cycle (IPC) * 

https://en.wikipedia.org/wiki/Instructions_per_second#Timeline_of_instructions_per_second

Millions of instructions per second (MIPS)
    

- [OS Scheduler](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html)


The first improvement is **parallelism**.
For example, each core can work on one task. When a core finishes a task, it
grabs a new one, say, from a task queue.
This is commonly implemented as a process pool, where the number of workers
equal to the number of CPU cores.
Our git delegation tasks are particularly simple since they are independent of
each other. Such tasks are called [embarrassingly parallelizable](https://en.wikipedia.org/wiki/Embarrassingly_parallel).

The second improvement is **context switch**,
which doesn't require multiple cores. It can be implemented with either
a thread pool or a process pool.
When an active task blocks, the scheduler (the program that maintains the
pool) suspends it and puts the CPU resource on another task.
Overall, CPU idle time is reduced.

An example is in order.

```python
# thread_pool_example.py
import time
from multiprocessing.pool import ThreadPool

def run_task(interval: int):
    print(f'{interval}s: start')
    time.sleep(interval)
    print(f'{interval}s: end')

if __name__ == '__main__':
    t0 = time.time()
    with ThreadPool() as pool:
        pool.map(run_task, [1, 2, 1])
    t1 = time.time()
    print(t1 - t0)
```

Here I use a thread pool to execute 3 trivial tasks. Each task simply sleeps
for some time, which mimics IO block.
A thread can be in one of the three states

- waiting
- runnable
- executing

Executing this code on my computer gives the following output

```bash
20:56 chronos (master *) _drafts $ python3.7 thread_pool_example.py
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
Thus the speedup in the example is fully due to the second improvement.

http://kegel.com/c10k.html

There is another improvement on context switch at IO blocks.
A switch is wasted if it switches to another blocked task. This is a real
concern if tasks are long running with intermittent IO blocks.
A better situation is
to somehow maintain a list of ready tasks so all switches are successful.
One way to achieve this is via

[asynchrony](<https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)>).
Even though thread is more light weight than process, the system resource
(memory in particular) can still drain when a lot of threads are requested.

http://kegel.com/c10k.html

In the  gita project, we will use the Python [asyncio library](https://docs.python.org/3.6/library/asyncio.html).
It is easy to use as it hides a lot of the low-level details.
If you want to know more details, a good starting point is
[David Beazley's curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/).
The magic keyword `yield` can be used both to give back control to the function
caller and receive control from the caller.

I also encourage you to try the alternative implementations of threads,
processes, or the corresponding pools, and compare their performances.
The relevant libraries are

* [threading]()
* [subprocess]()
* [multiprocessing.pool.ThreadPool]()
* [multiprocessing.Pool]()
* [concurrent.futures.ThreadPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#threadpoolexecutor)
* [concurrent.futures.ProcessPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#processpoolexecutor)


## use `asyncio`

In the first trial, the code looks like this (and `cmds` is `['git', 'fetch']`):

```python
async def run_async(path: str, cmds: List[str]):
    process = await asyncio.create_subprocess_exec(*cmds, cwd=path)
    await process.wait()
```

## add test


## the interleaving output problem

I am running multiple git fetch command in several repo directories.
The symptom I had is that when git fetch are run on multiple repos, their
outputs to the screen get interleaved.


The terminal outputs are interleaved because `await process.wait()` hands back
control to its caller anytime IO blocks. This problem can be reproduced by the
following code

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


## further readings

- [A gentle introduction to multithreading](https://www.internalpointers.com/post/gentle-introduction-multithreading)

