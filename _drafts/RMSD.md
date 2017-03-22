---
layout: post
title: RMSD and RMSF
date:   2017-03-29 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [RMSD, RMSF]
---

[RMSD (root mean square deviation)](https://en.wikipedia.org/wiki/Root-mean-square_deviation) and [RMSF (root mean square fluctuation)](https://en.wikipedia.org/wiki/Root-mean-square_deviation_of_atomic_positions) are commonly used to measure the spatial variations of biomolecules in a molecular dynamics (MD) simulation.
Their definitions are given by 

$$\begin{align}
\text{RMSD}(t) \equiv& \sqrt{\frac{1}{N_a}\sum_i \|\mathbf r_i(t) - \mathbf r_i'\|^2} \\
\text{RMSF}_i\equiv&\sqrt{\left<\|\mathbf r_i(t) - \left< \mathbf r_i\right> \|^2 \right>} \\
=&tr\left<\mathbf r_i(t)\otimes\mathbf r_i(t)\right> - tr\left<\mathbf r_i\right>\otimes\left<\mathbf r_i\right>
\end{align}$$

where $$N_a$$ is the number of atoms of interest, $$\mathbf r_i$$ is the location of the $$i$$'th atom, $$tr$$ is trace operation, $$\otimes$$ is the outer product,
and $$\left<\cdot\right>$$ denotes temporal average.
In the case of discrete time dynamics, e.g., MD simulation,

$$\left<f(t)\right>\equiv \frac{1}{N_t}\sum_k f(t_k) $$

where $$N_t$$ is the number of time points.


The RMSF trace operation


However these two quantities are almost never calculated without protein backbone alignment.
