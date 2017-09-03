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
provide useful information on whether a physical or chemical process could happen spontaneously.
They are somewhat easy to measure experimentally (maybe?) thus it will be nice if we can calculate them from
numerical simulations (analytical derivation is the other option but it is not feasible in general).

However, given an ensemble generated either from Monte Carlo or molecular dynamics simulations,
the free energies are difficult to calculate in the sense that they are not
ensemble averages of physical observables.
([Entropy $$S$$](https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory)  
also belongs to that category.
But it is often of less interest since it is difficult to measure experimentally.)

The naive approach to calculate free energy is to take the ensemble average of the Boltzmann factor.
Take Helmholtz free energy for example, we have

$$ e^{-\beta A} \equiv \int d\mathbf q e^{-\beta H(\mathbf q)} \simeq \frac{1}{N}\sum_{i=1}^N e^{-\beta H(\mathbf q_i)} $$

where $$\beta=1/k_B T$$ is the inverse temperature, $$\mathbf q$$ denotes the configuration space variables,
$$H$$ is the Hamiltonian, and $$N$$ is the number of sample points. 
Note that if the ensemble average is carried out analytically or numerically integrated over all configuration space, the approximate equal sign becomes equal sign.

In practice this naive approach doesn't work very well for two reasons:

1. It may be hard to sample the full configuration space with good statistics:
certain low energy regions may not be visited and all high energy regions may not have been visited enough times.
1. This exponential estimator is of high variance even if the generated ensemble has reasonable coverage of the configuration space.

The first reason often puts a serious limitation on adopting this naive approach for chemistry applications because 

* the process of interest may take too long to occur;
* the density of states of the system may spread out in a range of energies that is too wide for effective sampling

