---
layout: post
title:  Back propagation
date:   2016-05-24 23:43:08 -0500
categories: [machine learning]
comments: true
tags: [neural network]
---

Back propagation (BP) is the method to calculate gradient for 
neural networks (NNs).

## chain rule 

For simplicity, let's assume there is only one hidden layer.
The inputs $$\mathbf x\in\mathbb{R}^m$$, the output of the hidden
layer $$\mathbf h\in\mathbb{R}^n$$ and the final output 
$$y\in\mathbb R$$.

$$\begin{align}\nabla_\mathbf{x}y=&\frac{\partial y}{\partial h_i}\frac{\partial h_i}{\partial x_j}\hat e_j \\
=&\nabla_{\mathbf h}y \frac{\partial\mathbf h}{\partial\mathbf x}\end{align}$$

where $$\frac{\partial\mathbf h}{\partial\mathbf x}$$ is the 
Jacobian matrix, $$\nabla_{\mathbf h}y$$  and 
$$\nabla_{\mathbf x}y$$ are the row matrices of partial derivatives.
[Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation)
is assumed here.
To remember their sizes, recall that the Jacobian is a linear 
approximation of the original mapping, thus 

$$\frac{\partial\mathbf h}{\partial\mathbf x}: \mathbb{R}^m\rightarrow\mathbb{R}^n \\  
\nabla_{\mathbf h}y:\mathbb{R}^n\rightarrow\mathbb{R}\\
\nabla_{\mathbf x}y:\mathbb{R}^m\rightarrow\mathbb{R}. $$

Graphically, the structure of the NN can be visualized as the top
chain in Fig. 1.

<svg width='500' height='90'> 
  <defs>
      <marker id="arrow" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" refx="5" refy="0" orient="auto" markerUnits="strokeWidth">
      <path d="M0,-5 L10,0 L0,5" />
      </marker>
  </defs>
<circle cx='25' cy='21' r='20' fill='white' stroke='black' /> 
    <text x='25' y='28' text-anchor='middle' font-size='26'> x </text>
    <line x1="44" y1="21" x2="100" y2="21" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='130' cy='21' r='20' fill='yellow' stroke='black' /> 
    <text x='130' y='28' text-anchor='middle' font-size='26'> h </text>
    <line x1="150" y1="21" x2="205" y2="21" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='235' cy='21' r='20' fill='white' stroke='black' /> 
    <text x='235' y='28' text-anchor='middle' font-size='26'> y </text>
<circle cx='25' cy='68' r='20' fill='white' stroke='black' /> 
    <text x='25' y='75' text-anchor='middle' font-size='26'> x </text>
    <line x1="44" y1="68" x2="100" y2="68" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='130' cy='68' r='20' fill='yellow' stroke='black' /> 
    <text x='130' y='75' text-anchor='middle' font-size='26'> h 
    <tspan dx='-10' dy='-14' font-size='12'> (1) </tspan> </text>
    <line x1="150" y1="68" x2="205" y2="68" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='235' cy='68' r='20' fill='yellow' stroke='black' /> 
    <text x='235' y='75' text-anchor='middle' font-size='26'> h 
    <tspan dx='-10' dy='-14' font-size='12'> (2) </tspan> </text>
    <line x1="255" y1="68" x2="310" y2="68" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='340' cy='68' r='20' fill='white' stroke='black' /> 
    <text x='340' y='75' text-anchor='middle' font-size='26'>y</text>
</svg>

> Figure 1. Graphic representation of two NN architectures.
The hidden layers are colored yellow.

With more hidden layers and vector output $$\mathbf y$$, 
for example, the bottom architecture in Fig. 1,
the chain rule becomes

$$\frac{\partial\mathbf y}{\partial\mathbf{x}}=\frac{\partial \mathbf y}{\partial\mathbf h^{(2)}} \frac{\partial\mathbf h^{(2)}}{\partial\mathbf h^{(1)}}\frac{\partial\mathbf h^{(1)}}{\partial\mathbf x}$$


## fully connected NN


$$ \mathbf h^{(i)} = g^{(i)}(W^{(i)}\mathbf h^{(i-1)}+\mathbf b^{(i)})$$

dynamic programming

## references

* [Deep learning book][2] by Ian Goodfellow, Yoshua Bengio and Aaron Courville
* 

[2]: http://www.deeplearningbook.org/
