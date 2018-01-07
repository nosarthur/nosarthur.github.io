---
layout: post
title: Quantum Fourier transform
date:   2018-01-31 03:43:08 -0500
categories: [quantum information and computation]
comments: true
tags: [QFT]
---

[Quantum Fourier transform]( ) is a key concept in quantum computing and quantum algorithm.
For example, it is the essential ingredient of [Shor's algorithm] for factoring and the quantum phase estimation.

In this post, I will explain how it works and why it is useful.

It is closely related to discrete Fourier transform (DFT),
an essential tool in digital signal processing.

## discrete Fourier transform (DFT)

DFT is a linear map between a finite sequence of complex numbers to another sequence of complex numbers.
It is nondegenerate thus an inverse discrete Fourier transform (IDFT) exists.
The transformation is so special that it can be computed efficiently $$O(N\log N)$$,
instead of $$O(N^2)$$, using the famous fast Fourier transform (FFT) algorithm.

In 1D, DFT is defined from

$$ X_k = \frac{1}{\sqrt{N}} \sum_{j=0}{N-1} x_j \omega_N ^{-jk} $$

where $$\omega_N\equiv exp(2\pi i/N)$$ is the $$N$$'th root of unity.
And the IDFT is given by

$$ x_j = \frac{1}{\sqrt N} \sum_{j=0}{N-1} X_k \omega_N ^{jk} $$

Different authors may use different normalization conventions for DFT and IDFT.
Thus one needs to be cautious applying formulas.
I have the impression that physicists and engineers prefer to have $$1$$ in the DFT and $$1/N$$ for IDFT,
and mathematicians prefer this $$1/\sqrt{N}$$ normalization.
For the later development of QFT, $$1/\sqrt{N}$$ is preferred because it will normalize the wavefunctions correctly.

For example, 

$$DFT_2 = \frac{1}{\sqrt 2}\begin{bmatrix}
1 & 1 \\
1 & -1 
\end{bmatrix}, DFT_4 = \frac{1}{2}\begin{bmatrix}
1 & 1 & 1 & 1\\
1 & i & -1 & -i\\
1 & -1 & 1 & -1\\
1 & -i & -1 & i
\end{bmatrix}
$$

As for why DFT is useful, 

* In signal processing, often times the signals are band-limited. Then the Fourier spectrum provides a more succinct representation of the signals.
* For physics problem, often times the symmetry in the problem can be more easily utilized in the Fourier domain.

Shannon sampling theorem


There are many subtleties 
and textbook of Signals and Systems

## quantum Fourier transform (QFT)


$$N = 2^n$$

$$O(n^2)$$

constructive interference
