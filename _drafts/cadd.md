---
layout: post
title: Computer-aided drug design 
date:   2017-05-14 23:43:08 -0500
categories: [technology]
comments: true
tags: [free energy perturbation]
---

## introduction

In this post, I will try to explain how computer simulation can be used to predict potential drugs, 
often know as [computer-aided drug design](https://en.wikipedia.org/wiki/Drug_design#Computer-aided_drug_design).
Since I don't really know much chemistry or biology, the explanation may be somewhat sketchy.

Some nice references are 

* [Chris Chipot 2010 talk](http://www.ks.uiuc.edu/Training/Workshop/Urbana_2010A/lectures/TCBG-2010.pdf)
* [Andrew Pohorille, Christopher Jarzynski and Christophe Chipot, Good Practices in Free-Energy Calculations, J. Phys. Chem. B, 2010, 114 (32), 10235–10253](http://pubs.acs.org/doi/abs/10.1021/jp102971x)

and lectures from Chris Chipot

{% include youtubePlayer.html id="zn7Fd6F9lB0" %}

## free energy

Usually, a drug molecule is a small molecule that effectively binds to certain spot of a protein. 
It changes the structure of that protein thus affects the protein's function.
It is commonly called [ligand](https://en.wikipedia.org/wiki/Ligand_(biochemistry)).

Thus determining the binding capability of a ligand to a target protein is of interest. 
The [binding constant](https://en.wikipedia.org/wiki/Binding_constant) is experimentally defined as 

$$K_a = \frac{[\text{host:guest}]}{[\text{host}][\text{guest}]} $$

where the square bracket denotes concentration. $$K_a$$ can be experimentally measured for candidate ligands. 
However, the ligand synthesis could be quite costly. 

It is related to the standard binding free energy by

$$\Delta A_\text{binding}^0=-\frac{1}{\beta}\log(c^0K_a) $$

where $$\beta=1/k_BT$$ is inverse temperature and $$c^0 = 1 mol/L$$ is the standard reference concentration.

This is where computer simulations could help out since 


Energy scale of free energy perturbation

1kcal/mole = 0.0433 eV = 503K

* covalent bond: 50-150 kcal/mole

## theory

In the canonical ensemble, the Helmholtz free energy 

$$A = -\frac{1}{\beta}\log Q$$ 

where $$Q$$ is the partition function

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

## single-topology paradigm and double-topology paradigm

## toy model

* creation and annihilation
* point mutation
* navigation along a geometrical reaction coordinate

