---
layout: post
title: Handle python asyncio output
date: 2019-02-25 17:00:00 -0500
categories: [coding]
comments: true
tags: [python, asyncio]
---

Recently I enhanced an old side project called [gita](https://github.com/nosarthur/gita),
which is a command line tool to manage multiple git repos (see original post
[here]({% post_url 2018-02-16-gita %})).
This tool grows out of my need to deal with multiple related repos in daily work.
It does two things

- display the status of multiple git repos such as branch, modification, commit message side by side
- delegate git commands/aliases from any working directory

![gita screenshot](https://github.com/nosarthur/gita/raw/master/screenshot.png)

The two major features added recently are

- asynchronous execution of git commands so it's much faster to `fetch` or `pull`
- command customization via yaml file so users are not stuck with my
  choice of git commands and aliases

Several interesting issues popped up during the development. In this post I
will talk about a [python asyncio](https://docs.python.org/3.6/library/asyncio.html) issue.
Another fun one is writing bash script for auto completion.
Maybe it will be the next post.

To make it more pedagogical, I will first give some background of asynchronous
execution, then talk about the problem I ran into.

## thread pool, process pool, and asynchrony

Given multiple computational tasks and fixed resources, there is the natural
question of how to finish the tasks as fast as possible.

The least efficient way is to run tasks one by one with one CPU core, i.e., serial
execution. Obviously, 3 out of 4 CPU cores are wasted. In addition, when network
or file IO block (IO block is a fancy word for waiting response), the single
'working' core is idle.

The immediate improvement is to start the next task while waiting for the current one.
Even if only one core is used, there will be less idling as long as more
than 1 tasks are unfinished. This idea can be implemented as a thread pool with
more threads than the number of cores. When blocking happens on one thread, the
operating system will schedule work on other threads to utilize the CPU cores.

The next obvious improvement is to let all cores work, i.e., parallelism.
When one core is done with an assigned task, it grabs a new one, say, from a task queue.
This model is commonly implemented as process pool, where the number of workers
equal to the number of CPU cores.

There is another less obvious improvement related to the task switching idea.
For simplicity, let's assume only 1 core is used.
Suppose the tasks all contain long periods of blocking, e.g., making requests to
web servers, retrieving information from database, etc. Even though we have a
switching mechanism, there is no guarantee that we don't switch to another blocking
task. So we could be wasting time making useless switches.

The solution to this problem is a contract such that every switch is effective.
In python, this contract is implemented using coroutines.
The magic keyword `yield` can be used both to give back control to the function
caller and receive control from the caller.
You can find more details from
[David Beazley's curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/).

To further improve the efficiency, we can combine parallelism and asynchrony.
[asynchrony](<https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)>)


{% include youtubePlayer.html id="cN_DpYBzKso" %}

and the slides are available here:
[Concurrency is not Parallelism by Rob Pike](https://talks.golang.org/2012/waza.slide#1)

## python specifics

thread doesn't run 

thread pool and run subprocess in each thread

* threading
* subprocess
* multiprocessing.pool.ThreadPool
* multiprocessing.Pool
* [concurrent.futures.ThreadPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#threadpoolexecutor)
* [concurrent.futures.ProcessPoolExecutor](https://docs.python.org/3.6/library/concurrent.futures.html?highlight=concurrent%20futures#processpoolexecutor)

## the interleaving output problem

I am running multiple git fetch command in several repo directories.
the symptom i had is that when git fetch are run on multiple repos, their
outputs to the screen get interleaved.


In the first trial, the code looks like this (and `cmds` is `['git', 'fetch']`):

```python
async def run_async(path: str, cmds: List[str]):
    process = await asyncio.create_subprocess_exec(*cmds, cwd=path)
    await process.wait()
```

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


