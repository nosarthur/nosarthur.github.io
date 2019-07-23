---
layout: post
title: Handle python asyncio output
date: 2019-03-25 17:00:00 -0500
categories: [coding]
comments: true
tags: [python, asyncio]
---

- asynchronous execution of git commands so it's much faster to `fetch` or `pull`

## thread pool, process pool, and asynchrony

Given multiple computational tasks and fixed resources, there is the natural
question of how to finish the tasks as fast as possible.

The least efficient way is to run tasks one by one with one CPU core, i.e., serial
execution. Obviously, 3 out of 4 CPU cores are wasted. In addition, when network
or file IO block (IO block is a fancy word for waiting response), the single
'working' core is idle.

The immediate improvement is to start the next task while waiting for the current one.
This leads to less CPU idling as long as more than 1 tasks are unfinished,
even if only one core is used. This idea can be implemented as a thread pool.
When blocking happens on one thread, the operating system will schedule work on
other threads to utilize the CPU resource.

The next obvious improvement is to let all cores work, i.e., parallelism.
For example, each core can work on one task.
When one core is done with an assigned task, it grabs a new one, say, from a task queue.
This model is commonly implemented as a process pool, where the number of workers
equal to the number of CPU cores.

Note that the two ideas of context switch at IO blocks and parallelization are
independent, thus can be used together.

There is another less obvious improvement related to the task switching idea.
With thread pool, we rely on the operating system to make context switches,
and have little control over when switch occurs and what task to switch to.
Suppose the tasks all contain long periods of blocking, e.g., making requests to
web servers, retrieving information from database, etc.
In these cases, we could be wasting time making useless switches.

The solution is to take over the context switch.
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

 type | CPU intensive | IO blocking
--- | --- | ---
 thread | | ✔
 subprocess | ✔ |
 asynchrony | | ✔✔

## python specifics


