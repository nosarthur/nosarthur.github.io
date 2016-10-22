---
layout: post
title: Schur's lemma and white matter tracks
date:   2016-08-15 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [group theory, ensemble average]
---

While in graduate school, I was quite fascinated by the various counting
and book-keeping techniques in graph theory and group theory.
One nice example is [Burnside's lemma](https://en.wikipedia.org/wiki/Burnside%27s_lemma), which helps to count the number of different necklaces that can be made out of say 5 black stones and 4 white stones.
I will write a separate post for it when I get some free time.

On the other hand, there are many theorems and techniques that I don't have much feelings for, mostly because I don't see the applications. 
One prominent example is [Schur's lemma](https://en.wikipedia.org/wiki/Schur%27s_lemma), 
which states that 

***given an irreducible matrix representation of a group, if a matrix commutes with all group members, then it is basically the identity.*** 

The lemma is quite intuitive by itself.
At the time, I actually wondered why people bothered to write it down and even name it.

Many years later, my colleague at medical school needed to evaluate some 
expressions for her [NeuroImage paper][1] (in case you do not know,
NeuroImage is a not-so-technical journal that publishes pretty 
brain images and bar plots from statistical analysis).
To my surprise, her problem was in a perfect set-up for Schur's lemma and
the result was even not too trivial (we didn't end up with identity).

In this post, I will demonstrate this application. 

## simple examples

First let me show you some concrete examples to get some sense of Schur's lemma.

#### example 1

The [symmetric group](https://en.wikipedia.org/wiki/Symmetric_group) $$S_2$$ has the following matrix representation

$$ I = \begin{bmatrix} 1 & 0 \\ 0 & 1\end{bmatrix},\quad p =\begin{bmatrix}
0 & 1 \\ 1 & 0\end{bmatrix} $$

You may want to convince yourself that the only 2-by-2 matrix commuting 
with both of them is a scalar times $$I$$.
This is the scenario where Schur's lemma applies.

#### example 2

Note that the matrix representation needs to be irreducible in order to 
apply Schur's lemma. 
Suppose we have the following 4-element group

$$ I=\begin{bmatrix} 1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{bmatrix}, \quad
p_1=\begin{bmatrix}0&1&0&0\\1&0&0&0\\0&0&1&0\\0&0&0&1\end{bmatrix}, \quad
p_2=\begin{bmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{bmatrix}, \quad
p_3=\begin{bmatrix}0&1&0&0\\1&0&0&0\\0&0&0&1\\0&0&1&0\end{bmatrix}. $$ 

This is not an [irreducible representation](https://en.wikipedia.org/wiki/Irreducible_representation) due to its block-diagonal structure.
As a result, the matrices that commutes with all four group members
are not all proportional to the identity matrix.
For example, the one below also commutes with all four elements.

$$ \begin{bmatrix} 1&0&0&0\\0&1&0&0\\0&0&2&0\\0&0&0&2\end{bmatrix} $$ 


## application in averaging tensors

### the goal
In our [NeuroImage paper][1], we would like to evaluate two ensemble averages
of the susceptibility tensor $$\chi$$ over all possible rotations

$$\begin{align}
\left<\chi \right>_1 &=  \sum_i R_i \chi R_i^{-1} \\
\left<\chi \right>_2 &= \sum_i Q_i \chi Q_i^{-1}.
\end{align}$$

Here $$R_i$$ and $$Q_i$$ denote three dimensional rotations and the summation runs over all possible rotations of the
corresponding types. 
I write the averaging as discrete summation for notational simplicity: 
rotations form Lie groups and should be parametrized by continuous variables.

The rotations $$Q_i$$'s have the special property that they
rotate the z component of any vector into the x-y plane and thus can be conveniently parametrized with three
[Euler angles](https://en.wikipedia.org/wiki/Euler_angles)
$$(\theta_1, \theta_2=\pi/2, \theta_3)$$ in the ZXZ convention. More explicitly, we have 

\begin{align}
Q_i = R_z(\theta_1) R_x(\pi/2) R_z(\theta_3).
\end{align}

### the physical motivation

The summation over rotations $$R_i$$ and $$Q_i$$ may appear a bit abrupt to you. 

What happens is that we know the magnetic susceptibility tensor (a 3-by-3 
matrix) for each molecule and we want to know the averaged tensor for an ensemble 
of the molecules.

For $$\left<\chi\right>_1$$, we assume the molecules are randomly oriented,
i.e., each one of them is pointing to a random direction and is then
parametrized as $$R_i\chi R_i^{-1}$$.

For $$\left<\chi\right>_2$$, we assume the molecules are organized in a 
special way. They firstly form rings in two dimension, then the rings form cylinders. This model is motivated by the myelin sheath in white matter tracks.  

More background 
information of the project can be found in our [NeuroImage paper][1].

### the evaluations

To evaluate the first summation, we note that $$\left<\chi\right>_1$$ commutes with any rotation $$R_i$$ in [SO(3)](https://en.wikipedia.org/wiki/Rotation_group_SO(3)). 
According to Schur's lemma, $$\left<\chi\right>_1$$ is proportional to identity matrix. 
Also note rotations preserve [matrix trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)), thus we have 

$$\begin{align}
\left<\chi\right>_1  = \frac{\chi_{11} + \chi_{22} + \chi_{33}}{3} \ I,
\end{align}$$

where $$I$$ is the identity matrix.

The second summation can be done similarly. 
Note the representation is not irreducible in this case. 
To be more explicit,

$$\begin{align}
\left<\chi\right>_2  = &\sum_{\theta_1,\theta_3} R_z(\theta_1) R_x(\pi/2) R_z(\theta_3) \chi 
                            R_z^{-1}(\theta_3) R_x^{-1}(\pi/2) R_z^{-1} (\theta_1) \\
                     = & \sum_{\theta_1} R_z(\theta_1) R_x(\pi/2) \begin{bmatrix}
                            \frac{\chi_{11}+\chi_{22}}{2} & 0 & 0 \\
                            0 & \frac{\chi_{11}+\chi_{22}}{2} & 0  \\
                            0 & 0 & \chi_{33} \end{bmatrix} R_x^{-1}(\pi/2) R_z^{-1} (\theta_1) \\
                    =& \sum_{\theta_1}R_z(\theta_1) \begin{bmatrix}
                            \frac{\chi_{11}+\chi_{22}}{2} & 0 & 0 \\
                            0  & \chi_{33} & 0\\
                            0  & 0 & \frac{\chi_{11}+\chi_{22}}{2}  \end{bmatrix}  R_z^{-1} (\theta_1) \\
            =& \begin{bmatrix}
                            \frac{\chi_{11}+\chi_{22}}{4}+ \frac{\chi_{33}}{2}  & 0 & 0 \\
                            0  & \frac{\chi_{11}+\chi_{22}}{4}+ \frac{\chi_{33}}{2} & 0\\
                            0  & 0 & \frac{\chi_{11}+\chi_{22}}{2}  \end{bmatrix} 
\end{align}$$

## final thoughts

> You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.  --- Steve Jobs

It is nice that some random stuff from the past, especially one that I considered to be somewhat trivial and useless, can actually be put in use in a totally unexpected way. I am looking forward to seeing how my other random dots are going to connect in the future.

## references
* C. Wisnieff, T. Liu, P. Spincemaille, S. Wang, D. Zhou, and Y. Wang, 
[Magnetic susceptibility anisotropy: Cylindrical symmetry from macroscopically ordered anisotropic molecules and accuracy of MRI measurements using
few orientations][1], NeuroImage 70, 363 (2013).
* M. Hamermesh, Group theory and its application to physical problems, Dover Publications (1962)
<a href="https://www.amazon.com/gp/product/0486661814/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0486661814&linkCode=as2&tag=nosarthur2016-20&linkId=596b2c0b9c62e22946e635d01a3cd4fe" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0486661814&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0486661814" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<br> I am unable to read math books that only show theorems and proofs.  As a physicist, I would rather see the intuition and motivation rather than mathematical rigor. This group theory book is very readable and even enjoyable for me. 

[1]: http://www.ncbi.nlm.nih.gov/pubmed/23296181
