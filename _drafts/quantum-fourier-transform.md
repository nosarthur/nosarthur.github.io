---
layout: post
title: Quantum Fourier transform
date:   2018-02-17 08:00:00 -0500
categories: [quantum information and computation]
comments: true
tags: [QFT]
---

[Quantum Fourier transform (QFT)](https://en.wikipedia.org/wiki/Quantum_Fourier_transform) is a key concept in quantum algorithm design.
For example, it is the essential ingredient of [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) for factoring and the [quantum phase estimation algorithm](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm) for solving eigenvalues and eigenvectors. In this post, I will explain how it works.

QFT is closely related to [discrete Fourier transform (DFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform),
a tool of essential importance in [digital signal processing](https://en.wikipedia.org/wiki/Digital_signal_processing).
And we will start from there.

## discrete Fourier transform (DFT)

As the name indicates, DFT is the discrete version of [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform). It is

* a linear map between two sequences of complex numbers;
* nondegenerate thus an inverse discrete Fourier transform (IDFT) exists;
* so special that its action (and inverse action) can be computed efficiently with complexity $$O(N\log N)$$, instead of $$O(N^2)$$, using the famous [fast Fourier transform (FFT) algorithm](https://en.wikipedia.org/wiki/Fast_Fourier_transform).

The third bullet point is the reason why it is so widely used.

In 1D, DFT can be defined as

$$ X_k = \frac{1}{\sqrt{N}} \sum_{j=0}^{N-1} x_j \omega_N ^{-jk} $$

where $$\omega_N\equiv\exp(2\pi i/N)$$ is the $$N$$'th root of unity and $$i=\sqrt{-1}$$.
And the IDFT is given by

$$ x_j = \frac{1}{\sqrt N} \sum_{j=0}^{N-1} X_k \omega_N ^{jk} $$

Generalization to higher dimensions is straightforward.

Different authors may use different normalization conventions for DFT and IDFT.
I have the impression that physicists and engineers prefer to have $$1$$ in DFT and $$1/N$$ in IDFT,
whereas mathematicians prefer this $$1/\sqrt{N}$$ normalization.
For QFT, $$1/\sqrt{N}$$ is preferred as it normalizes the wave functions correctly.

There is also arbitrariness in the range of the summation index $$j$$:
any $$N$$ consecutive integers will do.
Sometimes it is more convenient to include both positive and negative values.
To complicate things even more, some authors swap the definitions of DFT and IDFT.
Thus one needs to be very cautious when applying other people's formulas.

The DFT transformation has explicit matrix form. For example,

$$DFT_2 = \frac{1}{\sqrt 2}\begin{bmatrix}
1 & 1 \\
1 & -1 
\end{bmatrix},\quad DFT_4 = \frac{1}{2}\begin{bmatrix}
1 & 1 & 1 & 1\\
1 & -i & -1 & i\\
1 & -1 & 1 & -1\\
1 & i & -1 & -i
\end{bmatrix}
$$

In general, the DFT matrix looks like

$$
DFT_N = \frac{1}{\sqrt N}\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & \omega_N^{-1} & \omega_N^{-2} & \cdots & \omega_N^{-(N-1)} \\
1 & \omega_N^{-2} & \omega_N^{-4} & \cdots & \omega_N^{-2(N-1)} \\
\vdots & \vdots & \vdots & \cdots & \vdots \\
1 & \omega_N^{-(N-1)} & \omega_N^{-2(N-1)} & \cdots & \omega_N^{-(N-1)(N-1)}
\end{bmatrix}$$

You can easily check that the rows are all perpendicular to each other (remember to take complex conjugate).
Thus each component of the DFT output, i.e., $$X_k$$, is a projection of the input to one of a set of orthogonal directions.
If you visualize the $$\omega_N^j$$ in the complex plane, then each row can be seen as a rotating unit vector with different angular velocity.
And the action of each row is to extract the component of a specific angular velocity.

As a physicist by training, I tend to think in [Dirac bra-ket notation](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation), i.e.,
the original data point is $$x_j = \left<x=j|\Psi\right>$$,
the frequency domain point is $$X_j = \left<k=j|\Psi\right>$$, and

$$ DFT_N = \sum_{k=0}^{N-1} \left|k\right>\left<k\right| $$

which reveals the component-wise projections explicitly.

As for why DFT is useful,

* It is convenient to calculate [convolution](https://en.wikipedia.org/wiki/Convolution).
* In signal processing, often times the signals are band-limited. Then the Fourier spectrum provides a more succinct representation of the signals.
* For physics problem, often times the symmetry in the problem can be more easily utilized in the Fourier domain.
* many other reasons

There are a lot of subtleties related to DFT, especially when one want to convert [analog signals](https://en.wikipedia.org/wiki/Analog_signal) to digital signals.
For example, given a continuous function (analog signal), should I do Fourier transform first, then sample points on the frequency domain function?
Or should I sample the continuous function first, and then do DFT on the time domain samples?
My favorite theorem along these lines is [Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem), which answers the following questions:

* Does a continuous function have infinite degrees of freedom since there are infinite input values (like in classical field theory)? This is plausible but is also complicated by the continuity requirement.
* If a function is band-limited, does it still have infinite degrees of freedom?

To learn more about DFT, check out this textbook on Signals and Systems by [Prof. Alan Oppenheim](https://en.wikipedia.org/wiki/Alan_V._Oppenheim) (age 81 this year)

<a target="_blank"  href="https://www.amazon.com/gp/product/0138147574/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0138147574&linkCode=as2&tag=nosarthur2016-20&linkId=e129946e8d88aa21c0078670b39abce5"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0138147574&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0138147574" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## quantum Fourier transform (QFT)


$$N = 2^n$$

$$O(n^2)$$

constructive interference





[control-NOT (CNOT) gate](https://en.wikipedia.org/wiki/Controlled_NOT_gate)

$$CNOT= \begin{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 0 & 1\\
0& 0 & 1 & 0
\end{bmatrix}$$

$$ CNOT\left|x\right>\left|y\right> = \left|x\right>\left|y\oplus x\right>$$

## quantum phase estimation algorithm

As one application of QFT, let's look at [quantum phase estimation algorithm (PEA)](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm), a quantum algorithm to calculate eigenvalues and eigenvectors of unitary matrices.

## reference
* [R. Cleve, et al, Quantum algorithms revisited, Proc. Roy. Soc. Lond. 454, 339 (1998)](https://arxiv.org/pdf/quant-ph/9708016.pdf)
* [A. Yu. Kitaev, Quantum measurements and the Abelian Stabilizer Problem, (1995)](https://arxiv.org/abs/quant-ph/9511026)
