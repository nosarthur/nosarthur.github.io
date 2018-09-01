---
layout: post
title: dynamic programming
date:   2018-08-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [algorithm]
---

Dynamic programming deal with problems with overlapping sub-problems.
The idea is to record the results of the sub-problems so that we don't solve
them repeatedly.
This process is also known as [memoization](https://en.wikipedia.org/wiki/Memoization).

There are two variants of DP:

* bottom-up: solve all sub-problems and assemble the answer
* top-down: start from the answer and solve only the sub-problems needed for the answer

Typically, we can write a recursion for the sub-problem decomposition, which
gives rise to some intrinsic dimension of the problem.
This dimension is basically the dimension of the table for the memoization.

* 1D: Fibonacci number
* 2D:
* 3D:
