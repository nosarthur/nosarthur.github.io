---
layout: post
title: Bias-Variance tradeoff
date:   2017-09-01 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [variance, bias]
---

## introduction

When I was doing the image processing postdoc, one colleague pointed to me an interesting observation. 
At the time we were doing regularized optimizion of the form

$$ x = \text{argmin}_x \|y - f(x)\|^2_2 + \lambda\|L(x)\|_1 $$

where $$y$$ is some 3D data, $$f$$ and $$L$$ are some functions.
In a validation data set, we know what to expect for the value of $$x$$ inside a region, say 1.0.
However, what we got was a bit off, say $$0.8\pm 0.4$$.
Since 

1. the variation $$0.4$$ is somewhat big
2. there is reason to believe any particular value of $$\lambda$$ is optimal

we decided to make increase the regularization parameter and see what happens. 
And we got say $$0.7\pm 0.1$$, the variance indeed dropped but the mean got worse.

And this is the topic of this post.

## variance tradeoff

$$ Y = f(X) +\epsilon$$

On the training set 


On the test set

$$\begin{align} \text{Error}(x) =& E\left[(Y-\hat f(x))^2\right] \\
=& \left(E[\hat f(x)]-f(x)\right)^2 + \text{Var}[\hat f(x)]+ \text{Var}[\epsilon] \\ =& \text{bias} + \text{variance} + \text{irreducible error}\end{align}$$

what does expectation value mean?
it means the generation of training data, ie Y on training
$$\hat f$$ 

if the training data is changed somewhat, sampling, train-test split

## reference
* Scott Fortmann-Roe's [blog](http://scott.fortmann-roe.com/docs/BiasVariance.html)


