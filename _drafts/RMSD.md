---
layout: post
title: RMSD and RMSF
date:   2017-04-29 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [RMSD, RMSF]
---

[RMSD (root mean square deviation)](https://en.wikipedia.org/wiki/Root-mean-square_deviation) and [RMSF (root mean square fluctuation)](https://en.wikipedia.org/wiki/Root-mean-square_deviation_of_atomic_positions) are commonly used to measure the spatial variations of biomolecules in a molecular dynamics (MD) simulation.
Their definitions are given by 

$$\begin{align}
\text{RMSD}(t) \equiv& \sqrt{\frac{1}{N_a}\sum_i \|\mathbf r_i(t) - \mathbf r_i'\|^2} \\
\text{RMSF}_i\equiv&\sqrt{\left<\|\mathbf r_i(t) - \left< \mathbf r_i\right> \|^2 \right>} \\
=&\sqrt{tr\left<\mathbf r_i(t)\otimes\mathbf r_i(t)\right> - tr\left<\mathbf r_i\right>\otimes\left<\mathbf r_i\right> }
\end{align}$$

where $$N_a$$ is the number of atoms of interest, $$\mathbf r_i$$ is the location of the $$i$$'th atom, $$\mathbf r_i'$$ is its reference location,
$$tr$$ is trace operation, $$\otimes$$ is the outer product,
and $$\left<\cdot\right>$$ denotes temporal average.
In the case of discrete time dynamics, e.g., MD simulation,

$$\left<f(t)\right>\equiv \frac{1}{N_t}\sum_k f(t_k) $$

where $$N_t$$ is the number of time points.
The second definition of RMSF is useful in some occasions. 

However global translations and rotations are usually not of interest.
Coordinates alignment is thus needed before RMSD and RMSF calculations.
For example, aligning the protein backbone before calculating side chain RMSD and RMSF.

This alignment is naturally formulated as a minimization problem 

$$ \min f(R, \mathbf t) \equiv \sum_{i=1}^{N_a} w_i\|(R\mathbf r_i + \mathbf t) - \mathbf r_i'\|^2 $$

where $$w_i$$ is a weighting factor (for example, mass or charge), $$R$$ and $$t$$ are the rotation matrix and translation vector to be determined.
The unweighted version is commonly known as [Kabsch algorithm](https://en.wikipedia.org/wiki/Kabsch_algorithm).

To get $$R$$ and $$\mathbf t$$, we solve the two stationary conditions

$$\begin{align} \frac{\partial{f}}{\partial\mathbf t} =& 0 \\
\frac{\partial{f}}{\partial R} =& 0 \end{align}$$ 

The following vector equality  will be handy 

$$\nabla_A tr AB = B^T $$

The first condition gives rise to 

$$\mathbf t = \frac{\sum_i w_i \mathbf r_i'}{\sum_i w_i} - R\frac{\sum_i w_i \mathbf r_i}{\sum_i w_i}\equiv \overline{\mathbf r}' - R\overline{\mathbf r}$$

Plugging into $$f(R, \mathbf t)$$, we get 

$$ f(R) = \sum_i w_i \|R(\mathbf r_i - \overline{\mathbf r}) - (\mathbf r_i' -\overline{\mathbf r}')\|^2$$
