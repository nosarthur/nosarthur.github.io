---
layout: post
title: Measurement and mutual information
date:   2017-10-01 03:43:08 -0500
categories: [quantum information and computation]
comments: true
tags: [classical information]
---

In a [previous post](), I wrote about the ideas behind entropy. In a nutshell, there are two definitions for it

* microcanonical ensemble entropy (information capacity)
* canonical ensemble entropy (information content)

both of which are **state counting** in essence. In this post, I will supplement a few interesting properties of entropy.
Specifically, 

1. With independent subsystems, the entropy of the total system is the sum of the subsystem entropies.
1. When performing measurement on a coarse-grained system, the entropy of the fine-grained system (i.e., the original system) is the sum of the measurement entropy (i.e., the coarse-graining process) and the average entropy of the post-measurement coarse-grained systems.
1. Total system entropy is the sum of conditional entropy and the entropy of the subsystem being conditioned on.

Note that these properties hold for both entropy definitions.
For simplicity, I will only demonstrate them in the microcanonical ensemble.
The corresponding proofs are straightforward in the canonical ensemble as well and I will leave that to you.
Since my plan is to write about quantum information in later posts, the letter $$S$$ will be saved for quantum systems,
and the more conventional notation of [Shannon entropy](https://en.wiktionary.org/wiki/Shannon_entropy) $$H[x]$$ is used in this post.

# property 1

This property may be the most obvious one among the three.
In the microcanonical ensemble, it amounts to the identity

$$ \log N_1 N_2 = \log N_1 \log N_2 $$

where $$N_i$$ is the number of states of subsystem $$i$$.

# property 2

To demonstrate this property in microcanonical ensemble, let us assume there are $$M+N$$ states in total and we group them into two groups

$$ \{1, 2, \cdots, M\}, \{M+1, M+2, \cdots, M+N\}$$

The outcome of the coarse-graining measurement is whether the sample is in the first or second group.
In other words, it provides partial information to the system.
A concrete example is throwing a dice and reporting the result as being greater than 2 or not.

With this setup, property 2 translate to 

$$ \log(M+N) = H(\{\frac{M}{M+N}, \frac{N}{M+N}\}) + \frac{M}{M+N}\log M + \frac{N}{M+N}\log N$$

where $$H(\{p_i\}$$ denotes the Shannon entropy of a probability distribution $$\{p_i\}$$.

# property 3

The [conditional entropy](https://en.wikipedia.org/wiki/Conditional_entropy) is defined as follows

$$H[x|y] \equiv \sum_j P(y_j) H[P(x|y_j)]$$

It is the averaged entropy conditioned on a measurement outcome.

The general statement of property 3 is 

$$H[x, y] = H[x|y] + H[y] $$

Note that property 2 can be viewed as a special case of property 3 when the measurement is a coarse-graining measurement.

To see what property 3 means in the microcanonical ensemble, we have to make the two groups overlapping,
otherwise the result would be trivial (i.e., we would end up with property 1).
Going back to the dice example, $$x$$ could be a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) about whether the outcome is less than 4 and $$y$$ could be a Bernoulli distribution of whether the outcome is greater than 1.

With the two groups being

$$ \{1, 2, \cdots, M+N\}, \{M+1, M+2, \cdots, M+N+L\}$$

the probability distribution of the two random variables can be summarized with the table

x \ y | False | True
---|---|---
False | 0 | $$\frac{L}{M+N+L}$$
True | $$\frac{M}{M+N+L}$$ | $$\frac{N}{M+N+L}$$

and the three quantities in property 3 are given by

$$\begin{align}
H[x, y] & = H[\{\frac{M}{M+N+L}, \frac{N}{M+N+L}, \frac{L}{M+N+L} \}] \\
H[x|y] & = \frac{M}{M+N+L}\cdot 0 + \frac{N+L}{M+N+L}H[\{\frac{N}{N+L}, \frac{L}{N+L} \}] \\
H[y] & = H[\{\frac{M}{M+N+L}, \frac{N+L}{M+N+L} \}]
\end{align}
$$

**mutual information**

$$I[x, y] = H[x] - H[x|y]$$

[von Neumann measurement](https://en.wikipedia.org/wiki/Measurement_in_quantum_mechanics#von_Neumann_measurement_scheme)

[positive-operator valued measure (POVM)](https://en.wikipedia.org/wiki/POVM)


