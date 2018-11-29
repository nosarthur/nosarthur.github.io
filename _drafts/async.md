---
layout: post
title: Service monitoring with python asyncio
date:   2018-12-01 13:00:00 -0500
categories: [coding]
comments: true
tags: [python, golang]
---

In this post, I will give an example of using
[python asyncio package](https://docs.python.org/3.7/library/asyncio-task.html)
to do monitoring.
It is mostly for fun instead of for production.
The corresponding code can be found in
[this repo](https://github.com/nosarthur/async-monitor).
Note that the asyncio APIs are quite different between 3.6 and 3.7.
Here I use python 3.7.1.

The baseline serial version looks like this

```python
now = time.monotonic()

def check_health(i: int, predicate: Callable) -> bool:
    """
    Return False if something goes wrong
    """
    print(f'check health {i} @{time.monotonic() - now:0.1f}')
    return predicate()


def main():
    all_good = lambda: False
    while True:
        if check_health(1, all_good):
            break
        if check_health(2, all_good):
            break
        if check_health(3, all_good):
            break
        time.sleep(3)

    do_cleanup()
```

In the `main` function, we have a loop that stops only when something goes wrong.
Here I used a dummy function for all 3 health checks to keep the loop alive.
In reality, different checks will be applied.

```bash
chronos (master *+) async-monitor $ python3 serial.py
check health 1 @0.0
check health 2 @0.0
check health 3 @0.0
check health 1 @3.0
check health 2 @3.0
check health 3 @3.0
check health 1 @6.0
check health 2 @6.0
check health 3 @6.0
...
```

Running this code, we see all the health checks are performed together
periodically, as expected.

To be more realistic, we should do different checks at different intervals.
This simple requirement turns out to be tricky to implement.
Moving the `sleep` statement into the health checks does not work because they
stack on top of each other.
What we need is 3 threads running independently in the background, which wake
up and give control to the cleanup function whenever a problem is detected.

This logic is actually simple to implement with golang

```go
```

The python async version looks like this

```python
"""
Requires python 3.7
"""
import asyncio
import time
from typing import Callable

now = time.monotonic()

async def run_at_interval(t: float, predicate: Callable):
    while True:
        print(f'check health {t}: @{time.monotonic() - now:0.1f}')
        feedback = predicate()
        if feedback:
            return feedback
        await asyncio.sleep(t)

async def main():
    all_good = lambda: False
    t1 = asyncio.create_task(run_at_interval(3, all_good))
    t2 = asyncio.create_task(run_at_interval(5, all_good))
    t3 = asyncio.create_task(run_at_interval(7, all_good))
    timeout = loop.create_task(asyncio.sleep(23))
    done, pending = await asyncio.wait({t1, t2, t3, timeout},
                                       return_when=asyncio.FIRST_COMPLETED)
    for t in pending:
        t.cancel()
    feedback = await done.pop()
    return feedback

if __name__ == '__main__':
    feedback = asyncio.run(main())
    do_cleanup(feedback)
```

Here the function `run_at_interval` loops forever until some check activates.
In the `main` function, we create 3 health checks with different periods, as
well as a `timeout` signal.
Then `wait` for the first task to finish, and cancel the remaining ones.
If you never seen `async/await` before, this code may look quite mysterious.
In fact, most of it are just formality, e.g., creating tasks for the `wait` function.
My quick and dirty way to understand `async/await` is as follows:

* `async` labels the function to be used as coroutine
* `await` is like `yield`, it labels the points where the function could give
  back control to its caller.
* The thing after `await` should be a coroutine that is not CPU demanding, for
  example, IO bound operations, or `sleep()` as in this example.
* By creating `Task`s out of coroutines, we can run them concurrently.
  In this case, `await` can be interpreted as "give back control to the caller
  while we wait for the thing to run".

If you are not familiar with coroutine,
search "David Beazley" on Youtube or google.

Running it in shell, we get

```bash
chronos (master *+) async-monitor $ python3 async.py
check health 3: @0.0
check health 5: @0.0
check health 7: @0.0
check health 3: @3.0
check health 5: @5.0
check health 3: @6.0
check health 7: @7.0
check health 3: @9.0
check health 5: @10.0
check health 3: @12.0
check health 7: @14.0
check health 5: @15.0
check health 3: @15.0
check health 3: @18.0
check health 5: @20.0
check health 7: @21.0
check health 3: @21.0
```

If we do not cancel the pending tasks in `main`, there will be complaints:

> Task was destroyed but it is pending!

## furthre readings
* [PEP492: Coroutines with async and await syntax](https://www.python.org/dev/peps/pep-0492/)
* [unit test asyncio code](https://blog.miguelgrinberg.com/post/unit-testing-asyncio-code)
