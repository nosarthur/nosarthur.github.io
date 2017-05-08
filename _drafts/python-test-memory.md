---
layout: post
title: python test memory issues
date:   2017-05-13 10:00:08 -0500
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

For each test function inside a test class,
pytest creates a `TestReport` instance,
which survives to the end of all the tests to provide statistics and extra information in case the test fails.
Normally each `TestReport` instance is at most several KB large (think of all the information needed for the final report), then we should be able to do several hundred thousands of tests without issue with 2GB memory assuming each test does not use 2GB memory.

Thus in the case of large memory consumption during test, the first place we should check is whether these `unittest.TestCase` instances still retain resources, i.e., anything attached to `self`.
Other places to check includes

* global variables at module level
* class level variables

A simple way to diagnose the test files is to check the `top` result
while running the test. For example, on mac one can run
`top -o MEM` to see the memory usage. This can help pin down the test files that consume too much memory.

```
import psutil
p = psutil.Process()
p.memory_info()
```

First of all, the question is whether the test failure is due to 
memory leakage or 

```
import pytest; pytest.set_trace()
```

To install objgraph, simply run 

```
pip install objgraph
```

However, a dependent package called `graphviz` doesn't work out of box on my mac. Without it, the analysis result is only available in .dot format and cannot be saved into png files.
I tried three ways to install `graphviz` and only the third one worked

* `pip install graphviz`
* download the installation package from the official website and install
* `brew install graphviz`


```
import pdb; pdb.set_trace()
```

At the break points, run

```
import objgraph
objgraph.show_growth()
```


```
obj = objgraph.by_type('some_type')[-1]
import sys; sys.getsizeof(obj)
objgraph.show_backrefs(obj, filename="last_some_type.png")
```



