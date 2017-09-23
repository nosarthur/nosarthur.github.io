---
layout: post
title: Measurement and mutual information
date:   2017-09-23 13:43:08 -0500
categories: [quantum information and computation]
comments: true
tags: [classical information]
---

In a [previous post]({% post_url 2016-12-30-entropy %}), I wrote about the ideas behind entropy.
In a nutshell, there are two definitions for it

* microcanonical ensemble entropy (information capacity)
* canonical ensemble entropy (information content)

both of which are **state counting** in essence.
In this post, I will supplement a few interesting properties of entropy.
Specifically, 

1. With independent subsystems, the total system entropy is the sum of the subsystem entropies.
1. When performing measurement on a coarse-grained system, the entropy of the fine-grained system (i.e., the original system) is the sum of the measurement entropy (i.e., the coarse-graining process) and the average entropy of the post-measurement coarse-grained systems.
1. Total system entropy is the sum of conditional entropy and the entropy of the subsystem being conditioned on.

Note that these properties hold for both entropy definitions.
For simplicity, I will only demonstrate them in the microcanonical ensemble.
The corresponding proofs are straightforward in the canonical ensemble as well and I will leave that to you.
Since my plan is to write about quantum information in later posts, the letter $$S$$ will be saved for [von Neumann entropy](von neumann entropy) of quantum systems,
and the more conventional notation of [Shannon entropy](https://en.wiktionary.org/wiki/Shannon_entropy) $$H[x]$$ is used in this post to quantity classical information.

# property 1

This property may be the most obvious one among the three, at least conceptually.
In the microcanonical ensemble, it amounts to the identity

$$ \log N_1 N_2 = \log N_1 \log N_2 $$

where $$N_i$$ is the number of states of subsystem $$i$$.

# property 2

To demonstrate this property in microcanonical ensemble, let us assume there are $$M+N$$ states in total and we group them into two groups

$$ \{1, 2, \cdots, M\}, \{M+1, M+2, \cdots, M+N\}$$

The outcome of the coarse-graining measurement is whether the sample is in the first or second group.
In other words, it provides partial information of the system.
A concrete example is throwing a dice and reporting the result as being greater than 2 or not.

With this setup, property 2 translate to 

$$ \log(M+N) = H\left[\left\{\frac{M}{M+N}, \frac{N}{M+N}\right\}\right] + \frac{M}{M+N}\log M + \frac{N}{M+N}\log N$$

where $$H[\{p_i\}]$$ denotes the Shannon entropy of a probability distribution $$\{p_i\}$$.

# property 3

The [conditional entropy](https://en.wikipedia.org/wiki/Conditional_entropy) is defined as follows

$$H[x|y] \equiv \sum_j P(y_j) H[P(x|y_j)]$$

It is the averaged entropy conditioned on a measurement outcome.
In other words,
it is the left-over uncertainty (information) after the measurement.

The general statement of property 3 is 

$$H[x, y] = H[x|y] + H[y] $$

Note that property 2 can be viewed as a special case of property 3 when the measurement is a coarse-graining measurement.

To see the meaning of property 3 in the microcanonical ensemble, we have to make the two groups overlapping,
otherwise the result would be trivial (i.e., we would end up with property 1).
Going back to the dice example, $$x$$ could be a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) about whether the outcome is less than 4 and $$y$$ could be a Bernoulli distribution of whether the outcome is greater than 1.

With the two groups being

$$ \{1, 2, \cdots, M+N\}, \{M+1, M+2, \cdots, M+N+L\}$$

the probability distribution of the two random variables can be summarized with the table

x \ y | False | True
---|---|---
False | 0 | $$\frac{L}{M+N+L}$$
True | $$\frac{M}{M+N+L}$$ | $$\frac{N}{M+N+L}$$

A graphical representation of the grouping is as follows

<svg width='410' height='100'>
  <rect x=5 width="200" height="90" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(255,255,255);fill-opacity:0.1" />
  <rect x=205 width="100" height="90" style="fill:rgb(255,0,255);stroke-width:3;stroke:rgb(255,255,255);fill-opacity:0.1" />
  <rect x=305 width="100" height="90" style="fill:rgb(255,0,0);stroke-width:3;stroke:rgb(255,255,255);fill-opacity:0.1" />
  <text x='100' y='40' text-anchor='middle' font-size='18'> M < /text>
  <text x='250' y='40' text-anchor='middle' font-size='18'> N < /text>
  <text x='350' y='40' text-anchor='middle' font-size='18'> L < /text>
</svg>


The three quantities in property 3 are given by

$$\begin{align}
H[x, y] & = H\left[\left\{\frac{M}{M+N+L}, \frac{N}{M+N+L}, \frac{L}{M+N+L} \right\}\right] \\
H[x|y] & = \frac{M}{M+N+L}\cdot 0 + \frac{N+L}{M+N+L}H\left[\left\{\frac{N}{N+L}, \frac{L}{N+L} \right\}\right] \\
H[y] & = H\left[\left\{\frac{M}{M+N+L}, \frac{N+L}{M+N+L} \right\}\right]
\end{align}
$$

An important concept built upon conditional entropy is **[mutual information](https://en.wikipedia.org/wiki/Mutual_information)**, which is defined as

$$I[x, y] \equiv H[x] - H[x|y] = H[y] - H[y|x]$$

It is in some sense the information shared between two systems.
Note that mutual information is symmetric in the two random variables.

In later posts, I will show that for quantum systems, due to the superposition principle of quantum mechanics ([Schroedinger's cat](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat) for example),
classical information theory becomes insufficient to capture the inter-relationships between quantum objects.
In general, quantum information (i.e., information of quantum systems) includes

* classical information
* [quantum entanglement](https://en.wikipedia.org/wiki/Quantum_entanglement)
* other non-classical correlations, e.g., [quantum discord](https://en.wikipedia.org/wiki/Quantum_discord)

Till today, the quantification of either the entanglement or other non-classical correlations for arbitrary systems is still an open problem.
