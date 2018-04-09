---
layout: post
title: Quantum entanglement measure
date:   2018-09-31 09:00:00 -0500
categories: [quantum information and computation]
comments: true
tags: [entanglement]
---
There are two things in quantum mechanics that I find very weird:

* the superposition principle
* the von Neumann type measurement

In this post, I will talk about the weirdness of the first one.
There are already famous paradoxes related to the superposition principle, for example

* [the Schrodinger's cat](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat) (1935)
* [Einstein-Podolsky-Rosen (EPR) paradox](https://en.wikipedia.org/wiki/EPR_paradox) (1935)

I won't focus on them here. Instead, I will focus on a practical thing: quantifying information.
In the classical information theory, entropy is used for this task.
For a quick review of entropy, check out [this blog post]({% post_url 2016-12-30-entropy %}).



Let $$p(HT)$$ denote the probability of the outcome being one head (H) and one tail (T).

$$
p(HT) = p_1(H)p_2(T) + p_1(T)p_2(H)
$$

one of the Bell state

$$
\left|\psi\right> = \frac{1}{\sqrt 2}\left(\left|HT\right> + \left|TH\right>\right) 
$$

For this state, 
$$
p_1(H)= p_2(T) = p_1(T)= p_2(H)= \frac{1}{2}
$$

$$p(HT)=1$$

Bell's inequality
