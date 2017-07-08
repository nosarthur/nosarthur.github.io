---
layout: post
title: Maximum likelihood and maximum a posteriori methods
date:   2017-08-01 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [estimation]
---

## introduction

I worked on medical imaging for several years (specifically, a subfield of magnetic resonance imaging called [quantitative susceptibility mapping](https://en.wikipedia.org/wiki/Quantitative_susceptibility_mapping) which aims to calculate magnetic susceptibility, see [this post]({% post_url 2014-05-06-qsm %}) for more details)
In this post I am going to give an introduction to two major methods in that field:
maximum likelihood (ML) and maximum a posteriori (MAP) methods.

Often times, medical imaging problems have the same setup as the [deblurring](https://en.wikipedia.org/wiki/Deblurring)
or [denoising](https://en.wikipedia.org/wiki/Noise_reduction) problems in computer vision. One measurement of the system can be
described by the following equation

$$PX= y$$

where $$X$$ is the desired 2D or 3D image, $$P$$ corresponds to the data collecting process, and $$y$$ is the measurement result. 
Usually $$P$$ is some kind of 'projection' that loses information. For example, it could be a 2D projection of a 3D object,
an average filter that causes blurring, etc. Conceptually, one can think of $$X$$ as a column vector (say $$N\times 1$$)
corresponding to the flattened image, $$y$$ as a column vector (say $$M\times 1$$ with $$M\le N$$), and $$P$$ as a fat matrix.
In practice, one may not be able to write $$P$$ explicitly. For example, a 3D image with size 256x256x256 has over 16 million
values, thus a square matrix acting on $$X$$ would have $$2.8\times10^{14}$$ entries, making it impractical to be stored in memory.
For the purpose of calculation, writing out $$P$$ explicitly is not necessary. Only writing out the action of $$P$$, i.e., $$PX$$, is needed.

Since $$P$$ is rank-deficient, $$X$$ cannot be solved (the same reason that $$x_1+x_2 = 3$$ cannot be solved).
These problems are known as **ill-posed [inverse problems](https://en.wikipedia.org/wiki/Inverse_problem)**.
One obvious way to solve for $$X$$ is to take multiple measurements and stack the $$P$$ matrices and $$y$$ vectors 
in the hope that we get full-rank or  over-determined system of 

$$AX = b, \text{ where } A=\begin{bmatrix}P_1\\ P_2\\ \vdots\end{bmatrix}, b = \begin{bmatrix}y_1\\ y_2\\ \vdots \end{bmatrix}$$

Then the solution is simply given by the [Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore–Penrose_pseudoinverse)

$$ X = (A^\dagger A)^{-1} A^\dagger b$$

where $$A^\dagger$$ is the [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose) of $$A$$.

Image reconstruction of conventional [CT](https://en.wikipedia.org/wiki/CT_scan), [MRI](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging), 
and [super resolution imaging](https://en.wikipedia.org/wiki/Super-resolution_imaging) all follow this paradigm.
To do a little better, one can further take the noise property into
consideration, which is commonly known as the [maximum likelihood method](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation).
Typically, the noise information can be incorporated into a weighting matrix in the Penrose pseudoinverse.
More details are included in the next section. 

The downside of ML is that the linear system has to be full rank or over determined, which amounts to many measurements, possibly too expensive or even impossible to perform.
The maximum a posteriori (MAP) method solves this dilemma by supplementing extra information.
Typically, one can formulate it as a minimization problem.
For example $$x_1+x_2 = 3$$ can be solved as follows

$$ \text{argmin}_{x_1, x_2} \|x_1+x_2-3\|^2 + \lambda \|x_1\|^2 $$

where the first term is data term, the second term is regularization term, and $$\lambda$$ is the so-called regularization parameter which is to be chosen.
Here the regularization term tries to convey our prior information that $$x_1$$ is small. 

Depending on the problem, the form of the regularization term could vary a lot. The determination of $$\lambda$$ is also a little bit arbitrary.
In practice, MAP usually works very well. Tuning the regularization term and regularization parameters could be a bit like an art.


## maximum likelihood (ML)

$$ y = ax + \epsilon $$

where $$\epsilon$$ is assumed to be a Gaussian variable with zero mean and standard deviation $$\sigma$$. 
To simplify the notation, let's denote it as

$$\epsilon \sim G(0, \sigma)$$



## maximum a posteriori (MAP)

## more recent development 

* [compressive sensing](https://en.wikipedia.org/wiki/Compressed_sensing)
* [dictionary learning](https://en.wikipedia.org/wiki/Sparse_dictionary_learning)
