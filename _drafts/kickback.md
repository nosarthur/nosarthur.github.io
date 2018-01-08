---
layout: post
title: Phase kickback
date:   2018-01-30 03:43:08 -0500
categories: [quantum information and computation]
comments: true
---

Phase kickback is a useful concept in quantum algorithm design.
It is more of a way to interpret result than a computational trick.
I don't know why people start to think in this way, 
but it seems to provide a paradigm for many (famous) quantum algorithms,
such as [Shor's algorithm](), [the phase estimation algorith](), [Deutsch algorithm](), [Simon's algorithm](), etc.

The paradigm can be demonstrated in a simple two-qubit situation $$\left|0\right>\left|\psi\right>$$,
where the first qubit does not contain meanful information intially (it is commonly known as the ancilla qubit)
and the second qubit contains some meanful information.
(Here I arbitrarily set the ancilla qubit to be in state 0 to start with.
Sometimes it is more beneficial to start with state 1 there.)
The application of a [Hadamard gate]() on the ancilla qubit followed by a 
[control-phase (CPhase) gate]() on the two-qubit system (the ancilla qubit being the control)
gives rise to

$$
C_\phi H\otimes I\left|0\right>\left|\psi\right>
=\frac{\left|0\right>+e^{i\phi}\left|1\right>}{\sqrt 2}\left|\psi\right> $$

where $$I$$ is the identity matrix, $$\otimes$$ is the [tensor product operation](),
and the quantum gates are given by

$$H = \frac{1}{\sqrt 2}\being{bmatrix}
1& 1 \\
1& -1 \\
\end{bmatrix} \quad
C_\phi = \being{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 1 & 0\\
0& 0 & 0 & e^{i\phi}
\end{bmatrix}$$

Note that it is as if the result of the gate actions is to add phase factors to
the control (ancilla) qubit.
This is quite different from classical computing where the control bit remains
intact and the bit being controlled changes.
And this is why this interpretation is called phase kickback.


control-NOT (CNOT) gate 

$$CNOT= \being{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 0 & 1\\
0& 0 & 1 & 0
\end{bmatrix}$$

$$ CNOT\left|x\right>\left|y\right> = \left|x\right>\left|y\oplus x\right>$$
