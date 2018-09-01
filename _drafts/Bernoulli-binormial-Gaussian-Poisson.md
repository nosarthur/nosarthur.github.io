---
layout: post
title: "Bernoulli, binomial, Gaussian, and Possion"
date:   2018-08-22 10:40:00 -0500
categories: [math and physics]
comments: true
tags: [probabilities, random processes]
---

Probability theory, statistics, and stochastic processes all study undeterminstic
events. Roughly speaking, they can be seen as theories of signal source,
results counting, and dynamics.
Many neat results can be constructed from simple things. Here I will start from
the simplest probability distribution - the
[Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) -
and get to the more interesting ones, such as Poisson process and Gaussian process.

## Bernoulli distribution and Binomial distribution

The Bernoulli distribution models events with two outcomes. To be concrete, I
will use coin tossing as example.
The result of a single coin toss is random and we can denote it as a random
variable $$X$$. There is only one parameter
$$p$$ which is the probability of getting head. For notational simplicity,
let's define the probability of getting tail as $$q$$, i.e.,

$$P(X=head) = p \\ P(X=tail) = q$$

And we have $$ p + q = 1$$.

For a coin, the questions of interest could be

* Is it a fair coin?
* What is the probability of getting head, i.e., the value of $$p$$?

The first question is essentially a [hypothesis test problem](https://en.wikipedia.org/wiki/Statistical_hypothesis_testing).
(You can take a look of my post on [hypothesis test here]({% post_url 2017-08-05-hypothesis-test %}))
And the second question is a [point estimation problem](https://en.wikipedia.org/wiki/Point_estimation).
(You can take a look of my post on [maximum likelihood and maximum a posteriori methods here]({% post_url 2017-07-08-ML-MAP %}))

To answer these questions, one needs to create a sample either from computer
simulation or from an experiment (e.g., a survey) and check if data and model
are consistent.
Here the word 'sample' means the outcomes of the many measurements. In the coin
tossing example, it could either be tossing the same coin many times (say, $$n$$
times), or tossing many different coins (say, $$n$$ coins) with the same property
and each coin is tossed only once.
The aggregation of Bernoulli distribution gives rise to
[binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
If we assign $$1$$ to head and $$0$$ to tail, we can write

$$ S = \sum_{i=1}^N X_i$$

where $$S$$ is the random variable representing the number of heads for $$N$$
coin tosses, $$X_i$$ is the random variable of the i'th coin toss. Since all
$$X_i$$ have the same property, they are known as
[independent and identically distributed (IID)](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables).

The probability of $$k$$ heads can be calculated from direct state counting and
the result is

$$P(S = k ) = p^kq^{n-k} {n\choose k} $$

where $$n\choose k$$ is the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient),
also known as the n-choose-k function.

We can also get the probabilities $$P(S=k)$$ using a trick of polynomial expansion.
They are the coefficients of $$x^k$$ of the following polynomial:

$$ (px + q)^n $$

By setting $$x=1$$, one can easily see the probability conservation is satisfied

$$ \sum_{k=0}^n P(S = k ) = 1$$

## Gaussian distribution

[Gaussian distribution](https://en.wikipedia.org/wiki/Normal_distribution)

## Poisson distribution


[Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution)

or Markovianity.


binomial distribution and 1D [Ising model]()



