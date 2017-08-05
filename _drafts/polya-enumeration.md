---
layout: post
title: Polya enumeration theorem
date:   2017-08-21 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [combinatorics, graph theory]
---

[Polya enumeration theorem](https://en.wikipedia.org/wiki/P%C3%B3lya_enumeration_theorem) is a powerful tool in combinatorics. The paradigm 
question it answers is

* What are the distinct necklaces one can make using N black and M white beads?

If one is only interested in the number of distinct necklaces,
a weak version of it called [Burnside’s Lemma](https://en.wikipedia.org/wiki/Burnside%27s_lemma) can be used.

For example, suppose N=2 and M=2.
It's easy to see there are two possibilities, shown in Figure 1.


<svg width='400' height='280'> 
<circle cx='70' cy='140' r='50' fill='none' stroke='black' /> 
<circle cx='270' cy='140' r='50' fill='none' stroke='black' /> 
</svg>
> Figure 1. Two distinct necklaces with 2 black and 2 white beads.


In math and physics, the concept of symmetry is captured by [group theory]().

On a more abstract level, Polya enumeration theorem solves the following problem: given a set S (beads), some equivalence criteria, 


* stabilizer
* orbit

counting orbits


$$(x+y)^2 = x^2 + xy + yx + y^2$$
