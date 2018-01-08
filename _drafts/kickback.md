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
but it seems to provide a paradigm for many (famous) quantum algorithms, such as [Shor's algorithm](), [the phase estimation algorith](), [Deutsch algorithm](), [Simon's algorithm](), etc.

[Hadamard gate]()

$$H = \frac{1}{\sqrt 2}\being{bmatrix}
1& 1 \\
1& -1 \\
\end{bmatrix}$$



control-phase (CPhase) gate

$$C_\phi = \being{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 1 & 0\\
0& 0 & 0 & e^{i\phi}
\end{bmatrix}$$

$$
C_\phi H\otimes I\left|0\right>\left|\psi\right>
=\frac{\left|0\right>+e^{i\phi}\left|1\right>}{\sqrt 2}\left|\psi\right> $$

control-NOT (CNOT) gate 

$$C_\phi = \being{bmatrix}
1& 0 & 0 & 0\\
0& 1 & 0 & 0\\
0& 0 & 0 & 1\\
0& 0 & 1 & 0
\end{bmatrix}$$


