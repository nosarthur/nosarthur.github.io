---
layout: post
title: Thermodynamics
date:   2017-04-07 10:40:00 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

Recently I joined a company where close to 60% of the employees have PhD, mostly in computational chemistry.
It seems that the chemists have a better grasp on thermodynamics and statistical mechanics than me
because to me,

* thermodynamics is multi-variable calculus
* statistical mechanics is information theory,

but to them the thermodynamic quantities are experimental quantities thus they have intuitions.

In this post, I will try to summarize the basics of thermodynamics.
Due to my limited experience, I find not much content in it (maybe I will keep expanding it in the future).
However, there are two very interesting topics

* phase transition
* nonequilibrium thermodynamics

The first one shows how one can use calculus to study discontinuous phenomena.
The second one interests me because I know very little about it.
Maybe I will write something about them in the future.

## three (plus one) thermodynamics laws

The [thermodynamics laws](https://en.wikipedia.org/wiki/Laws_of_thermodynamics) are empirical postulates.
Although there are some justifications from statistical mechanics (for the second law for example),
I like to see them as results of experimental failure to design [perpetual machines](https://en.wikipedia.org/wiki/Perpetual_motion):
depending on the law they violate, the perpetual machines are classified as the first or second kind.

* The first law is energy conservation: the energy loss in the system must be transformed to some work. In case we cannot identify all the work done to the externals, we call the missing part heat.

* The second law concerns energy conversion: if the system (i.e., the machine) exchanges heat with only one heat source, it is not possible to extract heat from the heat source without changing the system's state (postulate of [Lord Kelvin](https://en.wikipedia.org/wiki/William_Thomson,_1st_Baron_Kelvin)).

* The third law provides a reference point for entropy.

There is also a zeroth law which essentially defines temperature.

## basic mathematical tools

The somewhat confusing part of thermodynamics is that the state variables are not all independent. For example, if we can find an [equation of state](https://en.wikipedia.org/wiki/Equation_of_state) for the system

$$ f(P, V, T) = 0$$, 

then only two of the three state variables are independent. 
In the presence of multiple phases and components, one can apply Gibbs' [phase rule](https://en.wikipedia.org/wiki/Phase_rule) to determine the number of independent variables.

To deal with inter-dependent variables, three tools from calculus are of great help: 

* [chain rule](https://en.wikipedia.org/wiki/Chain_rule)
* [inverse function theorem](https://en.wikipedia.org/wiki/Inverse_function_theorem)
* [implicit function theorem](https://en.wikipedia.org/wiki/Implicit_function_theorem)

They can be used to derive magic equations like 

$$ \left(\frac{\partial P}{\partial V}\right)_T
\left(\frac{\partial V}{\partial T}\right)_P
\left(\frac{\partial T}{\partial P}\right)_V = -1 $$

Note that this equality does not rely on the system being ideal gas.

Another useful tool from calculus is [Lagrange multiplier](https://en.wikipedia.org/wiki/Lagrange_multiplier) because often times we are interested in minimizing the free energy with some constraints.

Finally, if we know the equilibrium situation, then [perturbation theory](https://en.wikipedia.org/wiki/Perturbation_theory) can be used to study near-equilibrium phenomenon.

## thermodynamic potentials

Combining the first and second law of thermodynamics, we have 

$$ dU = TdS - PdV + \mu dN $$

Often thermodynamic potentials are introduced to deal with different situations

$$ A = U - TS \\ H=U+PV \\ G=U-TS +PV $$

The corresponding differential forms are

$$ dA=-PdV-SdT+\mu dN \\ dH=TdS+VdP+\mu dN \\ dG=VdP-SdT+\mu dN $$

In situations where the particle number does not change, the last term drops.

As you can see, it's a bit tricky to remember the plus/minus signs and the variables being varied for each thermodynamic potential.
Fortunately, there is a trick in [Kerson Huang](https://en.wikipedia.org/wiki/Kerson_Huang)'s book

<a href="https://www.amazon.com/gp/product/0471815187/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0471815187&linkCode=as2&tag=nosarthur2016-20&linkId=01a45bc6b594cf81108b98b687543082" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0471815187&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0471815187" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

The trick is a square diagram. The chemical potentials are at the sides of the square and the varying quantities are at the corner.
Partial derivatives of
the chemical potentials with respect to the corner quantity gives rise to the
corner quantity at the diagonal. The sign of the partial derivative is given by
the direction of the arrow.

<svg width='105' height='90'>
  <defs>
      <marker id="arrow" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" refx="5" refy="0" orient="auto" markerUnits="strokeWidth">
      <path d="M0,-5 L10,0 L0,5" />
      </marker>
  </defs>
<text x='30' y='20' text-anchor='middle' font-size='26'> V </text>
<text x='60' y='20' text-anchor='middle' font-size='26'> A </text>
<text x='90' y='20' text-anchor='middle' font-size='26'> T </text>
    <line x1="80" y1="58" x2="45" y2="28" stroke="#000" stroke-width="2" marker-end="url(#arrow)" />
<text x='30' y='50' text-anchor='middle' font-size='26'> U </text>
<text x='90' y='50' text-anchor='middle' font-size='26'> G </text>
    <line x1="40" y1="58" x2="75" y2="28" stroke="#000" stroke-width="2" marker-end="url(#arrow)" />
<text x='30' y='80' text-anchor='middle' font-size='26'> S </text>
<text x='60' y='80' text-anchor='middle' font-size='26'> H </text>
<text x='90' y='80' text-anchor='middle' font-size='26'> P </text>
</svg>

I incline to think of these thermodynamic potentials as 'energy' as in 'energy minimization' and smaller the 'energy' the better.
In practice, one is given two situations and has to decide which situation wins.
I will illustrate this point using a drug discovery example in the next section.

## a toy model of protein-ligand binding

In medicinal chemistry (chemistry for medicines), [ligand](https://en.wikipedia.org/wiki/Ligand_(biochemistry)) is the fancy word for molecule and drug is the fancy word for molecule that binds to some specific location ([binding site](https://en.wikipedia.org/wiki/Binding_site)) of a protein molecule.
After binding, the geometric shape of the protein changes, thus its function changes (structure determines function).
In most cases, protein-ligand binding is not strong: no chemical reaction occurs and no chemical bond is formed.


The relevant energy scales are

* room temperature (300K): 26 meV
* [Van der Waals interaction](https://en.wikipedia.org/wiki/Van_der_Waals_force): 1 ~ 40 meV
* [hydrogen bond](https://en.wikipedia.org/wiki/Hydrogen_bond): 40 ~ 1000 meV per bond
* [chemical bond](https://en.wikipedia.org/wiki/Chemical_bond): easily several thousand meV per bond

Thus to determine whether a ligand is a drug, i.e, whether it binds to a site, we need to compare the thermodynamic potential of the binding and unbound states.
For simplicity I will use the [Helmholtz free energy](https://en.wikipedia.org/wiki/Helmholtz_free_energy) as an example.
Then there are only two quantities to worry about: internal energy and entropy.
Their effect on the free energy is opposite as they have opposite signs in the free energy definition.
(Temperature is not of concern since human body temperature variation is small.)
The smaller the internal energy is better, and the bigger the entropy is better.
Note that the bigger the entropy, the more states/configurations are available, thus the more likely the situation becomes.

The binding state has lower internal energy because of the formation of hydrogen bonds, and other interactions.
On the other hand, the binding state has lower entropy than the unbound state:
if we use the key (ligand) - lock (protein) analogy, there is only one key-in-the-lock configuration whereas there are infinite configurations when the key is out of the lock.
Thus whether a ligand binds depends on the subtle competition between the two effects.