In certain applications we can get around this obstacle by **calculating the free energy difference between two similar systems with the same configuration space**.
In these cases, the free energy difference is caused by a limited region of the configuration space thus only effective sampling in that region is needed.
These methods are commonly known as [free energy perturbation (FEP)](https://en.wikipedia.org/wiki/Free_energy_perturbation),
initially introduced by [Robert Zwanzig](https://en.wikipedia.org/wiki/Robert_Zwanzig) in the 1950s.
Two related methodologies are [thermodynamic integration](https://en.wikipedia.org/wiki/Thermodynamic_integration) and non-equlibrium work.

From the definition of Helmholtz free energy, we have

$$\Delta A\equiv A_0 - A_1= -\frac{1}{\beta}\log \frac{Q_0}{Q_1}$$

where $$Q$$ is [partition function](https://en.wikipedia.org/wiki/Partition_function_(statistical_mechanics)) 
and the subscripts 0 and 1 label the two systems.
With a little trick, we get

$$\frac{Q_0}{Q_1}=\frac{\int d\mathbf q e^{-\beta H_0} e^{\beta H_1}e^{-\beta H_1}}{Q_1} = \left<e^{-\beta\Delta H}\right>_1$$

where $$\Delta H\equiv H_0 - H_1$$ is the energy difference, the brackets denote ensemble average,
and the ensemble average is done on system 1.
Similarly, this trick can be applied on system 0 as well.
Notice that this new ensemble average is in the same form as the naive approach.

Often times, the kinetic energies of the two systems are either equal or can be related by some simple relationship.
For simplicity, I will assume they are equal in this post.
In that case, only potential energies are of concern.
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
Also the 4 potential energy differences are not all independent.
It is easy to see that the following identity holds

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


For simulated data, the two ensemble averages will differ because neither ensemble is perfectly representative of the underlying distribution.
In 1976 [Charles H Bennett](https://en.wikipedia.org/wiki/Charles_H._Bennett_(computer_scientist)) provided a clean 
solution to this problem. His free energy difference estimate is constructed from both ensembles and is guaranteed to have minimum variance.
This method is now known as the Bennett acceptance ratio (BAR) method.
And this is the topic of this post.

A link to the original paper is as follows.
This paper is full of insights and intuitions. I highly recomment it if you have not read it in detail.

* [ Charles H. Bennett (1976) Efficient estimation of free energy differences from Monte Carlo data. Journal of Computational Physics 22 : 245–268](http://www2.stat.duke.edu/~scs/Courses/Stat376/Papers/NormConstants/FreeEnergy/BennettJCompPhys1976.pdf)

Interestingly, Dr. Bennett didn't spend much of his time on computational chemistry.
Instead, he made many important contributions to quantum information theory, especially in communication and cryptography.
The most famous one may be [quantum teleportation](https://en.wikipedia.org/wiki/Quantum_teleportation),
which is a protocol to transport a quantum particle (or quantum state, to be more correct) instantaneously between two spatial locations, somewhat similar to that machine in [the fly movie](https://en.wikipedia.org/wiki/The_Fly_(1958_film)).


## combining two ensembles

Dr. Bennett noticed another little trick of the partition functions, i.e.,

$$
\frac{Q_0}{Q_1} = \frac{Q_0}{Q_1} \frac{\int W e^{-U_0-U_1}d\mathbf q}{\int W e^{-U_0-U_1}d\mathbf q}=\frac{\left<We^{-U_0}\right>_1}{\left<We^{-U_1}\right>_0}
$$

where $$W(\mathbf q)$$ is any arbitrary weighting function as long as it makes the integration well defined.

In this way, both ensembles can be used.
In fact, FEP with only one ensemble can be seen as two limits of this identity: just make $$W=U_0$$ or $$W=U_1$$.

Note again that **for any finite-size ensembles, the form of the weight function matters**:
you would get different values with different weight functions (try Monte Carlo sampling on the two-level systems example and see).
It is then natural to look for the optimal weight function.

## digression on bias, variance, and statistical expansion

Before we proceed with the search of optimal weight function, it will be worthwhile to review some tricks for nonlinear estimators since free energies are nonlinear functions of the configuration space coordinates.

For a random variable $$X$$ and a nonlinear function $$f$$, notice that in general

$$ \left<f(X)\right> \neq f(\left<X\right>).$$

The best we can do is [to approximate it using Taylor expansions](https://en.wikipedia.org/wiki/Taylor_expansions_for_the_moments_of_functions_of_random_variables).
Up to second orders, we have

$$ \begin{align}
\left< f(X)\right> = & \left<f(x_0) + f(X) - f(x_0)\right> \\
 \simeq & f(x_0) + f'(x_0)\left<X - x_0\right> + \frac{f''(x_0)}{2}\left<(X-x_0)^2\right>
\end{align} $$

where $$x_0$$ could be any quantity that makes the expansion convergent. 

The quality of an estimator can be measured by [mean square error](https://en.wikipedia.org/wiki/Mean_squared_error) (MSE), variance, and bias. 
In my opinion, it's best to use MSE if possible, since [it contains variance, bias, and possibly other noise contributions](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff).
In the above approximation, we can take $$x_0$$ to be the ground truth ensemble average,
which I will denote as $$\bar X$$. Then we have 

$$\left< f(X)\right> \simeq f(\bar X) + f'(\bar X)\left< X - \bar X\right> + \frac{f''(\bar X)}{2}\text{MSE}[X] $$

and the MSE of $$f(X)$$ is given by

$$\text{MSE}[f(X)]\equiv \left<(f(X)-f(\bar X))^2\right> \simeq f'(\bar X)^2 \text{MSE}[X] $$

Similarly, if variance is of interest, we can take $$x_0$$ to be the ensemble average from the data,
which I denote as $$\left<X\right>$$. Then we have 

$$\left<f(X)\right> \simeq f(\left< X\right>) + \frac{f''(\left< X\right>)}{2}\text{Var}[X] $$

and the variance relationship is given by

$$ 
\text{Var}[f(X)] \equiv  \left<f(X)^2\right> - \left<f(X)\right>^2 \simeq f'(\left<X\right>)^2 \text{Var}[X]
$$

Note that it may look a little strange where $$f'(\left<X\right>)$$ comes from.
I guarantee you that there is no typo here.
Also, the explanation in the [wikipedia page](https://en.wikipedia.org/wiki/Taylor_expansions_for_the_moments_of_functions_of_random_variables) is wrong: the expansion should be done to the second order.

Going back to our free energy estimation 

$$\Delta A = \log\left<We^{-U_1}\right>_0 - \log\left<We^{-U_0}\right>_1$$

if we assume the **two ensembles are independently generated**, then we can drop the covariance term and 

$$ \begin{align}
\text{Var}[\Delta A] =& \text{Var}[\log We^{-U_1}]_0 + \text{Var}[\log We^{-U_0}]_1\\
\simeq & \frac{\text{Var}[We^{-U_1}]_0}{\left<We^{-U_1}\right>_0^2} + \frac{\text{Var}[We^{-U_0}]_1}{\left<We^{-U_0}\right>_1^2} 
\end{align}$$

Note that MSE can be decomposed in the same way.

Now if we further assume **each configuration space point is sampled independently** (in practice, there are correlations between consecutively generated data, both for Monte Carlo and molecular dynamics simulations),
we can use [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) to get

$$
\text{Var}[\Delta A] =\frac{\left< W^2e^{-2U_1}\right>_0}{N_0\left<We^{-U_1}\right>_0^2} + \frac{\left<W^2e^{-2U_0}\right>_1}{N_1\left<We^{-U_0}\right>_1^2} -\frac{1}{N_0} - \frac{1}{N_1}
$$

where $$N_i$$ are the number of sample points in the ensembles.
This is the cost function to be minimized in the next section.
Note that in the original paper it was worded as if the [MSE](https://en.wikipedia.org/wiki/Mean_squared_error) was minimized, which is incorrect.

## optimal weight function

We are now ready to tackle the optimization problem for mininum variance solution.
The first two terms in $$\text{Var}[\Delta A]$$ can be written out explictly as

$$\frac{1}{\lambda}\equiv \frac{\left<W|A|W\right>}{\left<W|B\right>\left<B|W\right>}$$

where I use the [Dirac notation](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation) to represent infinite dimensional Hilbert space, and

$$ \begin{align}
A=& \frac{Q_0}{N_0} e^{-2U_1-U_0} + \frac{Q_1}{N_1}e^{-2U_0-U_1} \\
\left|B\right>=& e^{-U_0-U_1}
\end{align}$$

I write it in this way because I have done something similar at least twice in the past.
Once in optimizing quantum gate fidelity with respect to pulse shape, the other time in maximizing signal noise ratio (SNR) while combining magnetic resonance imaging coil data (see [the corresponding note here]({% post_url 2013-07-22-coil %})).

To minimize the free energy variance is equivalent to maximize $$\lambda$$.
Setting its [first variation](https://en.wikipedia.org/wiki/First_variation) to 0, we get
an eigenvalue equation

$$ A^{-1}|B\left>\right<B\left|W\right> = \lambda \left|W\right> $$

Note that the 'matrix' $$A^{-1}|B\left>\right<B|$$ has only one degree of freedom due to the project operator.
Thus we are guaranteed a unique solution.
It is easy to see that the solution is given by

$$\begin{align}
\left|W\right> =& A^{-1}\left|B\right> = \frac{1}{\frac{Q_0}{N_0}e^{-U_1} + \frac{Q_1}{N_1}e^{-U_0} }\\
\lambda_\max =& \left<B|A^{-1}|B\right>
\end{align}$$

Thus we have

$$\frac{Q_0}{Q_1} = \frac{\left< f(\Delta U + C)\right>_1} {\left<f(-\Delta U - C)\right>_0} e^{C}$$

where $$f(x) = 1/(1+\exp(x))$$ is the [Fermi function](https://en.wikipedia.org/wiki/Fermi%E2%80%93Dirac_statistics), and 

$$C\equiv \log \frac{N_1Q_0}{N_0Q_1} $$

This is the famous BAR result.
Note that $$C$$ depends on the ratio of partition function as well.
Thus an iterative procedure is needed to solve them self-consistently.

The free energy variance is given by 

$$\begin{align}
\text{Var}[\Delta A]=& \frac{1}{\lambda_{\max}} - \frac{1}{N_0} - \frac{1}{N_1} \\
=& \left(\int \frac{N_0N_1\rho_0\rho_1 d\mathbf q }{N_0\rho_0 + N_1\rho_1} \right)^{-1} - \frac{N_0 + N_1}{N_0N_1}
\end{align}
$$

where $$\rho_i\equiv \exp(-U_i)/Q_i$$ is the probability density of the configuration space point.
Since $$\text{Var}[\Delta A]$$ is monotonically decreasing in both $$N_0$$ and $$N_1$$, there must be some
$$\bar N$$ lying between them, making

$$
\text{Var}[\Delta A]= \frac{2}{\bar N}\left(\frac{1}{\int \frac{\rho_0\rho_1}{\rho_0 + \rho_1} d\mathbf q} -1\right)
$$

Note that the [harmonic mean](https://en.wikipedia.org/wiki/Harmonic_mean) in the integration is a measure of overlap between the two probability distributions.
Thus this equation has the geometric meaning that **the variance in the free energy difference estimation is inversely related to the overlap between the two ensemble's probability distributions in configuration space**.

## acceptance ratio

Finally I would like to explain why this method is called acceptance ratio.
If we define

$$
\begin{align}
M(U_0-U_1)&\equiv W e^{-U_0}\\
M(U_1-U_0)&\equiv We^{-U_1}
\end{align}
$$

then we have 

$$\frac{M(x)}{M(-x)} = e^{-x}$$

which is the [detailed balance](https://en.wikipedia.org/wiki/Detailed_balance) condition for state transitions.
In other words, with any arbitrary choice of the weight function $$W$$,
the function $$M(x)$$ can be interpreted as acceptance probability for Monte Carlo trial move of switching the potential function forms.
For example, if we let
$$W(\mathbf q)=\exp(\min\{U_0, U_1\})$$, $$M(x)$$ takes the exact form of Metropolis function.

Thus the BAR method tells us that **the partition function ratio (thus the free energy difference) is equal to the Monte Carlo acceptance ratio**.
It is essentially a detailed balance equation between two ensembles, somewhat similar to the one used in grand-canonical systems.

## summary

Here I have reviewed the major results of the BAR method, which is a minimum variance estimator for free energy difference given two ensembles.
Again I strongly recommend reading the original paper, which talks about many more topics than what I covered here.
For example, Dr. Bennett also pointed out the limitation of the BAR method and its potential remedy when the probability distributions of the two ensembles don't overlap.

