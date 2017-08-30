---
layout: post
title: Bennett acceptance ratio (BAR) method
date:   2017-09-14 23:43:08 -0500
categories: [math and physics]
comments: true
tags: [free energy perturbation]
---

## introduction

[Helmholtz free energy $$A$$](https://en.wikipedia.org/wiki/Helmholtz_free_energy)
and [Gibbs free energy $$G$$](https://en.wikipedia.org/wiki/Gibbs_free_energy)
provide useful information on whether certain physical or chemical process could happen spontaneously.
They are somewhat easy to measure experimentally (maybe?) thus it will be nice if we can calculate them from
numerical simulations (analytical derivation is the other option but it is not feasible in general).

However, given an ensemble either generated from Monte Carlo or molecular dynamics simulation,
the free energies are difficult to calculate in the sense that they are not
ensemble averages of physical observables.
([Entropy $$S$$](https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory)
also cannot be expressed as an ensemble average of physical observables.
It is of less interest since it is difficult to measure experimentally as well.)

The naive approach to calculate free energy is to take the ensemble average of the Boltzmann factor.
Take Helmholtz free energy for example, we have

$$ e^{-\beta A} \equiv \int d\mathbf q e^{-\beta H(\mathbf q)} \simeq \left<e^{-\beta H}\right> $$

where $$\beta=1/k_B T$$ is the inverse temperature, $$\mathbf q$$ denotes the configuration space variables,
$$H$$ is the Hamiltonian, and the brackets denote ensemble average.
Note that if the ensemble average is carried out analytically or numerically integrated over all configuration space, the approximate equal sign becomes equal sign.

In practice this naive approach doesn't work very well for two reasons:

1. It may be hard to sample the full configuration space with good statistics:
certain low energy regions may not be visited and high energy regions may not have been visited enough times.
1. This exponential estimator is of high variance even if the generated ensemble has reasonable coverage of the configuration space.

Here high variance means if you generate the ensemble again,
you probably get a very different number for the free energy from the first ensemble.

The first reason often puts a serious limitation on adopting this naive approach for chemistry applications because 

* the process of interest may take too long to occur;
* the density of states of the system may spread out in a wide range of energies, too wide for effective sampling

In certain applications we can get around this obstacle by calculating the free energy difference between two similar systems with the same configuration space.
In these cases, the free energy difference is caused by a limited region of the configuration space thus only effective sampling in that region is needed.
There methods are commonly known as [free energy perturbation (FEP)](https://en.wikipedia.org/wiki/Free_energy_perturbation),
initially introduced by [Robert Zwanzig](https://en.wikipedia.org/wiki/Robert_Zwanzig) in the 1950s.

From the definition of Helmholtz free energy, we have

$$\Delta A\equiv A_0 - A_1= -\frac{1}{\beta}\log \frac{Q_0}{Q_1}$$

where $$Q$$ is [partition function](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics)) 
and the subscripts 0 and 1 label the two systems.
With a little trick, we get

$$\frac{Q_0}{Q_1}=\frac{\int d\mathbf q e^{-\beta H_0} e^{\beta H_1}e^{-\beta H_1}}{Q_1} = \left<e^{-\beta\Delta H}\right>_1$$

where $$\Delta H\equiv H_0 - H_1$$ and the ensemble average is done on system 1.
Often times, the kinetic energies of the two systems are either equal or can be related by some simple relationship.
For simplicity, I will assume their kinetic energies are equal in this post.
Similarly, we can make the ensemble average to occur on system 0 as well.
Thus we have

$$\frac{Q_0}{Q_1}=\left<e^{-\Delta U}\right>_1=\frac{1}{\left<e^{\Delta U} \right>_0}$$

where $$\Delta U \equiv U_0 - U_1$$ is the potential energy difference and I have also absorbed the inverse temperature into the potential energy to save typing.

Let us take two classical (as in classical mechanics) two-level systems as example,
which is simple enough for analytical solutions.
Suppose the two levels are called $$a$$ and $$b$$ and the two systems are labeled by $$0$$ and $$1$$.
Then the occupation probabilities
and the partition function ratio
are given by 

$$\begin{align}
p_{1a} &= \frac{e^{-U_{1a}}}{e^{-U_{1a}} + e^{-U_{1b}}} = \frac{1}{1+e^{\Delta U_1}} \\
p_{1b} &= \frac{1}{1+e^{-\Delta U_1}}\\
p_{0a} &= \frac{1}{1+e^{\Delta U_0}}\\
p_{0b} &= \frac{1}{1+e^{-\Delta U_0}}\\
\frac{Q_0}{Q_1}& =p_{1a}e^{-\Delta U_a} + p_{1b}e^{-\Delta U_b} = \frac{1}{p_{0a}e^{\Delta U_a} + p_{0b}e^{\Delta U_b}}
\end{align}$$

where 

$$\begin{align}
\Delta U_1 = U_{1a} - U_{1b} \\
\Delta U_0 = U_{0a} - U_{0b} \\
\Delta U_a = U_{0a} - U_{1a} \\
\Delta U_b = U_{0b} - U_{1b} 
\end{align}
$$

Note that the partition function ratio (thus the free energy difference) is a function of the potential energy differences only, which leaves the potential energy baseline arbitrary.
Later we will see how this degree of freedom can be used to our advantage.

Note also that the 4 potential energy differences are not indepenedent.
It is easy to see that the following identity is true

$$\Delta U_a + \Delta U_1 = \Delta U_b + \Delta U_0$$

At this point, I strongly recommend you to analytically verify that the two ensemble averages agree.
A numerical check in python is as follows

```
import random
import math

dU0 = random.random()
dU1 = random.random()
dUa = random.random()
dUb = dUa + dU1 - dU0

p1a = 1. / (1+ math.exp(dU1))
p1b = 1. / (1+ math.exp(-dU1))
p0a = 1. / (1+ math.exp(dU0))
p0b = 1. / (1+ math.exp(-dU0))

ratio0 = 1/ (p0a* math.exp(dUa) + p0b* math.exp(dUb))
ratio1 = p1a* math.exp(-dUa) + p1b* math.exp(-dUb)
```


For simulated data, the two ensemble averages will differ because neither ensemble is perfectly representative.
[Charles H Bennett](https://en.wikipedia.org/wiki/Charles_H._Bennett_(computer_scientist)) provided a clean 
solution to reconsile these two numbers in 1976,
commonly known as the Bennett acceptance ratio (BAR) method.
And this is the topic of this post.

Interestingly, Dr. Bennett didn't spend much of his time on computational chemistry.
Instead, he made many important contributions to quantum information theory, especially in communication and cryptography.
The most famous one may be [quantum teleportation](https://en.wikipedia.org/wiki/Quantum_teleportation),
which is a protocol to transport a quantum particle (or quantum state, to be more correct) instantaneously between to spatial locations, somewhat similar to that machine in [the fly movie](https://en.wikipedia.org/wiki/The_Fly_(1958_film)).


## combining two ensembles

Dr. Bennett noticed another little trick of the partition functions, i.e.,

$$
\frac{Q_0}{Q_1} = \frac{Q_0}{Q_1} \frac{\int W e^{-U_0-U_1}d\mathbf q}{\int W e^{-U_0-U_1}d\mathbf q}=\frac{\left<We^{-U_0}\right>_1}{\left<We^{-U_1}\right>_0}
$$

where $$W(\mathbf q)$$ is any arbitrary weighting function on the configuration space as long as it makes the integration well defined.

The interesting features of this identity are

* both ensembles can be used
* $$W$$ is arbitrary

In fact, FEP with only one ensemble can be seen as limits of this identity: just make $$W=U_0$$ or $$W=U_1$$.

Note also that for any **finite size ensemble**, the form of the weight function matters:
you would get different values for different weighting functions.
It is then natural to find the optimal weighting function.
Dr. Bennett used the [mean square error](https://en.wikipedia.org/wiki/Mean_squared_error) as the cost function

Dr. Bennett pointed out that this approach fails when both numerator and denominator are small.

$$
\begin{align}
M(U_0-U_1)&\equiv e^{-U_0W}\\
M(U_1-U_0)&\equiv e^{-U_1W}
\end{align}
$$

then we have 

$$\frac{M(x)}{M(-x)} = e^{-x}$$

In other words, $$M(x)$$ can be used as acceptance probability for Monte Carlo trial move of switching the potential function
forms.

$$W(\mathbf q)=\exp(\min\{U_0, U_1\})$$, both numerator and denorminator take the form of Metropolis function.

