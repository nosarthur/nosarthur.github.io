---
layout: post
title: Comparison of python async function and generator function
date: 2019-02-25 17:00:00 -0500
categories: [coding]
comments: true
tags: [python, asyncio]
---

```
In [6]: def g(n):
   ...:     yield n
   ...:

In [7]: g(1)
Out[7]: <generator object f at 0x744da175c0c0>
```

```
In [10]: (x for x in range(3))
Out[10]: <generator object <genexpr> at 0x744da1e61570>
```
