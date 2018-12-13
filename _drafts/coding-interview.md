---
layout: post
title: Preparation for coding interviews
date:   2018-12-12 13:43:08 -0500
categories: [coding]
comments: true
tags: [coding interview]
---

## introduction

Nowadays it is standard procedure to have the job candidate to do coding problems either on white board or against an online judge system for tech interviews.
This post is a guide for its preparation.

In my opinion, there are three parts to it

1. Know the basics of computational complexity
2. Get familiar with common algorithms
2. Practice on the problems

Thus before applying, you should be able to analyze the complexity of any given algorithms, solve easy problems in 5 minutes,
and solve medium difficulty problems in 10-15 minutes.
Usually the interview is 30-45 minutes, it is thus not a good sign if only two problems are solved during the session.

Interview problems usually can be solved with

* less than 30 lines (if you use python)
* a solution with complexity less than $$O(n^3)$$

Also a solution with $$O(1)$$ or $$O(\log n)$$ complexity is somewhat unlikely.

Finally,  you can check out [LeetCode](https://leetcode.com) and
[LeetCode solutions](https://lefttree.gitbooks.io/leetcode-categories/content/index.html)
for real life interview problems.
There is also a site called [daily coding problem](https://www.dailycodingproblem.com/).
After signing up, they send you one problem each day.
The solution is only available is you have the premium subscription.

## common strategies and tricks

There are essentially only two strategies for solution finding

* brutal force
* divide and conquer
    * greedy
    * dynamic programming

The brutal force way clarifies the size of the search space.
By divide and conquer, product of complexity becomes summation of complexity.
For example, if the solution contains 3 consecutive steps with complexity $$O(n^{\alpha_i})$$ respectively. 
The brutal force way would require $$O(n^{\alpha_1 + \alpha_2+\alpha_3})$$ complexity whereas divide and conquer
would only require $$O(n^{\alpha_1})+ O(n^{\alpha_2})+ O(n^{\alpha_3})$$ complexity.


* bottom up: for example, start from $$f({a_1})$$
* top down: for example, start from $$f({a_1, a_2, \ldots, a_N})$$

As for common tricks,

* array
    * two pointers
* linked list
    * add dummy before head
    * two pointers: one fast one slow
* trees and graphs: use the classic algorithms

## computational complexity

[Computational complexity](https://en.wikipedia.org/wiki/Computational_complexity_theory) measures the scaling between the number of unit computational operation and the size of the input.

[NP-intermediate](https://en.wikipedia.org/wiki/NP-intermediate)

[graph isomorphism problem](https://en.wikipedia.org/wiki/Graph_isomorphism_problem)

[integer factoring](https://en.wikipedia.org/wiki/Integer_factorization)

[Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm)


The structure of an algorithm is

* iterative
* recursive

The complexity of iterative algorithm is trivial. For recursive algorithms, their complexity can be computed with the [master theorem](https://en.wikipedia.org/wiki/Master_theorem):

Given the recursion relation

$$ T(n) = a T\left(\frac{n}{b}\right) + f(n) $$

where $$a\ge1$$, $$b>1$$, and $$f(n)\in O(n^d)$$ with $$d\ge0$$. The complexity is given by

$$T(n) \in \begin{cases} O(n^d) \quad \text{if } a<b^d \\
O(n^d\log n) \quad \text{if } a = b^d \\
O(n^{\log_b a}) \quad \text{if }a>b^d \end{cases} $$

## survey of common algorithms

### $$O(1)$$ algorithms

* [hash table lookup](https://en.wikipedia.org/wiki/Hash_table)

### $$O(\log n)$$ algorithms

* [binary search](http://en.wikipedia.org/wiki/Binary_search_algorithm)

### $$O(n)$$ algorithms

* [bucket sort](https://en.wikipedia.org/wiki/Bucket_sort)
* [depth first search](https://en.wikipedia.org/wiki/Depth-first_search) and [breadth first search](https://en.wikipedia.org/wiki/Breadth-first_search): $$O(n_v + n_e)$$, where $$n_v$$ and $$n_e$$ are the number of vertices and edges
* [tree traversal](https://en.wikipedia.org/wiki/Tree_traversal)


### $$O(n\log n)$$ algorithms

* [fast Fourier transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)

### $$O(n^2)$$ algorithms

* [Euclidean algorithm for greatest common divisor](https://en.wikipedia.org/wiki/Euclidean_algorithm)

### $$O(n^2 \log n)$$ algorithms

* [factorial]

### $$O(n^3)$$ algorithms

* [matrix multiplication]()
* [matrix inversion]()

### dynamic programming

Dynamic programming (DP) has always been somewhat mysterious to me until I watched
[Erik Demaine](http://erikdemaine.org)'s lectures on it.
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


## resources
* [MIT 6.006 Fall 2011](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/)
* [50+ data structure and algorithm interview questions](https://hackernoon.com/50-data-structure-and-algorithms-interview-questions-for-programmers-b4b1ac61f5b0)
