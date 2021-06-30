---
layout: post
title: "Error analysis on free energy perturbation method: part I"
date:   2021-08-22 10:40:00 -0500
categories: [math and physics]
comments: true
tags: [probabilities, random processes]
---

cite the previous BAR article



In this post, I will analyze the error propagation for the vanila free energy perturbation (FEP) method

$$ \Delta A=\left<e^{-\beta\Delta U} \right>_0 \simeq \sum_i e^{-\beta \Delta U_i}$$

Clearly there are two types of errors

- Model error $U(\mathbf q)$
  - Force field (FF) is used but quantum mechanics (QM) is needed
  - QM is not needed but FF at hand is not accurate enough 
- Sampling error $p(\mathbf q)$

My focus here is on the sampling error.

I assume the vanila FEP method generates a sample of $N$ points in the phase space. 

- Continuous phase space $\mathbf q$: 
- Discrete phase space $\{\mathbf q_i|i\in\mathbb {Z}_M\}$: some of the $M$ states may not be sampled

## case study 1: same phase space, different energies



Here we are going to demonstrate the method on a simple system.
We will also make numerical samples to


## Two two-level systems



The partition function is

$$
Q = e^{-\beta E_0} + e^{-\beta E_1} = 1 + e^{-\beta E_1}
$$

For simplicity, I assume ground state energy is 0.


> Figure 1. Energy diagram of two two-level systems.


The probabilities of the two states are


$$
p_0 = & \frac{1}{Q}} \\
p_1 = & \frac{e^{-\beta E_1}}{Q}
$$

And the free energy is

$$
F = -\frac{1}{\beta} \log{1+e^{-\beta E_1}}
$$

Two w

svg here



## Using Zwanzig relation

Using the [Zwanzig relation](http://www.alchemistry.org/wiki/Exponential_Averaging),
it is easy to show that

$$ \begin{align}
e^{-\beta\Delta F} =& \left< e^{-\beta \Delta E}\right>\\
            =& p_{0A} + p_{1A} e^{-\beta(E_B-E_A)}
\end{align}$$

where $\Delta F \equiv F_B - F_A$.

If $\Delta E$ (thus $\Delta F$) is large, it would be challenging to estimate
free energy $F$ accurately from a sample.


### Error analysis

$$
e^{-\beta \tilde {\Delta F}} = e^{-\beta {\Delta F}} + \epsilon \left[
    e^{-\beta \Delta E_0} - e^{-\beta \Delta E_1}
\right]
$$

case 1
With sampling error, if the energies are simply shifted between the two systems A and B,
there is no error.

This holds for two general systems too.

case 2

One state is not sampled at all

$\epsilon$ as big as $p_{1A}$


### Numerical example

N \ $\Delta E$ | kT | 5 kT
---|---|---
10 | |
1000 | |



## Using variational principle


$$
\Delta F \le \left< \Delta E \right>
$$

Feynman's book

Note the similarity of this equation to the Zwanzig relation.
Its validity can be shown using the fact that $\exp(-\beta E)$ is a
[convex function](https://en.wikipedia.org/wiki/Convex_function).



