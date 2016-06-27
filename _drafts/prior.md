---
layout: post
title: Prior-conditioning
date:   2016-06-22 13:43:08 -0500
categories: [math]
comments: true
tags: [rank deficient system]
---

## introduction

[Pre-conditioning](https://en.wikipedia.org/wiki/pre-conditioner) is a common trick to solve linear systems of equations $$Ax=b$$ for iterative solvers.
Typically, a simple-to-compute and non-singular matrix $$P$$ is 
chosen to change the system matrix into 

$$APy=b$$

where $$y = P^{-1}x$$ is the new unknown, or

$$PAx = Pb.$$

The goal here is to reduce the condition number of $$A$$ such that
the iterative method converges faster.
One also implicitly assumes that $$A$$ is full rank such that the 
solution is unique. In this case pre-conditioning will not affect
the solution.

In this post, I would like to discuss the situation when $$A$$ is
rank-deficient. The iterative solver I picked is [conjugate gradient](https://en.wikipedia.org/wiki/Conjugate_gradient_method) (CG) and 
model system is 

$$A = [1, 1], \quad b=1 \\
P=\begin{bmatrix}1&0\\0&\alpha\end{bmatrix}.$$

Obviously, this system does not have a unique solution. But does 
CG know that?

## observations

Using the following python code, we ended up with the solution 

$$\tilde x = [0.5, 0.5]^T$$

``` python
import scipy.sparse.linalg as linalg
import numpy as np

A = np.array([[1,1],[1,1]])
b = np.array([1,1])
x = linalg.cg(A,b)
```

Here I augmented the $$A$$ matrix to $$2\times2$$ so that scipy does 
not complain that $$A$$ is not square matrix. 
This augmentation can be viewed either as copying the 
row of $$A$$ as a new row or solving the normal equation

$$A^TA x = A^T b.$$

Interestingly, this solution is the [matrix pseudo-inverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_pseudoinverse) 
for matrix with linearly independent rows, i.e., 

$$\tilde x = A^T(AA^T)^{-1} b.$$

This formula can be derived from the minimization problem 

$$ \min_x\|x\|^2\quad s.t. Ax=b$$

The derivation is included at the end of this post. In other words,
it is the minimal norm solution for the under-determined system.

With the pre-conditioner $$P$$, the normal equation becomes

$$\begin{bmatrix}1&\alpha\\\alpha&\alpha^2\end{bmatrix}x=\begin{bmatrix}1\\\alpha\end{bmatrix}.$$

And again the CG result matches with the minimum norm solution

$$\tilde x = \frac{1}{1+\alpha^2}\begin{bmatrix}1\\\alpha^2\end{bmatrix}.$$

It seems to hold for randomly generated $$A$$ as well.
You can check it out with the following code.

```python
A = np.random.rand(3,4)
b = np.random.rand(3,1)
x = linalg.cg(np.dot(A.T,A), np.dot(A.T,b))
print x 
print np.dot(A.T, np.dot(np.linalg.inv(np.dot(A,A.T)),b))
```

## caveats

It seems we have a nice result that CG converges to minimum norm 
solution. However, there are two caveats to this observation

* The initial condition is set to 0.
* The normal equation is used.

With other initial conditions, the solutions vary. 
Also, if I copy rows of $$A$$ to itself to make it square, 
CG does not converge to minimum norm solution.

## summary

So far we have numerically demonstrated that CG converges to the 
minimum norm solution for a rank-deficient system, given 0 initial
condition and normal equation are used. 

The more interesting observation is that the solution depends on the
pre-conditioner $$P$$. In some sense, it provides a systematic way to
'manipulate' the answer.
In the literature, it seems to have the name 'prior-conditioning', 
which refers to confining the structure of $$x$$ with $$P$$
using some prior information.

In our simple example, the pre-conditioner $$P$$ rescales the 
components of $$x$$. It may be motivated by arguing that $$x_2$$
is expected to be greater than $$x_1$$ thus a pre-conditioner $$P$$ 
with $$\alpha>1$$ makes the unknowns more 'equal'.
Looking at the minimum norm solution, it seems to do the trick, i.e.,
causing $$x_2>x_1$$.

In practice, the system may be so big that it is not possible to 
explicitly check whether $$A$$ is rank-deficient or even express
$$A$$. Then one needs to be cautious about the stop condition, 
initial condition, and the pre-conditioner.

## appendix

### derivation of the pseudo-inverse

The Lagrangian is defined as 

$$\mathcal L = x^Tx + \lambda^T(Ax-b)$$ 

where the vector $$\lambda$$ is the Lagrangian multiplier.

The stationary condition gives rise to

$$\frac{\partial \mathcal L}{\partial x}=0\rightarrow x=\frac{A^T\lambda}{2}.$$

Plugging into the linear equation $$Ax=b$$, we get 

$$\lambda = 2(AA^T)^{-1}b$$

Thus the pseudo-inverse is 

$$ x = A^T(AA^T)^{-1}b.$$
