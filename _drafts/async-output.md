---
layout: post
title: Handle python asyncio output
date: 2019-02-25 17:00:00 -0500
categories: [coding]
comments: true
tags: [python, asyncio]
---

Recently I have been enhancing a command line tool to manage multiple git repos
(see original blog post [here]({% post_url 2018-02-16-gita %})).
This tool does two things

- display the status of multiple git repos such as branch, modification, commit message side by side
- delegate git commands/aliases from any working directory

The two major features added recently are

- asynchronous execution of git commands so it's much faster
- customization of commands via yaml file so that users are not stuck with my
  choice of git commands and aliases

Several interesting issues poped up during the development, and I will talk
about one from the [python asyncio module](https://docs.python.org/3.6/library/asyncio.html).

I am running multiple git fetch command in several repo directories.
the symptom i had is that when git fetch are run on multiple repos, their
outputs to the screen get interleaved.

## thread pool, process pool and asynchrony

Given multiple computational tasks and fixed resources, how can we finish the
tasks as fast as possible?
To be concrete, let's say we want to download and decompress 10 zip files using
a 4-core CPU.
For simplicity, we can consider the download and decompression of 1 zip file as
a task.

The least efficient is to finish tasks one by one with one CPU core, i.e., serially.
Obviously, 3 out of 4 cores are wasted. In addition, when network or file IO
block, the single working core is idle.

The immediate improvement is to start the next task while waiting for the current one.
Even if only one core is used, there will be less idling as long as more
than 1 tasks are unfinished. This is often implemented as a thread pool.

asynchrony.
Note that I see [asynchrony](<https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)>)

The next obvious improvement is to let all cores work on tasks, i.e., parallelism.
When one core is done with an assigned task, it grabs a new one, say, from a task queue.
This model is commonly implemented as process pool, where the number of workers
equal to the number of CPU cores.

To further improve the efficiency, we can combine parallelism and asynchrony.

{% include youtubePlayer.html id="cN_DpYBzKso" %}

and the slides are available here:
[Concurrency is not Parallelism by Rob Pike](https://talks.golang.org/2012/waza.slide#1)

## the interleaving output problem

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
