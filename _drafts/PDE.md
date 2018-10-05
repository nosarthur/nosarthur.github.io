---
layout: post
title: Partial differential equations
date:   2018-10-01 01:00:00 -0500
categories: [math and physics]
comments: true
tags: [PDE]
---

Solving partial differential equations (PDEs) is common practice for scientific
and engineering problems.
Major applications include

* electro-magnetism
* material properties: mechanical, thermal, etc
* dynamics ([diffusion](https://en.wikipedia.org/wiki/Diffusion) for example)

More interestingly, the same types of equations appear in different fields.
The most common ones are

* elliptic equations
* parabolic equations
* hyperbolic equations
* wave equations

In this post, I will give brief overview on the two most important numerical
solvers for PDEs: the finite difference method (FD) and the finite element method (FE).
In case this post is too long to read, there are a few key points:

* Not all PDEs have meaningful (numerical) solutions
* FD is not as straightforward as replacing differentiation with finite difference:
  the choice of the [finite difference scheme](https://en.wikipedia.org/wiki/Finite_difference)
  (forward, backward, central, etc) could affect the convergence (right, convergence, stability, not accuracy!)
* For applications with complicated geometric shapes / boundary conditions, FE is better suited than FD
* One might write in-house FD solvers for the problem at hand, but may rarely
  write in-house FE due to its complexity and the handiness of commercial softwares
  such as [COMSOL multiphysics](https://en.wikipedia.org/wiki/COMSOL_Multiphysics),
  [HFSS](https://en.wikipedia.org/wiki/HFSS), [Sonnet](https://www.sonnetsoftware.com), etc.

## introduction

* analytical theories
* numerical methods
    * finite difference method (FD)
    * finite element method (FE)

* chaos
* nonlinear dynamics

I won't cover them in this post, you can resort to a very nice book by [Professor Steven Strogatz](https://en.wikipedia.org/wiki/Steven_Strogatz) if interested:

<a target="_blank"  href="https://www.amazon.com/gp/product/0738204536/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0738204536&linkCode=as2&tag=nosarthur2016-20&linkId=654f571e9b6e5fda0b880a4522fd54d1"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0738204536&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0738204536" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

In engineering fields, it often happens that the problem 
For example, the boundary condition may not be known, some coefficients in the PDE is only approximately known.

## solvability

analytically or numerically

* solvability
* method



## finite difference method

<a target="_blank"  href="https://www.amazon.com/gp/product/1614273022/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1614273022&linkCode=as2&tag=nosarthur2016-20&linkId=27df21d6f4d10a12e5927c6aa8e4f6c2"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1614273022&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1614273022" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

**The finite difference scheme matters**.


### von Neumann criterion

[von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_stability_analysis)


Gauss-Siedel method
full multi-grid (FMG)

solving Poisson equation on a 256x256x256 grid
15 minutes to 5 seconds


Lancoz' book


## finite element method
