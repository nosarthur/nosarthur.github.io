---
layout: post
title: Bias-Variance tradeoff
date:   2019-09-01 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [variance, bias]
---

## introduction

During the time of my image processing postdoc,
one colleague pointed to me an interesting observation.
At the time we were doing regularized optimization of the form

$$ x = \text{argmin}_x \|y - f(x)\|^2_2 + \lambda\|L(x)\|_1 $$

where $$y$$ is some 3D data observed from experiment,
$$f$$ (signal formation) and $$L$$ (regularization penalty) are some known functions,
and $$\lambda$$ is the regularization parameter (also known as [hyperparameter](https://en.wikipedia.org/wiki/Hyperparameter)).

In a validation data set, we know the correct value of $$x$$ inside a uniform
region, say 1.0. However, what we got was a bit off, say $$0.8\pm 0.4$$.
Since

1. the variance of $$0.4$$ is somewhat big,
2. there is no reason to believe our choice of $$\lambda$$ is optimal,

we can increase the regularization parameter to lower the variance.
And we got say $$0.7\pm 0.1$$, the variance indeed decreases but the mean also got worse.
Thus it seems by tuning the regularization paramater, we can either get an relatively
accurate mean with large variance, or not-so-accurate mean with small variance,
but not accurate mean with small variance.
And this is the topic of this post.

## bias-variance tradeoff

[mean square error](https://en.wikipedia.org/wiki/Mean_squared_error)
$$E(\hat X - X)^2 = E\hat X^2 - 2E\hat X X + X^2 = Var(X^2) +(E\hat X - X)^2$$

where $$\hat X$$ are the predicted values.
The first term is the [variance](https://en.wikipedia.org/wiki/Variance) of the estimator,
characterizing the random error, i.e., due to the variation in samples.
And the second term is the bias of the estimator, characterizing systematic error.
They are also known as [precision and accuracy](https://en.wikipedia.org/wiki/Accuracy_and_precision).

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
