---
layout: post
title: non-equilibrium thermodynamics
date:   2017-06-12 10:00:00 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

gas-and-piston system

My understanding of the field can be summarized in Figure 1.

<svg width='500' height='300'> 
<rect x="0" y="0" width="250" height="450" fill='white' stroke='black'/>
<text x='10' y='95' text-anchor='middle' font-size='18'> equil. </text>
<text x='350' y='95' text-anchor='middle' font-size='18'> non-equil. </text>

</svg>
> Figure 1. Landscape


The difficulty in non-equilibrium thermodynamics is in solving the dynamics of the system,
whereas in equilibrium thermodynamics time is out of the picture.

Typically, there are several approaches to describing dynamics

* Hamilton dynamics: deterministic
    * explicit bath degrees of freedom
    * trace out bath afterwards
    * this is a truthful description of reality but not practical to do
* Hamilton dynamics: deterministic
    * thermalized initial conditions
    * without explicit bath degrees of freedom
* Thermostatted dynamics: stochastic
    * bath degrees of freedom are modeled as noise
    * e.g., [Langevin equation](https://en.wikipedia.org/wiki/Langevin_equation)
* Master equation dynamics: deterministic
    * bath degrees of freedom are traced out beforehand
    * e.g., [Lindblad equation](https://en.wikipedia.org/wiki/Lindblad_equation)

[Jarzynski equality](https://en.wikipedia.org/wiki/Jarzynski_equality)

[Crooks fluctuation theorem](https://en.wikipedia.org/wiki/Crooks_fluctuation_theorem)

{% include youtubePlayer.html id="LXcQx6Bu3OQ" %}


# references
1. [Udo Seifert, Stochastic thermodynamics, fluctuation theorems, and molecular machines, Reports on Progress in Physics 75, 126001 (2012)](https://arxiv.org/abs/1205.4176)
1. 

