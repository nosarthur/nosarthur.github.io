---
layout: post
title: Vector analysis formulas
date:   2016-08-20 13:43:08 -0500
categories: [math and physics]
description: A trick for deriving vector identities 
comments: true
tags: [vector analysis]
---

If you ever took electromagnetism class, the following identities probably look familiar

$$\begin{align}
\nabla\cdot(f\mathbf A) = \nabla f\cdot\mathbf A + f\nabla\cdot\mathbf A \\
\nabla\times\nabla\times\mathbf A = \nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A\end{align}$$

Here $$f$$ is a scalar function and the bold face $$A$$ is a vector function. 

There are many of these identities, so many that it is not possible to memorize them by heart.

Fortunately, there is a trick to derive any of these vector analysis identities from scratch in a minute or two.
And this is the topic of this post.

## notations

> A good notation has a subtlety and suggestiveness which at times make it almost seem like a live teacher. --- Bertrand Russell

Part of the trick is notation. I will write out all vectors and vector operators in terms of the components.
In addition, [Einstein summation convention](https://en.wikipedia.org/wiki/Einstein_notation) is used.

Since I limit myself to the case of 3 spatial dimensions, there are only 3 differential operators of interest.
Their component-wise forms are

* gradient: $$\nabla f = \partial_if \hat e_i$$
* divergence: $$\nabla\cdot\mathbf A = \partial_iA_i$$
* curl: $$\nabla\times\mathbf A = \epsilon_{ijk}\partial_iA_j\hat e_k$$

Here $$\epsilon_{ijk}$$ is called the totally anti-symmetric tensor in physics. 
Mathematicians seem to call it the [Levi-Civita symbol](https://en.wikipedia.org/wiki/Levi-Civita_symbol).
It takes value 0 if the indices have repetitions (e.g., 112), +1 if the indices are even permutations away from 123 (e.g., 123, 231), 
-1 if the indices are odd permutations away from 123 (e.g., 213, 132). 
You can check that it defines the curl operator correctly.

With this notation, the first identity can be easily derived

$$\begin{align}\nabla\cdot(f\mathbf A) = & \partial_i f A_i  \\
 = & A_i \partial_i f + f \partial_i A_i \\
 = & \nabla f\cdot\mathbf A + f\nabla\cdot\mathbf A 
\end{align}$$

## the cross products

Simplification is possible when there are more than one [cross product](https://en.wikipedia.org/wiki/Cross_product).
It requires the following identity

$$\epsilon_{ijk}\epsilon_{mnk} = \delta_{im}\delta_{jn}-\delta_{in}\delta_{jm}$$

Here $$\delta_{ij}$$ is the [Kronecker delta](https://en.wikipedia.org/wiki/Kronecker_delta). It is 1 if the indices are equal, otherwise 0.

With this identity, the second identity at the beginning of the post can be derived easily

$$\begin{align}
\nabla\times\nabla\times\mathbf A =& \epsilon_{ijk} \hat e_k \partial_i (
\epsilon_{mnj}\partial_m A_n) \\= & \epsilon_{kij}\epsilon_{mnj}\hat e_k
\partial_i\partial_m A_n \\= & \hat e_k\partial_k\partial_iA_i 
- \hat e_k \partial_i \partial_i A_k \\= &
\nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A
\end{align}$$

## summary 

After adopting the component-wise notation and the simplification rule for 
cross products, I never had any difficulty in simplifying expressions
in electromagnetism. Hopefully you will find ease in vector analysis formulas too from now on.

I suspect that I learned this trick from this book

<a target="_blank"  href="https://www.amazon.com/gp/product/0199641390/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0199641390&linkCode=as2&tag=nosarthur2016-20&linkId=f7dccb402eb07e2ebcaa63348f3eb656"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0199641390&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0199641390" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

However I can not say for sure since I have sold my copy.
I would still highly recommend this book even if it does not contain this trick because it contains a lot of neat tricks.
