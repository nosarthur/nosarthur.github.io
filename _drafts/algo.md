---
layout: post
title: Preparation for coding interviews
date:   2016-08-12 13:43:08 -0500
categories: [coding]
description: A review of algorithm design for coding interviews
comments: true
tags: [coding interview preparation]
---

## introduction 

Interview problems usually can be solved with

* less than 20 lines  
* less complex than $$O(n^3)$$ algorithm

Also $$O(\log n)$$ solution is somewhat unlikely.

* brutal force
* divide and conquer
    * decrease and conquer
    * dynamic programming

## computational complexity

* iterative
* recursive 

### the master theorem

[master theorem](https://en.wikipedia.org/wiki/Master_theorem)

recursion relation 

$$ T(n) = a T\left(\frac{n}{b}\right) + f(n) $$

where $$a\ge1$$, $$b>1$$, and $$f(n)\in O(n^d)$$ with $$d\ge0$$.

$$T(n) \in \begin{cases} O(n^d) \quad \text{if } a<b^d \\
O(n^d\log n) \quad \text{if } a = b^d \\
O(n^{\log_b a}) \quad \text{if }a>b^d \end{cases} $$ 

## dynamic programming

Dynamic programming (DP) has always been somewhat mysterious to me until I watched [Erik Demaine](http://erikdemaine.org)'s lectures on it.
There are four lectures and the first one is shown below.

{% include youtubePlayer.html id="OQ5jsbhAv_M" %}

* recursion + memoization
* DP(problem) = min or max or combine over DP(sub-problem) + extra cost

    This recursive setup looks similar to the master theorem case. 
* complexity = number of sub-problems * cost per sub-problem

To break down the problem into sub-problems, 

* suffix s[i, :]
* prefix s[:, i]
* subseq s[i:j]

### longest common subsequence

### knapsack 


## common tricks

* array
    * two pointers
* linked list
    * add dummy before head
    * two pointers: one fast one slow

## resources
* [MIT 6.006 Fall 2011](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/)

