---
layout: post
title: Quantum Fourier transform
date:   2018-01-31 03:43:08 -0500
categories: [quantum information and computation]
comments: true
tags: [QFT]
---

[Quantum Fourier transform](https://en.wikipedia.org/wiki/Quantum_Fourier_transform) is a key concept in quantum computing and quantum algorithm.
For example, it is the essential ingredient of [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) for factoring and the [quantum phase estimation algorithm]() for solving eigenvalues and eigenvectors of unitary matrices.

In this post, I will explain how it works and why it is useful.

It is closely related to [discrete Fourier transform (DFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform),
an essential tool in digital signal processing.

## discrete Fourier transform (DFT)

DFT is a linear map between a finite sequence of complex numbers to another sequence of complex numbers.
It is nondegenerate thus an inverse discrete Fourier transform (IDFT) exists.
The transformation is so special that it can be computed efficiently $$O(N\log N)$$,
instead of $$O(N^2)$$, using the famous [fast Fourier transform (FFT) algorithm](https://en.wikipedia.org/wiki/Fast_Fourier_transform).

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

The DFT transformation can be also seen directly in an explicit matrix form.
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

In general, the DFT matrix looks like

$$
DFT_N = \frac{1}{\sqrt N}\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & \omega_N & \omega_N^2 & \cdots & \omega_N^{N-1} \\
1 & \omega_N^2 & \omega_N^4 & \cdots & \omega_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \cdots & \vdots \\
1 & \omega_N^{N-1} & \omega_N^{2(N-1)} & \cdots \omega_N^{(N-1)(N-1)}
\end{bmatrix}$$

As for why DFT is useful, 

* In signal processing, often times the signals are band-limited. Then the Fourier spectrum provides a more succinct representation of the signals.
* For physics problem, often times the symmetry in the problem can be more easily utilized in the Fourier domain.

[Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem)


There are many subtleties 
and textbook of Signals and Systems

<a target="_blank"  href="https://www.amazon.com/gp/product/0138147574/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0138147574&linkCode=as2&tag=nosarthur2016-20&linkId=e129946e8d88aa21c0078670b39abce5"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0138147574&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0138147574" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## quantum Fourier transform (QFT)


$$N = 2^n$$

$$O(n^2)$$

constructive interference
