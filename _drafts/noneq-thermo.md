---
layout: post
title: non-equilibrium thermodynamics
date:   2019-12-12 10:00:00 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

gas-and-piston system

My understanding of the field can be summarized in Figure 1.

<svg width='500' height='300'> 
<rect x="45" y="0" width="450" height="250" fill='white' stroke='black'/>
<text x='50' y='290' text-anchor='middle' font-size='18'> equil. </text>
<text x='370' y='290' text-anchor='middle' font-size='18'> non-equil. </text>

</svg>
> Figure 1. Landscape


The difficulty in non-equilibrium thermodynamics is in solving the dynamics of the system,
whereas in equilibrium thermodynamics time is out of the picture.

There are several common approaches to describing dynamics

* Hamiltonian dynamics: deterministic
    * explicit bath degrees of freedom
    * trace out bath afterwards
    * this is a truthful description of reality but not practical to do
    * e.g., [Liouville equation](https://en.wikipedia.org/wiki/Liouville%27s_theorem_(Hamiltonian)), von Neumann equation
* (Poor man's) Hamiltonian dynamics: deterministic
    * thermalized initial conditions
    * without explicit bath degrees of freedom
* Thermostatted dynamics: stochastic
    * bath degrees of freedom are modeled as noise
    * e.g., [Langevin equation](https://en.wikipedia.org/wiki/Langevin_equation)
* Master equation dynamics: deterministic
    * bath degrees of freedom are traced out beforehand
    * e.g., [Lindblad equation](https://en.wikipedia.org/wiki/Lindblad_equation)

{% include youtubePlayer.html id="LXcQx6Bu3OQ" %}

[Jarzynski equality](https://en.wikipedia.org/wiki/Jarzynski_equality)

$$ \left< e^{-\beta W}\right> = e^{\beta\Delta F} $$


The second law of thermodynamics

$$ \Delta F \le -\left< W \right> $$

Linear response theory

$$ \Delta F = -\left<W\right> -\frac{\beta \sigma_W^2}{2} $$

[Crooks fluctuation theorem](https://en.wikipedia.org/wiki/Crooks_fluctuation_theorem)

$$ \frac{\rho_F(-W)}{\rho_R(W)} = e^{\beta(-W+\Delta F)} $$


# references
1. [Udo Seifert, Stochastic thermodynamics, fluctuation theorems, and molecular machines, Reports on Progress in Physics 75, 126001 (2012)](https://arxiv.org/abs/1205.4176)
1. 

