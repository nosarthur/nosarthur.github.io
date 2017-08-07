---
layout: post
title: Polya enumeration theorem
date:   2017-08-21 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [combinatorics, graph theory]
---

## introduction

[Polya enumeration theorem](https://en.wikipedia.org/wiki/P%C3%B3lya_enumeration_theorem) is a very powerful tool in combinatorics. The paradigm 
question it answers is:
What are the distinct necklaces one can make out of N black and M white beads?

If one is only interested in the number of distinct necklaces,
a weak version of it called [Burnside’s Lemma](https://en.wikipedia.org/wiki/Burnside%27s_lemma) can be used.

For example, suppose N=2 and M=2.
It's easy to see there are two possibilities, shown in Figure 1.

<svg width='350' height='140'> 
<circle cx='70' cy='70' r='50' fill='none' stroke='black' /> 
    <circle cx='120' cy='80' r='16' fill='white' stroke='black' /> 
    <circle cx='90' cy='115' r='16' fill='white' stroke='black' /> 
    <circle cx='50' cy='115' r='16' fill='black' stroke='black' /> 
    <circle cx='20' cy='80' r='16' fill='black' stroke='black' /> 
<circle cx='270' cy='70' r='50' fill='none' stroke='black' /> 
    <circle cx='320' cy='80' r='16' fill='white' stroke='black' /> 
    <circle cx='290' cy='115' r='16' fill='black' stroke='black' /> 
    <circle cx='250' cy='115' r='16' fill='white' stroke='black' /> 
    <circle cx='220' cy='80' r='16' fill='black' stroke='black' /> 
</svg>
> Figure 1. Two distinct necklaces with 2 black and 2 white beads.

Its discoverer [George Polya](https://en.wikipedia.org/wiki/George_P%C3%B3lya) has various important contributions to combinatorics, number theory, and probability theory.
One interesting example is the [Polya urn model](https://en.wikipedia.org/wiki/P%C3%B3lya_urn_model), commonly known as 'the rich get richer'. 
Also he lived up to 97 years of age.

## fundamentals

orbits partition the set


dihedral group of order 4

$$D_4 = \{I, R_{90}, R_{180}, R_{270}, H, V, D_1, D_2 \}$$

In math and physics, the concept of symmetry is captured by [group theory]().

On a more abstract level, Polya enumeration theorem solves the following problem: given a set S (beads), some equivalence criteria, 


* stabilizer
* orbit

counting orbits


$$(x+y)^2 = x^2 + xy + yx + y^2$$
