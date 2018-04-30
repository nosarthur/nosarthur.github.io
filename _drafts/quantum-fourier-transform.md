---
layout: post
title: Quantum Fourier transform
date:   2018-04-02 08:00:00 -0500
categories: [quantum information and computation]
comments: true
tags: [quantum computing, phase estimation algorithm (PEA)]
---

[Quantum Fourier transform (QFT)](https://en.wikipedia.org/wiki/Quantum_Fourier_transform) is a key concept in quantum algorithm design.
For example, it is a major ingredient of [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm) for factoring integers and
the [quantum phase estimation algorithm (PEA)](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm) for solving eigenvalues and eigenvectors. In this post, I will explain how it works.

If you prefer to learn QFT without equations, see this blog post by [Scott Aaronson](https://en.wikipedia.org/wiki/Scott_Aaronson): [Shor, I'll do it](https://www.scottaaronson.com/blog/?p=208)

## discrete Fourier transform (DFT)

QFT is closely related to [discrete Fourier transform (DFT)](https://en.wikipedia.org/wiki/Discrete_Fourier_transform),
an important tool in [digital signal processing](https://en.wikipedia.org/wiki/Digital_signal_processing).
And we will start from there.

As the name indicates, DFT is the discrete version of [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform).
Most commonly, the input sequence is time series data or spatial samples,
and the output sequence is frequency data, i.e., the Fourier spectrum.
Overall, it is

* a linear map between two sequences of complex numbers;
* a non-degenerate map with an inverse, i.e., the inverse discrete Fourier transform (IDFT);
* a map that's cheap to compute: the [fast Fourier transform (FFT) algorithm](https://en.wikipedia.org/wiki/Fast_Fourier_transform) has computational complexity $$O(N\log N)$$ (instead of $$O(N^2)$$ for a general linear map)

In practice, DFT is widely used because

* In signal processing, often times the signals are band-limited. Then the Fourier spectrum provides a more succinct representation of the signals;
* In physics problem, often times the symmetry can be more easily utilized in the Fourier domain;
* It is useful for [convolution](https://en.wikipedia.org/wiki/Convolution) calculations;
* It is efficient to calculate;
* ...

In 1D, DFT can be defined as

$$ X_k = \frac{1}{\sqrt{N}} \sum_{j=0}^{N-1} \omega_N ^{-jk} x_j $$

where $$\omega_N\equiv\exp(2\pi i/N)$$ is the $$N$$'th root of unity and $$i=\sqrt{-1}$$.
And the IDFT is given by

$$ x_j = \frac{1}{\sqrt N} \sum_{j=0}^{N-1} \omega_N ^{jk} X_k $$

Generalization to higher dimensions is straightforward.

Different authors use different normalization conventions for DFT and IDFT.
I have the impression that physicists and engineers prefer to have $$1$$ in DFT and $$1/N$$ in IDFT,
whereas mathematicians prefer this $$1/\sqrt{N}$$ normalization.
For QFT, $$1/\sqrt{N}$$ is better as it normalizes the wave functions correctly.

There is also arbitrariness in the range of the summation index $$j$$:
any $$N$$ consecutive integers will do.
Sometimes it is more convenient to include both positive and negative values.
To complicate things even more, some authors swap the definitions of DFT and IDFT.
Thus one needs to be very cautious with other people's formulas.

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

In the [Dirac bra-ket notation](https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation),
the DFT transformation has the form

$$ DFT_N = \sum_{j,k=0}^{N-1} \omega_N^{-jk} \left|k\right>\left<j\right| $$


There are a lot of subtleties in DFT, especially when one converts [analog signals](https://en.wikipedia.org/wiki/Analog_signal) to digital signals.
For example, given a continuous function (analog signal),
should I do Fourier transform first, then sample the frequency domain function?
Or sample the continuous function first, and then do DFT on the time domain samples?
My favorite theorem along these lines is the [Shannon sampling theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem), which answers the following questions:

* Does a continuous function have infinite degrees of freedom since there are infinite input values (like in classical field theory)? This is plausible but is also complicated by the continuity requirement.
* If a function is band-limited, does it still have infinite degrees of freedom?

To learn more about DFT, check out this nice textbook on Signals and Systems by [Prof. Alan Oppenheim](https://en.wikipedia.org/wiki/Alan_V._Oppenheim) (age 81 this year).

<a target="_blank"  href="https://www.amazon.com/gp/product/0138147574/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0138147574&linkCode=as2&tag=nosarthur2016-20&linkId=e129946e8d88aa21c0078670b39abce5"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0138147574&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0138147574" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## measurement/readout problem

Suppose we do not have any prior information about a quantum state, it is impossible to know what it is.
Take 1-qubit for example, an arbitrary state takes the form

$$\left|\psi\right> = \alpha\left|0\right> + \beta\left|1\right>,$$

where $$\|\alpha\|^2 + \|\beta\|^2=1$$.

A measurement with respect to the computational basis (0 and 1) causes [its wave-function to collapse](https://en.wikipedia.org/wiki/Wave_function_collapse).
Thus if we only have one copy of the quantum state,
no information of the probability amplitudes $$\alpha$$ or $$\beta$$ can be retrieved.
The situation is slightly better if we have many copies of the same state.
In that case, $$\alpha$$ and $$\beta$$ can be estimated at the cost of repeated measurements.
This task is known as [quantum state tomography](https://en.wikipedia.org/wiki/Quantum_tomography) and is not easy in general.
In the 1-qubit case, there are 3 observables to be estimated: the 3 [Pauli spin operators](https://en.wikipedia.org/wiki/Pauli_matrices).
For $$n$$ qubits, there are $$2^{2n} - 1$$ observables (the number of generators of $$SU(2^n)$$),
a daunting task.

Thus to have an efficient readout of any quantum computation result,
we need to have prior information of the output state.
In other words, **an efficient quantum algorithm has to encode its answer in special quantum states**.
For example, an algorithm with boolean answer could ensure the output to be one of two known states.
This is indeed the strategy of many quantum algorithms, such as
[Deutsch Jozsa algorithm](https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm),
[Simon's algorithm](https://en.wikipedia.org/wiki/Simon%27s_problem),
[Bernstein-Vazirani algorithm](https://dl.acm.org/citation.cfm?id=167097),
and [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

Since measurement has to be in the computational basis,
these known states can be seen as intermediate results.
Obviously, it's more convenient to have these states to form an orthonormal bases.
It helps even more if these states are all separable states (i.e., not entangled states).
Then the transformation to the computational basis states can be done independently,
potentially in parallel.
From the hardware perspective,
single qubit gates are usually much easier to implement and faster than multi-qubit gates.

As a concrete example, let's assume a boolean answer is encoded in the two 1-qubit states

$$\begin{align}
\left|+\right> \equiv& \frac{1}{\sqrt 2}(\left|0\right> + \left|1\right>) = \frac{1}{\sqrt 2}\begin{bmatrix}1\\
1\end{bmatrix} \\
\left|-\right> \equiv& \frac{1}{\sqrt 2}(\left|0\right> - \left|1\right>) = \frac{1}{\sqrt 2}\begin{bmatrix}1\\
-1\end{bmatrix}
\end{align}$$

In this case, applying [Hadamard gate $$H_1$$](https://en.wikipedia.org/wiki/Hadamard_transform) before measurement helps
to get a definite answer with one copy of the quantum state since

$$\begin{align}
H_1 \left|+\right> =& \left|0\right>\\
H_1 \left|-\right> =& \left|1\right>\end{align}$$

where 

$$H_1 = \frac{1}{\sqrt 2}\begin{bmatrix}
1& 1 \\
1& -1
\end{bmatrix}.$$

As you may have guessed,
QFT is a gate whose role is similar to $$H_1$$ in this example.

## quantum Fourier transform (QFT)

In fact, QFT is exactly DFT,  with the input/output vectors being probability amplitudes of quantum states.
Thus it is a transformation between quantum states, i.e., a quantum gate.
In addition, it can be efficiently implemented on a quantum computer (more details later).

In the context of quantum computing, the state vector is of dimension $$N=2^n$$ where $$n$$ is the number of qubits.
As continuation of the previous section,
let's look at two sets of special states:

* states corresponds to the rows of the [Walsh-Hadamard matrix](https://en.wikipedia.org/wiki/Hadamard_transform):
  $$\prod_{j=0}^{n-1}\otimes\left(\left|0\right>+(-1)^{r_j}\left|1\right>\right)$$
* states corresponds to the rows of the [IQFT/IDFT matrix](https://en.wikipedia.org/wiki/Quantum_Fourier_transform):
  $$\prod_{j=0}^{n-1}\otimes\left(\left|0\right>+\omega_{2^n}^{jr}\left|1\right>\right)$$

where $$r=0,1,..,2^n-1$$ are the row index for the $$n$$-qubit transform matrix,
$$r_j$$ is the $$j$$'th digit of $$r$$'s binary representation,
and $$\otimes$$ denotes tensor product.

Note that the Walsh-Hadamard gate is particularly easy to implement since it can be decomposed as 1-qubit Hadamard gates,
i.e., $$H_n = H_1^{\otimes n} $$.

Similarly, if we have prior information that the multi-qubit probability amplitudes take the form of one column of DFT matrix,
we can apply IQFT gate to concentrate these amplitudes into one state.
And one measurement on one copy of this quantum state will tell us which column it was.

Furthermore, if the prior information is that the state vector is close to one of the columns of DFT matrix,
then measurements on a few copies of this quantum state will tell us which column it was.
This turns out to be quite useful: **as long as we can encode the answer of some computation problem to one of the column states, QFT provides a way to read out the answer!**

## quantum phase estimation algorithm

As we will see in this section, the [phase estimation algorithm (PEA)](https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm), a quantum algorithm for eigenvalues and eigenvectors, uses QFT as a helper to read out the answer.

## reference
* [R. Cleve, et al, Quantum algorithms revisited, Proc. Roy. Soc. Lond. 454, 339 (1998)](https://arxiv.org/pdf/quant-ph/9708016.pdf)
* [A. Yu. Kitaev, Quantum measurements and the Abelian Stabilizer Problem, (1995)](https://arxiv.org/abs/quant-ph/9511026)
