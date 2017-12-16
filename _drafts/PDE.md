---
layout: post
title: Partial differential equations
date:   2017-10-01 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [PDE]
---

In scientific and engineering fields, often times the problems boil down to solving partial differential equations (PDEs).
Major applications include

* electro-magnetism 
* material properties 
* dynamics ([diffusion](https://en.wikipedia.org/wiki/Diffusion) for example)

More interestingly, the same types of equations appear in different fields.
The most common ones are

* elli
* hyperbolic equations
* wave

In this post, I will give brief overview on the two most important numerical solvers for PDEs: the finite difference method (FD) and the finite element method (FE).
In case this post is too long to read, there are a few key points:

* Not all PDEs have meaningful (numerical) solutions
* FD is not as straightforward as replacing differentiation with finite difference: the choice of the [finite difference scheme](https://en.wikipedia.org/wiki/Finite_difference) (forward, backward, central, etc) could affect the convergence (right, convergence, stability, not accuracy!)
* For applications with complicated geometric shapes / boundary conditions, FE is better suited than FD
* One might write in-house FD solvers for the problem at hand, but may rarely write in-house FE due to its complexity and the handiness of commertial softwares such as [COMSOL multiphysics](https://en.wikipedia.org/wiki/COMSOL_Multiphysics), [HFSS](https://en.wikipedia.org/wiki/HFSS), etc.

## introduction

* analytical theories
    * ordinary differential equations
    * partial differential equations
* numerical methods
    * numerical analysis
    * computational physics
    * computational mathematics

* chaos
* nonlinear dynamics

I won't cover them in this post, you can resort to a very nice book by [Professor Steven Strogatz](https://en.wikipedia.org/wiki/Steven_Strogatz) if interested:

<a target="_blank"  href="https://www.amazon.com/gp/product/0738204536/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0738204536&linkCode=as2&tag=nosarthur2016-20&linkId=654f571e9b6e5fda0b880a4522fd54d1"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0738204536&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0738204536" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

analytically or numerically

* solvability
* method



## finite difference method

**The finite difference scheme matters**.


### von Neumann criterion

[von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_stability_analysis)


Gauss-Siedel method
full multi-grid (FMG)

solving Poisson equation on a 256x256x256 grid
15 minutes to 5 seconds


Lancoz' book


## finite element method
