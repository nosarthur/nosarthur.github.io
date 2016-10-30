---
layout: post
title: Monte Carlo methods
date:   2016-12-12 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [Monte Carlo methods]
---

In my undergraduate thesis, I used Monte Carlo method to evaluate some integration in quantum Hall effect. 
Later I took [Prof. David Landau](https://en.wikipedia.org/wiki/David_P._Landau)'s computational physics I at University of Georgia.
In this post, I will give an introduction to Monte Carlo method.

The prototypical use of Monte Carlo is evaluating statistical average, i.e.,

$$\left<f(X)\right> \equiv \int f(x)p(x)dx $$

where $$X$$ is a random variable and $$p(x)$$ is its distribution.
Here I assume $$X$$ is a continuous variable. For discrete random variable, one
simply replaces the integration by summation.

The trick of Monte Carlo methods is to generate a sample $$\{x_i\}$$ (called ensemble by physicists) according to the distribution $$p(x)$$ and the statistical average becomes simply

$$\left<f(X)\right> \simeq\frac{1}{N}\sum_{i=1}^N f(x_i) $$

where $$N$$ is the number of data points in the ensemble.

The key of Monte Carlo is sampling (ensemble generation). In this post, 
I will explain 3 types of methods

* [simple sampling](#simple)
* [importance sampling](#importance)
* [reweighting methods](#reweight)

Before we proceed, it will be good to pause and reflect the options at hand for
evaluating $$\left<f(X)\right>$$.
Basically, there are 3 of them.

* analytical method
* numerical integration methods
* Monte Carlo method

Usually you won't get exact analytical result, although
some kind of approximate result may be possible. Whenever analytical 
approach is available, you should use it.

Conventional numerical integration methods based on [Riemann sum](https://en.wikipedia.org/wiki/Riemann_integral) are usually only 
applicable to low dimensional integrations, whereas Monte Carlo methods are
usually applied to very high dimensional integrations.
The reason will be explained later.

Finally, it is worth mentioning that in statistical physics, it is quite 
common that the exact form of $$p(x)$$ is not known.
Monte Carlo method can still be used if the relative probability can be 
computed between different states. More explanation will be given later.

## <a name='simple'></a> Simple sampling

The simplest example of Monte Carlo is calculating the area of irregular pool.

### example: area of irregular pool

To do so, one draws an enclosing box around the pool and throws stones randomly
into the box. The area of the pool can be computed as 

$$A_\text{pool} \simeq \frac{N_\text{pool}}{N_\text{box}}A_\text{box}$$

To be more formal, $$f(x)$$ is an indicator function that takes value 1 if $$x$$
is inside the pool and 0 otherwise.
$$p(x)$$ is random uniform distribution. 

$$ A_\text{pool} =\left<\mathbb{1}_\text{pool}(x)\right> \simeq \frac{1}{N_\text{box}}\sum_{i=1}^{N_\text{box}}\mathbb{1}_\text{pool}(x_i)$$

As you can see from this example, sometimes the problem itself is not in the 
form of a statistical average but can be converted into one. It is where 
intuition and creativity come into play.

Another example commonly used to illustrate Monte Carlo method is [Buffon's needle problem](https://en.wikipedia.org/wiki/Buffon%27s_needle).

In general simple sampling refers to the case where $$p(x)$$ is random uniform distribution. In this case, the statistical average is simply 

$$\left<f(X)\right> \equiv \int f(x)dx $$

## <a name='importance'></a> Importance sampling


Ising model is the paradigm 

$$ H = -J \sum_{\left<i,j\right>}\sigma_i\sigma_j - h\sum_i \sigma_i $$

The problem is that we don't know $$Z$$. 

Markov Chain Monte Carlo (MCMC)

Metropolis algorithm

$$ W_{n\rightarrow m} = \min\{1, e^{-\beta \Delta E}\}$$

In other words, downhill attempt is always accepted.

## <a name='reweight'></a> Reweighting methods


### Wang-Landau method

[Wang-Landau method](https://en.wikipedia.org/wiki/Wang_and_Landau_algorithm)

