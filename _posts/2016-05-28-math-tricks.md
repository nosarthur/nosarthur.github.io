---
layout: post
title:  Useful identities in machine learning
date:   2016-05-28 13:34:08 -0500
categories: [math]
comments: true
description: Math identities in machine learning
tags: [machine learning, math]
---

### sigmoid function  and softplus function

$$ \sigma'(x) = \sigma(x)(1-\sigma(x)) $$

$$ 1-\sigma(x) = \sigma(-x) $$

$$ \log\sigma(x) = -\zeta(-x) $$

$$ \tanh(z) = 2\sigma(2z)-1$$

$$ \zeta'(x) = \sigma(x) $$

$$ \forall x\in(0,1),  \sigma^{-1}(x) = \log\frac{x}{1-x} $$

$$ \forall x>0,  \zeta^{-1}(x) = \log(e^x - 1) $$

$$ \zeta(x)-\zeta(-x) = x $$

### derivative of traces 

$$\nabla_A tr AB = B^T $$

$$\nabla_{A^T} f(A) = (\nabla_A f(A))^T $$

$$\nabla_A trABA^TC = CAB +C^TAB^T$$

$$ \nabla_A|A| = |A|\left(A^{-1}\right)^T $$

### Chain rule of probability

$$ p(\mathbf x) = \Pi_{i=1}^n p(x_i | x_1, \cdots, x_{i-1})$$

### others 

$$ \lim_{x\rightarrow0}x\log x = 0 $$
