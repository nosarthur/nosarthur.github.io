---
layout: post
title: python test memory issues
date:   2017-05-28 10:00:08 -0500
categories: [coding]
comments: true
tags: [testing]
---

Recently we run into a problem that our automated python testing fails
due to the memory limit on the testing machine (2GB per process).
Here I will summarize what I have learned from this occasion.

Assuming there is no single test consuming close to 2GB memory, directly causing the memory shortage, there are three potential causes 

1. there are simply too many tests
1. there are unreleased resources at the python level
1. there are unreleased resources at the C/C++ level

For each test function `pytest` creates a `TestReport` instance,
which survives to the end of all tests to provide statistics and extra information in case the test fails.
Normally each `TestReport` instance is at most a few KB large (think of all the information needed for the final report), then we should be able to do several hundred thousands of tests without issue with 2GB memory.
Thus cause number 1 is quite unlikely in practice.

Given there are unreleased resources, the first step of diagnosis is to locate the test files/test classes/test functions that leak memory.
If multiple test files are present, a simple way to narrow down to the file level is to follow the `top` result
while running the test. For example, on mac one can run
`top -o MEM` to see the memory usage. 
If there is no leak, the memory usage should rise (inside a test) and fall (exiting a test).
On the other hand, if there is leak, the memory usage would have a baseline value after the leaking test.

To further narrow down to the test class or test function level, one can use the following code snippet to print out memory usage at different locations of the code. This is equivalent to the `top` approach.

```
import psutil
p = psutil.Process()
p.memory_info()
```

At the python level, unreleased memory may be due to 

* global variables
* class level variables
* memoization

There is a nice tool called **objgraph** that helps diagnose more subtle referencing issues for python objects. 
To use it, one typically sets two break points surrounding the suspicious code, using either

```
import pdb; pdb.set_trace()
```

if it is a regular code, or 

```
import pytest; pytest.set_trace()
```

if `pytest` is used.

At both break points, run

```
import objgraph
objgraph.show_growth()
```

It prints out the objects in the memory. The second call only shows the extra objects created since the first call.
The following code further shows the memory usage of any specific object and the objects that reference it.

```
obj = objgraph.by_type('some_type')[-1]
import sys; sys.getsizeof(obj)
objgraph.show_backrefs(obj, filename="obj_references.png")
```

Here `some_type` should be replaced by the type of interest
and you can change `-1` to other index.

To install objgraph, run 

```
pip install objgraph
```

However, a dependent package called `graphviz` doesn't work out of box on my mac. Without it, the analysis result is only available in `.dot` format and cannot be saved into `.png` files.
I tried three ways to install `graphviz` and only the third one worked

* `pip install graphviz`
* download the installation package from the official website and install
* `brew install graphviz`


If there are still memory leaks after diagnosing at python level, then one needs to dig down to C/C++ level using `valgrind`.
