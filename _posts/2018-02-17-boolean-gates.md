---
layout: post
title:  Emulate classical logic gates on quantum computer
date:   2018-02-17 0:00:01 -0500
categories: [quantum information and computation]
comments: true
tags: [quantum computing]
---

In [a previous post]({% post_url 2018-02-10-quantum-computing %}),
I explained at high level how quantum computers are more efficient in simulating quantum systems than classical computers are.
In this post, I will show that classical logic gates can be represented as unitary operators (matrices) acting on qubit states.
Given such unitary evolutions can be implemented on some hardware without crazy overhead, quantum computers are then at least as powerful as classical computers.

Recall that there are two ingredients in a quantum computer

* quantum bits ([qubits](https://en.wikipedia.org/wiki/Qubit)): quantum two-level systems
* [quantum gates](https://en.wikipedia.org/wiki/Quantum_gate): unitary time evolutions

It is trivial to see that qubits can be used as classical bits.
For completeness, I will include the argument here.
In general a qubit can be in a superposition state of 0 and 1, i.e.,

$$\left|\psi\right> = \alpha\left|0\right> + \beta\left|1\right>$$

where $$\alpha$$, $$\beta\in \mathbb{C}$$ and <span>$$|\alpha|^2 + |\beta|^2 = 1$$</span>.
However, if we start with non-superposition states and apply only unitary evolutions whose rows are [natural basis](https://en.wikipedia.org/wiki/Standard_basis) of Euclidean space, we will never end up with superposition states.
Thus all we need to show is that all classical logic gates can be represented by such unitary evolutions.

## NOT gate

The NOT gate is the only non-trivial 1-bit logic gate.
You can easily check that [Pauli matrix](https://en.wikipedia.org/wiki/Pauli_matrices) $$\sigma_x$$ does the trick.
It takes the explicit matrix form as follows and its rows are natural basis.

$$\sigma_x = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$


## XOR gate

When it comes to two-bit logic gates, the situation is a little different: there are two input bits and only one output bit.
Thus we can take two approaches

1. overwrite one input bit by the output and keep the other input bit intact
1. involve three bits in the computation: keep the input bits intact and write the output to a third bit.

For the XOR gate, the first approach is sufficient to construct a unitary matrix.
Suppose we order the input and output as 00, 01, 10, 11 (you can view them as binary strings for 0, 1, 2, 3), and overwrite the second bit, then we have

$$\begin{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 0 & 1\\
0& 0 & 1 & 0
\end{bmatrix}$$

In fact, it is an important 2-qubit quantum gate called [Controlled-NOT or CNOT gate](https://en.wikipedia.org/wiki/Controlled_NOT_gate).

## AND gate

You can easily check that the first approach doesn't work for the AND gate: the corresponding matrix is rank-deficient because AND gate is not [logically reversible][reverse].
Thus we have to use the second approach.
Note that although there are 8 input states, only 4 are meaningful.
In other words, the initial state of the output bit is arbitrary.
Thus we can always set it to 0 initially in real computations.
This convention will fix 4 rows of the unitary matrix, corresponding to input states 000, 010, 100, and 110.
Here the first two bits are input and the last one is output.

Note that since 110 is turned to 111, [unitarity](https://en.wikipedia.org/wiki/Unitarity_(physics)) requires 111 to be turned to 110.
The remaining 3 rows are undetermined.
Since they are not used in real computation, any choice will do as long as it makes the matrix unitary.
The simplest choice is to have these input states map to themselves, i.e.,

$$\begin{bmatrix}
1& 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0& 1 & 0 & 0& 0 & 0 & 0 & 0 \\
0& 0 & 1 & 0& 0 & 0 & 0 & 0 \\
0& 0 & 0 & 1& 0 & 0 & 0 & 0 \\
0& 0 & 0 & 0& 1 & 0 & 0 & 0 \\
0& 0 & 0 & 0& 0 & 1 & 0 & 0 \\
0& 0 & 0 & 0& 0 & 0 & 0 & 1 \\
0& 0 & 0 & 0& 0 & 0 & 1 & 0 \\
\end{bmatrix}$$

In fact, this is an important gate in both classical and [quantum computing](https://en.wikipedia.org/wiki/Quantum_computing): the so-called [Controlled-Controlled NOT (CCNOT) or Toffoli gate](https://en.wikipedia.org/wiki/Toffoli_gate), proposed by [Dr. Tommaso Toffoli](https://en.wikipedia.org/wiki/Tommaso_Toffoli) in 1980.
**Toffoli gate is universal for classical computing**: any boolean function can be decomposed into Toffoli gates with ancilla bits.
However, to achieve universal quantum computing, extra single-qubit gates are needed.

I will leave the construction of OR gate as an exercise for you.

## arbitrary boolean functions

Actually, there is a recipe to make arbitrary boolean functions reversible and the corresponding matrix unitary.
Without loss of generality, we can consider functions of the form

$$ f: \{0, 1\}^n \longrightarrow \{0, 1\}$$

where $$n$$ is the length of the input bit string. Boolean functions with multiple bits as output can be broken down into such 1-bit output functions.

The recipe is essentially our second approach, i.e., enlarge the state space and embed the result into it.
Specifically, it takes the form:

$$ (x, y) \longrightarrow (x, f(x)\oplus y)$$

where $$x$$ is the input string and $$\oplus$$ is the XOR gate.
Here the reversibility/unitariness of the gate is explicitly taken care of by the XOR gate.
In real computations we can always set $$y=0$$ then the last bit is simply the output $$f(x)$$.
Applying this recipe to the AND gate, you will get Toffoli gate.

## further readings

* [D. Deutsch, Quantum theory, the Church-Turing principle and the universal quantum computer, Proc. R. Soc. London A 400, 97 (1985)](https://www.cs.princeton.edu/courses/archive/fall04/cos576/papers/deutsch85.pdf)

[reverse]: https://en.wikipedia.org/wiki/Reversible_computing
