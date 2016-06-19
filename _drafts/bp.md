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
In this post, I will summarize how it works.

## chain rule 

First let's review the chain rule in calculus. 
For simplicity, let's study a NN with only one hidden layer.
The inputs $$\mathbf x\in\mathbb{R}^m$$, the output of the hidden
layer $$\mathbf a\in\mathbb{R}^n$$ (a is short for activation) 
and the final output 
$$y\in\mathbb R$$. The gradient of the output with respect to the 
input can be calculated as

$$\begin{align}\nabla_\mathbf{x}y=&\frac{\partial y}{\partial a_i}\frac{\partial a_i}{\partial x_j}\hat e_j \\
=&\nabla_{\mathbf a}y \frac{\partial\mathbf a}{\partial\mathbf x}\end{align}$$

where $$\frac{\partial\mathbf a}{\partial\mathbf x}$$ is the 
Jacobian matrix, $$\nabla_{\mathbf a}y$$  and 
$$\nabla_{\mathbf x}y$$ are the row matrices of partial derivatives.
[Einstein summation](https://en.wikipedia.org/wiki/Einstein_notation)
is assumed here.
To remember their sizes, recall that the Jacobian is a linear 
approximation of the original mapping, thus 

$$\frac{\partial\mathbf a}{\partial\mathbf x}: \mathbb{R}^m\rightarrow\mathbb{R}^n \\  
\nabla_{\mathbf a}y:\mathbb{R}^n\rightarrow\mathbb{R}\\
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
    <text x='130' y='28' text-anchor='middle' font-size='26'> a </text>
    <line x1="150" y1="21" x2="205" y2="21" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='235' cy='21' r='20' fill='white' stroke='black' /> 
    <text x='235' y='28' text-anchor='middle' font-size='26'> y </text>
<circle cx='25' cy='68' r='20' fill='white' stroke='black' /> 
    <text x='25' y='75' text-anchor='middle' font-size='26'> x </text>
    <line x1="44" y1="68" x2="100" y2="68" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='130' cy='68' r='20' fill='yellow' stroke='black' /> 
    <text x='130' y='75' text-anchor='middle' font-size='26'> a 
    <tspan dx='-10' dy='-14' font-size='12'> (1) </tspan> </text>
    <line x1="150" y1="68" x2="205" y2="68" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
<circle cx='235' cy='68' r='20' fill='yellow' stroke='black' /> 
    <text x='235' y='75' text-anchor='middle' font-size='26'> a 
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

$$\frac{\partial\mathbf y}{\partial\mathbf{x}}=\frac{\partial \mathbf y}{\partial\mathbf a^{(2)}} \frac{\partial\mathbf a^{(2)}}{\partial\mathbf a^{(1)}}\frac{\partial\mathbf a^{(1)}}{\partial\mathbf x}$$

Note the order of the terms matters.
It has the neat feature that the partial derivative propagates 
backwards from the output layer to the input layer.

## fully connected NN

In reality, we are not interested in $$\frac{\partial\mathbf y}{\partial\mathbf{x}}$$. For supervised learning, a training set of 
$$\{\mathbf x^{(k)}, \mathbf y^{(k)}\}$$ is given. 
We thus define some cost function $$J(\mathbf y(\mathbf x^{(i)}), \mathbf y^{(i)})$$.
The input-output relation at layer i is given by 

$$ \mathbf a^{(i)} = g^{(i)}(W^{(i)}\mathbf a^{(i-1)}+\mathbf b^{(i)})$$

where $$W$$ is the weight matrix and $$\mathbf b$$ is the bias vector.
Following this notation, the input and output can be considered as 
$$\mathbf a^{(0)}$$ and $$\mathbf a^{(L)}$$ where $$L$$ is the 
number of layers.

For notational simplicity let's also define the vector

$$\mathbf z^{(i)}\equiv W^{(i)}\mathbf a^{(i-1)}+\mathbf b^{(i)}$$

Its component $$\mathbf z^{(i)}_k$$ is the input of the activation
function $$g^{(i)}$$ of the $$k$$'th neuron in the $$i$$'th layer.

What we want to compute are 

$$\frac{\partial J}{\partial W^{(i)}_{mn}}, \quad 
\frac{\partial J}{\partial \mathbf b^{(i)}_k} $$

Similar to the chain rule result in the previous section, 


dynamic programming

## working example

Here let's use 

## references

* [Deep learning book][2] by Ian Goodfellow, Yoshua Bengio and Aaron Courville
* 

[2]: http://www.deeplearningbook.org/
