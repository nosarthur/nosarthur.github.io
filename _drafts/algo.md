---
layout: post
title: A brief review of algorithm design for coding interviews
date:   2016-08-12 13:43:08 -0500
categories: [coding]
description: A review of algorithm design for coding interviews
comments: true
tags: [coding interview preparation]
---

## introduction 

* brutal force
* divide and conquer
    * decrease and conquer
    * dynamic programming

## computational complexity

* iterative
* recursive 

[master theorem](https://en.wikipedia.org/wiki/Master_theorem)

recursion relation 

$$ T(n) = a T\left(\frac{n}{b}\right) + f(n) $$

where $$a\ge1$$, $$b>1$$, and $$f(n)\in O(n^d)$$ with $$d\ge0$$.

$$T(n) \in \begin{cases} O(n^d) \quad \text{if } a<b^d \\
O(n^d\log n) \quad \text{if } a = b^d \\
O(n^{\log_b a}) \quad \text{if } a > b^d
\end{cases}$$

## dynamic programming

## resources

