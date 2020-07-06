---
layout: post
title: "Milestone 4 of the gita project: speedup"
date: 2020-07-01 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the fourth milestone where we speedup the sub-command execution for
multiple repos. Specifically, we will use `gita pull` as example.

The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- **milestone 4: speedup**
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

In the previous posts, the `gita pull` command executes `git pull` in each
repo sequentially.
This is NOT efficient for multiple repos:
if the remote server of the first repo responds slowly, the execution for all
other repos is delayed.

There are two obvious solutions

1. use multiple CPU cores for multiple repos
1. switch to the next repo while waiting for the current one

Note that the second solution doesn't require extra CPU cores.

The first solution is **parallelism**.
For example, each core can work on one task. When a core finishes a task, it
grabs a new one, say, from a task queue.
This is commonly implemented as a process pool, where the number of workers
equal to the number of CPU cores.
Our git delegation tasks are particularly simple since they are independent of
each other. Such tasks are called [embarrassingly parallelizable](https://en.wikipedia.org/wiki/Embarrassingly_parallel).

The second solution is **context switch**,
which doesn't require multiple cores. It can be implemented with either
a thread pool or a process pool.
When an active task blocks, the scheduler (the program that maintains the
pool) suspends it and puts the CPU resource on another task.
Overall, CPU idle time is reduced.

(If you have never heard of processes and threads, you should definitely look
them up. Roughly speaking, one running program is a process (you can see them
with `ps` or `top` command in terminal),
And a process can have subordinate processes (sub-processes).
Threads are light-weight version of processes and they live inside
processes (try `ps -T` or `top -H` and look for rows with the same PIDs).
**Their main difference is that processes don't share memories whereas threads
of the same process do.** One needs to be careful about multithreading since
different threads can write to the same memory address.)

An example is in order.

```python
# thread_pool_example.py
import time
from multiprocessing.pool import ThreadPool

def run_task(interval: int):
    print(f'{interval}s: start')
    time.sleep(interval)  # This waiting mimics IO block
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
Thus the speedup in this example is fully due to the context switching.

Python standard library provides good support for multiprocessing and multithreading.
The relevant libraries are

* [threading](https://docs.python.org/3.6/library/threading.html)
* [subprocess](https://docs.python.org/3.6/library/subprocess.html)
* multiprocessing.pool.ThreadPool: For some reason this class is not documented.
  You can take a look at this [blog post](http://lucasb.eyer.be/snips/python-thread-pool.html).
* [multiprocessing.Pool](https://docs.python.org/3.6/library/multiprocessing.html#multiprocessing.pool.Pool)
* [concurrent.futures.ThreadPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#threadpoolexecutor)
* [concurrent.futures.ProcessPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#processpoolexecutor)

I encourage you to try them for gita speedup, and compare their performances.

In the  gita project, I used the Python [asyncio library](https://docs.python.org/3.6/library/asyncio.html).
(Note that it requires Python3.6)


It is easy to use as it hides a lot of the low-level details.
If you want to know more details, a good starting point is
[David Beazley's curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/).
The magic keyword `yield` can be used both to give back control to the function
caller and receive control from the caller.




More generally, we can categorize bottlenecks in any running programs as

- CPU-bound: the waiting is due to real computation.
- IO-bound: the waiting is due to data reading/writing.
  It could be from disk, web exchange, etc.

The IO-bound blocks can benefit from the second improvement alone, whereas the
CPU-bound blocks require more computation powers.



- IO block: 1 second
- context switch: $10^3$ ns
- single instruction: $10^{-1}$ ns


instruction per cycle (IPC) *

https://en.wikipedia.org/wiki/Instructions_per_second#Timeline_of_instructions_per_second

Millions of instructions per second (MIPS)



ttp://kegel.com/c10k.html

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

