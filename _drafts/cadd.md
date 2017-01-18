---
layout: post
title: Computer-aided drug design 
date:   2017-05-14 23:43:08 -0500
categories: [technology]
comments: true
tags: [free energy perturbation]
---

Free energy perturbation

1kcal/mole = 0.0433 eV = 503K

* covalent bond: 50-150 kcal/mole

## theory

In the canonical ensemble, the Helmholtz free energy 

$$A = -\frac{1}{\beta}\log Q$$ 

where $$beta=1/k_BT$$ and $$Q$$ is the the partition

$$ Q = \frac{1}{h^{3N}}\int e^{-\beta H(\mathbf p, \mathbf r)}d\mathbf p d\mathbf r $$

The difference in Helmholtz free energy  between target and reference systems

$$\Delta A = -\frac{1}{\beta}\log \frac{Q_1}{Q_0}$$

With the definition of 

$$ P_0(\mathbf x, \mathbf p)\equiv \frac{e^{-\beta H_0}}{Q_0}$$

one can write the free energy difference in the forward $$0\rightarrow 1$$ transformation as

$$\Delta A = -\frac{1}{\beta}\left<e^{-\beta \Delta H} \right>_0 $$

If the kinetic term cancels out

$$\Delta A = -\frac{1}{\beta}\left<e^{-\beta \Delta U} \right>_0 $$

Similarly, one can focus on the backward $$1\rightarrow0$$ transformation

$$\Delta A = -\frac{1}{\beta}\left<e^{-\beta \Delta U} \right>_1 $$

Since the calculation of free energy 
In practice, only free energy difference between two closely related systems can be calculated.

$$ \frac{dA}{d\lambda} = \left<\frac{\partial H(\lambda)}{\partial \lambda} \right>_\lambda$$

$$ \delta A = \int_{\lambda_0}^{\lambda_1} \left<\frac{\partial H(\lambda)}{\partial \lambda} \right>_\lambda d\lambda$$

This is the thermodynamic-integration formula.

### experimental verification

$$ K_a = \frac{\text{host:guest}}{[\text{host}][\text{guest}]} $$

The standard binding free energy

$$\Delta A_\text{binding}^0=-\frac{1}{\beta}\log(c^0K_a) $$

### Bennett acceptance ratio (BAR) method

## single-topology paradigm and double-topology paradigm

## toy model

* creation and annihilation
* point mutation
* navigation along a geometrical reaction coordinate


