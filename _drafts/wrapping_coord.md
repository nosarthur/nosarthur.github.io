---
layout: post
title: Wrap coordinates into a box
date: 2020-11-01 08:00:00 -0500
categories: [coding]
comments: true
tags: [python]
---

Recently I have a task to wrap coordinates into

Wrap a floating number `x` into the range of [0, 1].

```python
wrapped_x = x - np.floor(x)
```

However, there is an exception: suppose `x` is an integer plus a very small
negative number, it probably makes sense to wrap it to `0` instead of `1`.

```python
eps = 1e-6

if abs(x % 1) < eps:
    wrapped_x = 0
else:
    wrapped_x = x - np.floor(x)
```

```python
np.modf(xyz)
```
