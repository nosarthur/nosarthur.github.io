---
layout: post
title: Bennett acceptance ratio (BAR) method
date:   2017-09-14 23:43:08 -0500
categories: [math and physics]
comments: true
tags: [free energy perturbation]
---

## introduction

Given an ensemble either generated from Monte Carlo or molecular dynamics simulation,
the following thermodynamic quantities are difficult to calculate in the sense that they are not
ensemble average of physical observables

* [Helmholtz free energy $$A$$](https://en.wikipedia.org/wiki/Helmholtz_free_energy)
* [Gibbs free energy $$G$$](https://en.wikipedia.org/wiki/Gibbs_free_energy)
* [Entropy $$S$$](https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory)

However, the free energies are somewhat easy to measure experimentally thus there is a need to calculate them from the simulation data (or analytically).
Entropy is of less concern since it is difficult to measure experimentally as well.

The naive approach to calculate free energy from an ensemble is to take the ensemble average of the Boltzmann factor.
Take Helmholtz free energy for example, we have

$$ e^{-\beta A} \equiv \int d\mathbf q e^{-\beta H(\mathbf q) \simeq \left<e^{-\beta H}\right> $$

where $$\beta=1/k_B T$$ is the inverse temperature, $$\mathbf q$$ denotes the configuration space variables,
$$H$$ is the Hamiltonian, and the brackets denotes ensemble average.

This approach doesn't work very well for two reasons:

1. It may be hard to sample the full configuration space, both for low energy regions and high energy regions.
1. This exponential estimator is of high variance even if the generated ensemble has reasonable coverage of the configuration space.

Here high variance means if you generate the ensemble again,
you probably get a very different number for the free energy form the first ensemble.

The first reason often puts a serious limitation to adopt this naive approach in chemistry applications since

* the process of interest may take too long to occur;
* the density of states of the system may spread out in a wide range of energies, too wide for effective sampling

In certain applications we may get around this obstacle by calculating the free energy difference between two similar systems.
In these cases, the free energy difference is caused by a limited region of the configuration space thus only effective sampling in that region is needed.
There methods are commonly known as [free energy perturbation (FEP)](https://en.wikipedia.org/wiki/Free_energy_perturbation),
initially introduced by [Robert Zwanzig](https://en.wikipedia.org/wiki/Robert_Zwanzig) in the 1950s.

From the definition of Helmholtz free energy, we have

$$\Delta A\equiv A_0 - A_1= -\frac{1}{\beta}\log \frac{Q_0}{Q_1}$$

where $$Q$$ denotes [partition function](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics)) 
and the subscripts 0 and 1 labels the two systems.
With a little bit of trick

$$\frac{Q_0}{Q_1}=\frac{\int d\mathbf q e^{-\beta H_0} e^{\beta H_1}e^{-\beta H_1}}{Q_1} = \left<e^{-\beta\Delta H}\right>_1$$

where $$\Delta H\equiv H_0 - H_1$$ and the ensemble average is done on system 1.
Similarly, we can make the ensemble average to occur on system 0 as well.

Often times the values we get from ensemble 0 differ from the ones from ensemble 1 because neither ensemble is perfect in practice.
Then the question becomes which one is trust or how to combine these two numbers (besides averaging them).
[Charles H Bennett](https://en.wikipedia.org/wiki/Charles_H._Bennett_(computer_scientist)) provided a clean answer in 1976
and his solution has been named as Bennett acceptance ratio (BAR) method.
And this is the topic of this post.

Interestingly, Dr. Bennett didn't spend much of his time on computational chemistry.
Instead, he made many important contributions to quantum information theory, especially in communication and cryptography.
The most famous one may be [quantum teleportation](https://en.wikipedia.org/wiki/Quantum_teleportation),
which is a protocol to transport a quantum particle (or quantum state, to be more correctly) instantaneously between to spatial locations, somewhat similar to that machine in [the fly movie](https://en.wikipedia.org/wiki/The_Fly_(1958_film)).


## combining two ensembles

Dr. Bennett noticed another little trick of the partition functions, i.e.,

$$
\frac{Q_0}{Q_1} = \frac{Q_0}{Q_1} \frac{\int W e^{-U_0-U_1}d\mathbf q}{\int W e^{-U_0-U_1}d\mathbf q}=\frac{\left<We^{-U_0}\right>_1}{\left<We^{-U_1}\right>_0}
$$

where $$W(\mathbf q)$$ is any arbitrary weighting function on the configuration space as long as it makes the integration well defined.
I have also absorbed the inverse temperature into the potential energy $$U$$ to save typing.

The interesting features of this identity are

* both ensembles can be used
* $$W$$ is arbitrary

In fact, FEP with only one ensemble can be seen as limits of this identity: just make $$W=U_0$$ or $$W=U_1$$.

Note also that for any **finite size ensemble**, the form of the weight function matters:
you would get different values for different $$W$$ functions.
It is then natural to find the optimal weighting function.
Dr. Bennett used the [mean square error](https://en.wikipedia.org/wiki/Mean_squared_error) as the cost function



$$W(\mathbf q)=\exp{\min{U_0, U_1}}$$, both numerator and denorminator take the form of Metropolis function.

