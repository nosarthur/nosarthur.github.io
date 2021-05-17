---
layout: post
title: Monte Carlo methods
date:   2016-11-14 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [Monte Carlo methods]
---

This post is a tutorial of Monte Carlo methods.
In the introduction, I will explain what it is and why using it.
Then I will describe three Monte Carlo methods: simple sampling, importance sampling and histogram reweighting.
Finally I will point to some advanced materials.

My exposure to these methods includes

* evaluating an integration in quantum Hall effect in my undergraduate thesis
* taking graduate level computational physics course taught by Prof. [David Landau](https://en.wikipedia.org/wiki/David_P._Landau)
* estimating some volume in 15D ([see appendix B of this 2012 IJMPB paper](https://arxiv.org/pdf/1007.1749.pdf))

Due to my limited experience, the materials here are kept at beginner level.

## Introduction

### what it is?

There is no consensus on what [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method) is.
A coarse definition could be: **any numerical method that uses a random number generator**. In that definition,

* numerical simulations of [random walk](https://en.wikipedia.org/wiki/Random_walk) and [Brownian motion](https://en.wikipedia.org/wiki/Brownian_motion)
* optimization methods such as [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing)
* statistical methods such as [bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(statistics))

would all count as Monte Carlo methods.

My narrow definition of Monte Carlo methods is: **any numerical methods that evaluate a statistical expectation using a randomly generated ensemble**.
This post will focus on this narrow definition.

Specifically, the statistical average of interest is

$$\left<f(X)\right> \equiv \int f(x)p(x)dx $$

where $$X$$ is a random variable and $$p(x)$$ is its distribution.
Here I assume $$X$$ is a continuous variable. For discrete random variable,
simply replace the integration by summation.

The trick of Monte Carlo methods is to generate a sample $$\{x_i\}$$ (also called [ensemble](https://en.wikipedia.org/wiki/Statistical_ensemble_(mathematical_physics)) by physicists) according to the distribution $$p(x)$$ and evaluate the statistical average using

$$\left<f(X)\right> \simeq\frac{1}{N}\sum_{i=1}^N f(x_i) $$

where $$N$$ is the number of data points in the ensemble.

Don't worry if you don't see why it's possible to evaluate an expectation this way.
All the 'magic' is in the sampling (ensemble generation) process. In this post, I will explain three different methods

* [simple sampling](#simple)
* [importance sampling](#importance)
* [reweighting methods](#reweight)

### why doing it?

Before we proceed to the methods, it may be good to pause and reflect the options at hand for evaluating $$\left<f(X)\right>$$.
Basically, there are three of them.

* analytical methods
* numerical integration methods
* Monte Carlo methods

Exact analytical result is rarely possible, although some approximated one is always available and quite often illuminating.
There is a nice book demonstrating how far analytical work can go

<a target="_blank"  href="https://www.amazon.com/gp/product/0486462714/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0486462714&linkCode=as2&tag=nosarthur2016-20&linkId=89c8b672a0787f9bbf69dc229d226eec"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0486462714&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0486462714" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

Conventional numerical integration methods based on [Riemann sum](https://en.wikipedia.org/wiki/Riemann_integral) are usually only
applicable to low dimensional integrations, whereas **Monte Carlo methods are
usually applied to very high dimensional integrations**.
The reason will be explained in the [simple sampling](#simple) section.

Another nice feature of Monte Carlo method is that it does not require full knowledge of $$p(x)$$,
but only relative probability between different states,
a common scenario in physics problems.
More explanation will be in the [importance sampling](#importance) section.

## <a name='simple'></a> Simple sampling

The simplest example to apply Monte Carlo method is calculating the area of an irregular pool.

### example 1: area of an irregular pool

The solution is to draw an enclosing box around the pool and throw stones randomly
into the box. The area of the pool can be estimated as

$$A_\text{pool} \simeq \frac{N_\text{pool}}{N_\text{box}}A_\text{box}$$

I guess this formula is very intuitive. To be more formal, in this case, $$p(x)=1/A_\text{box}$$ is a random uniform distribution over the box, $$f(x)$$ is an indicator function $$\mathbb{1}_\text{pool}(x)$$ that takes value 1 if $$x$$ is inside the pool and 0 otherwise,
and $$N_\text{box}$$ is the number of data points in the ensemble.
In other words,

$$ A_\text{pool} = A_\text{box}\left<\mathbb{1}_\text{pool}(x)\right> \simeq \frac{A_\text{box}}{N_\text{box}}\sum_{i=1}^{N_\text{box}}\mathbb{1}_\text{pool}(x_i)$$

As you can see from this example, **sometimes the problem itself is not in the
form of a statistical average but can be converted into one**. This is where
intuition and creativity come into play.
One eminent example is the [Buffon's needle problem](https://en.wikipedia.org/wiki/Buffon%27s_needle), which estimates $$\pi$$ by throwing needles.

### example 2: volume of entangled quantum states in 15D

In our 2012 IJMPB paper "[Topology of entanglement evolution of two qubits](http://www.worldscientific.com/doi/abs/10.1142/S0217979212500543)", we computed the volume of two-qubit entangled states in a 15 dimensional polarization vector representation (For some reason the reviewer forced us to call it polarization vector, I would prefer generalized [Bloch vector](https://en.wikipedia.org/wiki/Bloch_sphere)).

Here the idea is very similar to example 1. We use a ball to enclose all the states (both entangled and separable) and use [concurrence](https://en.wikipedia.org/wiki/Concurrence_(quantum_computing)) as the indicator function $$\mathbb{1}_\text{entangled}(x)$$ to test for entanglement, i.e.,

$$ V_\text{entangled} = V_\text{ball}\left<\mathbb{1}_\text{entangled}(x)\right>$$

However, it would be highly inefficient to evaluate $$V_\text{entangled}$$ if we throw points uniformly randomly in a 15D ball as in example 1 - [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality).
Our solution is to sample 14D surfaces at different radii, thus effectively retrieving the radial distribution function. This is a better approach because we know a priori that most entangled states are located close to the origin.

For more details, please see appendix B of this [arXiv copy](https://arxiv.org/pdf/1007.1749.pdf). Later analytical calculations from UCSB are in good agreement with our Monte Carlo results.

### general cases

In general, simple sampling refers to the case where $$p(x)$$ is random uniform distribution, and the statistical average is simply a numerical integration

$$\left<f(X)\right> \equiv \int f(x)dx $$

Then a natural question arises: why don't we use [Simpson's rule](https://en.wikipedia.org/wiki/Simpson%27s_rule), or [Romberg's method](https://en.wikipedia.org/wiki/Romberg%27s_method), or [Gaussian quadrature method](https://en.wikipedia.org/wiki/Gaussian_quadrature) to evaluate this integration?

I can think of two reasons:

* in case we don't have analytical form of $$f(x)$$ (e.g., example 1, 2, and most physics problems), these numerical integration schemes do not apply
* the simple sampling Monte Carlo method is almost stupidly simple to do

In reality, you don't always want to use Monte Carlo method. The errors of conventional numerical integration methods and Monte Carlo integration methods scale as

$$ \sigma_{NI} = O(N^{-\frac{\alpha}{d}}) \\
 \sigma_{MC} = O(N^{-\frac{1}{2}}) \\
$$

where $$d$$ is the dimension of the integration and $$\alpha$$ relates to the specific numerical method. Thus **Monte Carlo is the way to go for high dimensional integrations but not low dimensional ones**.

These error behaviors can be understood as follows. For Monte Carlo methods, the error can be defined via the [statistical variance](https://en.wikipedia.org/wiki/Variance), i.e.,

$$\sigma_{MC}^2 = \frac{1}{N-1}\left(\left<f^2\right>-\left<f\right>^2\right)$$

For conventional numerical integration methods, the error is inversely proportional to the number of points in each dimension, i.e., $$N^{1/d}$$.

If $$p(x)$$ is not uniformly random, in principle one can still use simple
sampling, i.e.,

$$\left<f(X)\right> \simeq\frac{1}{N}\sum_{i=1}^N f(x_i)p(E_i) $$

where the ensemble $$\{x_i\}$$ comes from uniform sampling and $$E_i$$ is the energy for state $$x_i$$. The problem is that $$p(E)$$ and/or $$p(x)$$ may be 'peaky', making a uniform sample highly inefficient.
Thus for non-uniform $$p(x)$$, importance sampling is usually a better choice.

I should also add that **what you call $$p(x)$$ and $$f(x)$$ are somewhat arbitrary**. For a numerical integration problem with $$f(x)$$ being the integrand, you can pretend that $$f(x)$$ (or part of it) is a probability distribution function. Then importance sampling can be used.

## <a name='importance'></a> Importance sampling

Importance sampling aims to overcome the inefficiency in simple sampling.
The high-level idea is similar to [finite element method](https://en.wikipedia.org/wiki/Finite_element_method): **if a region is particularly intersting, let's pay more attention there**.

### application in generic problems

For a generic problem like

$$\left<f(X)\right> \equiv \int f(x)p(x)dx $$

the trick is to generate non-uniform random numbers according to $$p(x)$$.
One such method is to uniformly sample the [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function)

$$ F(y) \equiv P(X\le y)= \int_{-\infty}^y p(x) dx $$

and convert the samples $$\{y_i\}$$ with

$$x_i = F^{-1}(y_i) $$

You can easily convince yourself that this approach makes sense at least geometrically using uniform random variable or Gaussian random variable as examples.

I actually don't know much more about how importance sampling is used for generic problems. It may be better to consult a statistician for that.

### application in physics problems

In classical statistical physics, the probability distribution takes on a special form

$$ p(q) = \frac{e^{-\beta E(q)}}{Z(\beta)}$$

where $$q$$ is a short-hand notation for potentially many variables that describe the state. For example, they could be positions and momentums of all particles in the universe. $$\beta=1/k_BT$$ is essentially inverse temperature.

$$Z(\beta) = \int e^{-\beta E(q)} dq$$

is the [partition function](https://en.wikipedia.org/wiki/Partition_function_(mathematics)). Again, this notation implicitly assumes the state variables $$q$$ are continuous. If they are not, simply replace the integration by summation.

One paradigm problem in computational physics is the [Ising model](https://en.wikipedia.org/wiki/Ising_model).
It is a lattice model for magnetism. The Hamiltonian has the form

$$ H = -J \sum_{\left<i,j\right>}\sigma_i\sigma_j $$

where $$\sigma_i$$ takes value $$\pm1$$ denoting the orientation of local magnetic moment, $$J$$ is interaction strength, and the summation is over nearest neighbors. Here $$\sigma_i$$ are the state variables $$q$$. For simplicity, imagine a 2D square lattice with small magnets placed on each lattice point.

For Ising model, usually one is interested in calculating the expectation of total magnetization

$$ M(\beta) = \sum_i \sigma_i $$

at different temperatures and see if [phase transition](https://en.wikipedia.org/wiki/Phase_transition) happens.

The Ising model is well studied due to its simplicity (short-range interactions) and applicability to real life problems. Also its analytical solution is known for 2D (thanks to [Lars Onsager](https://en.wikipedia.org/wiki/Lars_Onsager)), thus it provides a good test case for numerical methods. Also thanks to [Moore's law](https://en.wikipedia.org/wiki/Moore%27s_law), all the results in classic Monte Carlo papers can be easily reproduced nowadays with a personal laptop.

For these physics problems, the Monte Carlo methods described so far do not apply directly because in most cases we can't compute the partition function $$Z$$ thus do not have full expression for $$p(q)$$. All we have is the Boltzmann factor $$e^{-\beta E(q)}$$.

Fortunately, some neat idea was developed in the 1950s to generate an ensemble with only the Boltzmann factors. This is the [Metropolis algorithm](https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm). Also I have the impression that when people say 'importance sampling' they actually mean 'Metropolis algorithm'.

### Metropolis algorithm

Although I have known this algorithm for many years, it still gives me the feel of magic. There are two components in its core idea

* a stochastic process
* a fixed point

The first component is remotely related to [ergodicity](https://en.wikipedia.org/wiki/Ergodic_hypothesis): since we cannot draw a sample statically, maybe we can devise a dynamic process and use time average?

For physics problem, it's natural to solve the equation of motion, then we end up with the [molecular dynamics method](https://en.wikipedia.org/wiki/Molecular_dynamics). The inventors of Metropolis algorithm somehow decided to use fake dynamics in phase space: **a random walk in phase space is performed and the transition probability is designed such that in dynamic equilibrium the system dwells in each state with probability $$p(q)$$**.

Yet this idea is open-ended. To narrow it down, the easiest dynamic process is chosen ([Markov chain](https://en.wikipedia.org/wiki/Markov_chain)) and the
easiest transition probability rule is set ([detailed balance](https://en.wikipedia.org/wiki/Detailed_balance)):

$$ W_{m\rightarrow n} p(m) = W_{n\rightarrow m} p(n) $$

Here $$W_{m\rightarrow n}$$ is the transition probability from state m to state n. The beauty of this equation is that we don't need partition function any more. Boltzmann factors suffice.

Detailed balance does not fix the transition probability uniquely.
One simple choice is

$$ W_{n\rightarrow m} = \min\{1, e^{-\beta \Delta E}\}$$

In other words, energy downhill attempt is always accepted. This choice is sometimes known as the Metropolis function.

There are variations on how $$W_{n\rightarrow m}$$ are picked and even how the Markov chain is designed.
These methods all share the name Markov Chain Monte Carlo (MCMC).

## <a name='reweight'></a> Reweighting methods

Note that both the Boltzmann factor and the partition function depend on temperature, or equivalently $$\beta$$. Thus if we are interested in the system's response in a range of temperatures (for example phase transition), many MCMC simulations need to be performed. The so-called reweighting methods provide a shortcut to run many MCMC at different temperatures.

The key idea is the change of variable from phase space to energy space, i.e.,

$$ \int dq = \int g(E) dE $$

where $$g(E)$$ is the [density of states (DOS)](https://en.wikipedia.org/wiki/Density_of_states). If the phase space and energy levels are discrete, the integration needs to be replaced by summation. In the discrete case, $$g(E_i)$$ becomes
the number of states with energy $$E_i$$, although I will still call it DOS.

Note that the concept of DOS is not only important to Monte
Carlo methods but also to condensed matter physics in general.
This is because that **the energy space integration is in most cases easier to do than the phase space integration, no matter you do it analytically or numerically**.

Another awesome feature of DOS is that it does not depend on temperature.
Once you figure it out, you can get the expectation value of any observable
$$O$$ at any temperature using

$$ \left< O(\beta) \right> = \int O(E) p(E, \beta) dE $$

where the probability distribution function is given by

$$ p(E, \beta) = \frac{e^{-\beta E}}{Z(\beta)} g(E) $$

Here I write out the dependence on temperature explicitly.

Before jumping into specific methods, I would like to point out two more facts

* One can define DOS not only on energy, but also on other thermodynamic variables, e.g., $$g(E,M)$$
* Reweighting methods seem to get traction in [molecular dynamics](https://en.wikipedia.org/wiki/Molecular_dynamics) simulations as well

### conventional histogram reweighting

The first question we can ask is: if we did a MCMC at temperature $$\beta_1$$, can we get $$p(E,\beta_2)$$ for free, i.e., the probability distribution at a different temperature?

The answer is yes and it's actually quite simple. With the ensemble $$\{x_i\}$$ from the first simulation, we can make a histogram of occurrence versus energy. Up to a normalization factor, this histogram $$H(E, \beta_1)$$ is an estimate of $$p(E,\beta_1)$$. Thus up to a normalization factor,

$$ p(E,\beta_2) \sim H(E, \beta_1) e^{-(\beta_2-\beta_1)E} $$

You can easily normalized it and retrieve $$p(E,\beta_2)$$. The catch here is that if the two temperatures are too far apart, the first ensemble does not provide enough statistics for the second one.

Another neat idea is the so-called [multicanonical sampling](https://en.wikipedia.org/wiki/Multicanonical_ensemble), which answers the question: can we do better when $$p(E)$$ have multiple peaks?
In this case, it's difficult to
'tunnel' though the valley from the peak regions due to the

* energy barrier
* DOS barrier.

As a result, the ensemble from a MCMC simulation may

* get trapped in one peak and totally miss the others
* visit the peaky areas too often and the valley areas too rarely

Both scenarios will fail the estimation of $$p(E)$$ and expectation values of observables miserably.

Before going to multicanonical sampling, I would like to explain why simple sampling is not a good solution in this case (even though it appears to).
Recall that in physics problems we don't fully know $$p(E)$$ since we don't
know partition function $$Z$$. It's actually not a problem because
we can create the ensemble by randomly sampling the phase space, which effectively makes temperature infinitely high.
The corresponding histogram $$H(E)$$ is actually an estimate of $$g(E)$$!

However, this $$g(E)$$ estimation is not very accurate due to the low efficiency of simple sampling.
Instead of making $$p(E)$$ constant, simply sampling makes $$p(q)$$ constant.
It overcomes the energy barrier but not the DOS barrier, which is the more severe barrier. Recall that Boltzmann factor is monotonic with energy thus unable to create peak/valley in $$p(E)$$.

Sampling more and more data points is not the way to go.
**The whole purpose of Monte Carlo sampling is to generate a small sample to represent the whole phase space statistics**.
We should never sample as many points as, for example, the number of possible states.
If there is a possibility to check every state, you should do it. Brutal force will give the exact result for every quantity, whereas many details of Monte Carlo methods could go wrong (see [Further studies](#further) section) and will go wrong (according to [Murphy's law](https://en.wikipedia.org/wiki/Murphy%27s_law)). We don't do brutal force often because the phase space is
too big (unless you are [Lars Onsager](https://en.wikipedia.org/wiki/Lars_Onsager) or [Rodney Baxter](https://en.wikipedia.org/wiki/Rodney_Baxter)).
For example, a 3D Ising model with 10x10x10 lattice has $$2^{1000}$$ states.
An off-lattice model has infinite states.

Now back to multicanonical sampling method. There are many variations of it. The basic idea is to estimate $$g(E)$$ using some iterative scheme and then sample with $$g^{-1}(E)$$.
The hope is to lift the valley in $$p(E)$$ so that the Markov chain can explore the phase space without rejection. The extreme form of this lifting is to make $$p(E)$$ constant.
MCMC with constant $$p(E)$$ corresponds to random walk in energy space, whereas simple sampling is performing random walk in phase space.

This reminds us the point that: **even if the problem has $$p(E)$$ defined,
we don't have to sample according to it**. Among the multicanonical sampling methods, I find the Wang-Landau method the coolest.

### Wang-Landau method

The [Wang-Landau method](https://en.wikipedia.org/wiki/Wang_and_Landau_algorithm) was invented in 2001. It aims to calculate the DOS $$g(E)$$ directly instead
of extracting it from $$p(E,\beta)$$. The idea is somewhat similar to Metropolis algorithm with two components

* a stochastic process
* a fixed point

Two quantities are tracked as the algorithm proceeds:

* an estimate of DOS $$g(E)$$
* a histogram $$H(E)$$

Initially the histogram is set to be all 0 and DOS is set to be all 1.

We still change states in phase space as in MCMC, but now the transition probability is

$$ W_{n\rightarrow m} = \min\left\{1, \frac{g(E_n)}{g(E_m)}\right\}$$

In other words, less likely state is always accepted.

After the change, both the histogram and the DOS will be updated. Usually the DOS entry will be augmented by a factor $$f_i$$. For the first round, $$f_1=e$$
(the exact value doesn't matter much as long as it's greater than 1).
This updates continues until $$H(E)$$ becomes flat. Then we reset $$H(E)$$ and
start over with $$f_{i+1}=\sqrt{f_i}$$. After several rounds, we can be more sure that $$g(E)$$ has converged to the right values.

I need to add that the Wang-Landau method is very easy to implement and gives amazing result, almost like magic. Compared to simple sampling, it is not only
more accurate, but also much faster. This is partly because simple sampling needs to
randomly generate each $$q$$ value to create a new configuration whereas
Wang-Landau method only needs to modify on the previous configuration for a new one.

I have the impression that Wang-Landau method has changed the field of Monte Carlo simulations.
According to Google scholar, the [original 2001 PRL paper](http://journals.aps.org/prl/abstract/10.1103/PhysRevLett.86.2050) has received over 2000 citations by now.
Unfortunately, Dr. Fugao Wang went to California as a software developer after his PhD,
a loss for the computational physics community.

## <a name='further'></a> Further studies

I try to keep things simple in this post. In reality, there are dirty details making life hard, for example,

* correlation time
* finite size scaling
* critical slowing down

I am not going to explain them here.
Also I didn't touch the more advanced topics such as

* quantum Monte Carlo methods
* renormalization group

As for references, I would recommend the one written by Dr. [David Landau](https://en.wikipedia.org/wiki/David_P._Landau) and Dr. [Kurt Binder](https://en.wikipedia.org/wiki/Kurt_Binder).
It is a great review of the technical details of many Monte Carlo methods, their issues, and applications.

<a target="_blank"  href="https://www.amazon.com/gp/product/1107074029/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1107074029&linkCode=as2&tag=nosarthur2016-20&linkId=52b6b96d7036c8930d1cba627606c7fe" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1107074029&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1107074029" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
