---
layout: post
title: Hypothesis test
date:   2017-08-05 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [hypothesis test]
---

## introduction

Professor Allen Downey wrote some very nice blog posts to summarize the 
essence of hypothesis test. The original articles are here:

* Allen Downey's [blog article I](http://allendowney.blogspot.com/2011/05/there-is-only-one-test.html) 
* Allen Downey's [blog article II](http://allendowney.blogspot.com/2011/06/more-hypotheses-less-trivia.html)
* Allen Downey's [blog article III](http://allendowney.blogspot.com/2016/06/there-is-still-only-one-test.html)

His main points are 

* **There is only one test** 
* Given the computational resources nowadays it is better to use simulations to do hypothesis tests.

In this post, I will demonstrate both the analytical and simulational approaches with a simple example.

## basic ideas and terminologies

**The purpose of hypothesis test is to decide whether an observed difference is real or merely statistical fluctuation**,
where the difference could either be between two data sets, or between one data set and one known distribution.

For example, a coin is tossed 100 times and 40 of them are heads. Given this observation, is the coin fair?
We know that on average 50 heads are expected for a fair coin.
On the other hand, getting exactly 50 heads in every 100 toss would be absurd.
Thus the discrepancy needs an explanation. 
It's very intuitive to see that a definite answer is impossible, and the best we can do is to compute 

$$ P(\text{40 heads out of 100 tosses}|\text{coin is fair}) \quad \text{or}\quad P(\text{coin is fair}|\text{40 heads out of 100 tosses})$$ 

Hypothesis test assumes the statistician's view (as opposed to Bayesian's) and the first quantity is computed.
Its main terminologies are

* **apparent effect $$E$$**: observed difference
* **test statistic $$T$$**: statistical quantity to calculate from data
* hypothesis: a model to explain the apparent effect
    * **null hypothesis $$H_0$$**: the apparent effect is not real, i.e., it results from statistical fluctuation
* **p-value**: given $$H_0$$, the probability of an apparent effect equal to or more significant than the observed one

In the coin tossing example, the observed data is 100 records of head/tail observations and the test statistic is the count of heads.
The apparent effect is the deviation $$T-50 = -10$$, or $$\|T-50\|=10$$, and the null hypothesis is that the coin is fair.
The p-value could be either $$P(T\le40|H_0)$$ or $$P(\|T-50\|\ge10|H_0)$$.
Both of them make sense since the distribution of head counts is symmetric under the fair-coin hypothesis.
This two-fold ambiguity is quite common in hypothesis testing and the exact value of p-value should not be taken too seriously. Only its order of magnitude matters.

Note that p-value is the likelihood of large apparent effect, while using the observed apparent effect as small/large boundary.
Thus if p-value is small, the observed apparent effect is considered as unlikely, and it is safe to assume the effect is real. 
In practice, p-values of 0.05 or 0.01 are commonly used. 

Beside these essential terminologies, there are a few less important ones which would be good to know in order to read literatures

* $$H_1$$: the opposite of $$H_0$$, i.e., the alternative hypothesis
* [type I/II errors](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors)

The two types of errors can be understood as two cases of the action versus condition table

action \ condition | $$H_0$$ is true | $$H_0$$ is false
--- | --- | ---
accept $$H_0$$ | ✅  | type II error
reject $$H_0$$ | type I error | ✅

The probability of type I error is exactly the p-value.
In terms of the [Receiver operating characteristic (ROC)](https://en.wikipedia.org/wiki/Receiver_operating_characteristic),
type I error is false negative and type II error is false positive, if $$H_0$$ is taken as positive.
Note that their probabilities do not add up to 1.

## the analytical and simulational approaches 

The beauty of null hypothesis is that some distribution is granted, thus calculation can proceed. 
It is again an example of [Anna Karenina principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle), if we were to assume the alternative hypothesis $$H_1$$,
it would be impossible to enumerate all the distributions where the coin is not fair.

To calculate the p-value analytically for the coin example, we have

$$ P(T\le40|H_0) = \frac{\sum_{k=0}^{40} {n \choose k}}{2^{100}} \simeq 0.028$$

where $$n \choose k$$ is the n-choose-k function, and the numerical value comes from the following code snippet

```python
import scipy.misc

print sum(scipy.misc.comb(100, k) for k in xrange(41)) / 2**100
```

To calculate the p-value from simulation, we simply need to perform the 100-toss experiment many times to count the occurence of heads being less than 41.

The following code snippet gives me 0.028, 0.031, 0.029 from three separate runs.

```python
import numpy.random

N, count = 10000, 0
for i in xrange(N):
    if sum(numpy.random.random(100) > 0.5) <= 40:
        count += 1
print float(count) / N
```

The agreement between these two approaches is good and we can conclude that the coin is likely not fair, since the p-value is of order 0.01.

In real applications, whenever the distribution deviates from simple ones such as binomial, exponential, Poisson, or Gaussian,
the analytical approach becomes cumbersome. Further simplifying assumptions are commonly required.
On the other hand, the simulational approach is usually quite straightforward.

## some helper functions for simulation

* `numpy.random.random()` or `random.random()`: generate uniform random number from 0 to 1
* `numpy.random.choice()`: sample with or without replacement from a sequence
* `random.sample()`: sample without replacement
