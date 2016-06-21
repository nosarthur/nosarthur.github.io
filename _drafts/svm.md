---
layout: post
title:  Support vevtor machine
date:   2016-06-20 13:43:08 -0500
categories: [machine learning]
comments: true
tags: [SVM]
---

As shown in the [other post]({% post_url 2016-06-08-classification %}), the support vector machine (SVM) method aims at separating the 
two types of data points with a hyperplane $$z\equiv w^Tx+b=0$$.

The hyperplane is uniquely determined by maximizing the distance from
the hyperplane to the closest points. It can be written as

$$ \frac{\min\|w\|^2}{2}, \quad s.t. \quad  y^{(i)} z^{(i)}\ge 1,$$

where $$z^{(i)} = w^Tx^{(i)}+b$$, 
the label $$y^{(i)}$$ takes the value of $$\pm1$$, 
and the unknowns are the weights $$w$$ and bias $$b$$.
We also assume the data points $$x^{(i)}\in\mathbb R^n$$ and there
are $$m$$ data points in the training set.

This model only works if the data are linearly separable. 
To process data that are not linearly separable, 
such as in Fig. 1, two more ideas need to be added: the soft margin
and the kernel trick.
The soft margin allows for mislabels whereas the kernel trick 
expand the feature vector dimension in the hope that the data 
become linearly separable in some higher dimensional space. 

I will introduce these two ideas one by one in the following sections.

<svg width='350' height='200'> 
<circle cx='25' cy='21' r='5' fill='white' stroke='black'/> 
<circle cx='42' cy='31' r='5' fill='white' stroke='black'/> 
<circle cx='52' cy='71' r='5' fill='white' stroke='black'/> 
<circle cx='47' cy='131' r='5' fill='white' stroke='black'/> 
<circle cx='247' cy='161' r='5' fill='white' stroke='black'/> 
<circle cx='87' cy='181' r='5' fill='white' stroke='black'/> 
<circle cx='127' cy='101' r='5' fill='white' stroke='black'/> 
<line x1="140" y1="0" x2="200" y2="200" 
            stroke='black' stroke-width="2"  />
<circle cx='299' cy='77' r='5' fill='black' stroke='black'/> 
<circle cx='120' cy='81' r='5' fill='black' stroke='black'/> 
<circle cx='290' cy='91' r='5' fill='black' stroke='black'/> 
<circle cx='270' cy='98' r='5' fill='black' stroke='black'/> 
<circle cx='333' cy='111' r='5' fill='black' stroke='black'/> 
<circle cx='320' cy='151' r='5' fill='black' stroke='black'/> 
</svg>

> Figure 1. Example of data points that are not linearly separable.

## soft margin

To allow label errors, we need to introduce slack variables
$$\xi\in\mathbb R^m$$ in the constraints:

$$y^{(i)} z^{(i)} \ge 1-\xi_i, \quad\text{with } \xi_i\ge0$$

Although errors are allowed, they are not preferred, thus an extra
penalty term is added to the cost function

$$\min_{w,b,\xi}\frac{1}{2}\|w\|^2 + C\sum_{i=1}^m\xi_i $$

The regularization parameter $$C>0$$ needs to be determined by try and
error.

To solve this optimization problem, we use the generalized 
Lagrangian multiplier method.
The Lagrangian is given by 

$$ \mathcal L = \frac{1}{2}w^Tw + C\sum_{i=1}^m\xi_i + \sum_{i=1}^m\alpha_i\left(1-\xi_i-y^{(i)}z^{(i)}\right)-\sum_{i=1}^m r_i\xi_i$$

with positive multipliers $$\alpha_i$$ and $$r_i$$.

The [KKT condition](https://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions) requires 

$$\frac{\partial\mathcal L}{\partial w}=0, 
\frac{\partial\mathcal L}{\partial b}=0,
\frac{\partial\mathcal L}{\partial\xi}=0 $$

which give rise to 

$$w=\sum_{i=1}^m \alpha_i y^{(i)}x^{(i)} \\
\sum_{i=1}^m \alpha_iy^{(i)}=0$$


In general it is preferable to use SVM with soft margin even if the
data are linearly separable. One example is shown in Fig. 2.

<svg width='350' height='200'> 
<circle cx='25' cy='21' r='5' fill='white' stroke='black'/> 
<circle cx='42' cy='31' r='5' fill='white' stroke='black'/> 
<circle cx='52' cy='71' r='5' fill='white' stroke='black'/> 
<circle cx='47' cy='131' r='5' fill='white' stroke='black'/> 
<circle cx='67' cy='133' r='5' fill='white' stroke='black'/> 
<circle cx='77' cy='103' r='5' fill='white' stroke='black'/> 
<circle cx='72' cy='53' r='5' fill='white' stroke='black'/> 
<circle cx='287' cy='171' r='5' fill='white' stroke='black'/> 
<circle cx='237' cy='115' r='5' fill='black' stroke='black'/> 
<circle cx='112' cy='171' r='5' fill='white' stroke='black'/> 
<circle cx='87' cy='181' r='5' fill='white' stroke='black'/> 
<circle cx='127' cy='101' r='5' fill='white' stroke='black'/> 
<line x1="160" y1="0" x2="210" y2="200" 
            stroke='black' stroke-width="2"  />
<line stroke-dasharray="5, 5" x1="15" y1="5" x2="350" y2="190"
            stroke='black' stroke-width="2"/>
<circle cx='299' cy='27' r='5' fill='black' stroke='black'/> 
<circle cx='259' cy='37' r='5' fill='black' stroke='black'/> 
<circle cx='299' cy='77' r='5' fill='black' stroke='black'/> 
<circle cx='220' cy='81' r='5' fill='black' stroke='black'/> 
<circle cx='290' cy='91' r='5' fill='black' stroke='black'/> 
<circle cx='270' cy='98' r='5' fill='black' stroke='black'/> 
<circle cx='333' cy='111' r='5' fill='black' stroke='black'/> 
<circle cx='320' cy='151' r='5' fill='black' stroke='black'/> 
</svg>

> Figure 2. Although the data points are linearly separable, the
existence of one outlier may change the SVM result by a lot.
SVM with soft margin is more robust to outliers.

## kernel trick 

a linear algorithm in the feature space is equivalent to a non-linear algorithm in the input space

In practice, a low degree polynomial kernel or RBF kernel with a reasonable width is a good initial try.

Gaussian kernel

$$ K(x, z) = \exp\left(-\frac{\|x-z\|}{2\sigma^2} \right)$$

polynomial kernel 

$$ K(x, z) = (x^Tz+c )^d, \quad d\in\mathbb{N} $$

