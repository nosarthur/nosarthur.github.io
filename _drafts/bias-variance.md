---
layout: post
title: Bias-Variance tradeoff
date:   2017-08-01 03:43:08 -0500
categories: [math and physics]
comments: true
description: An explanation of Bias-Variance tradeoff
tags: [variance, bias]
---


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


