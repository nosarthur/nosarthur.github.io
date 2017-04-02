---
layout: post
title: thermodynamics
date:   2017-05-12 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

Recently I joined a company where close to 60% of the employees have PhD, mostly in computational chemistry.
Based on the interactions so far, I have the impression that the chemists have a much 
better understanding of these topics than me
because to them the thermodynamic quantities are experimental measurable thus
they have intuitions.
On the other hand, to me,

* thermodynamics is multi-variable calculus 
* statistical mechanics is information theory.

Obviously it's not possible to give a full story of these two subjects in a blog post since either of them deserves a thick book. Only the quintessential and a
little bit of fun stuff will be covered, i.e.,

## three (plus one) thermodynamics laws

The [thermodynamics laws](https://en.wikipedia.org/wiki/Laws_of_thermodynamics) are empirical postulates.
Although there are some justifications from statistical mechanics (for the second law), 
I like to see them as results of experimental failure to design [perpetual machines](https://en.wikipedia.org/wiki/Perpetual_motion):
depending on the law they violate, the perpetual machines are classified as the first or second kind. 

* The first law is energy conservation: the energy loss in the system must be transformed to some work. In case we cannot identify all the work done to the externals, we call the missing part heat.

* The second law concerns energy conversion: if the system (i.e., the machine) exchanges heat with only one heat source, it is not possible to extract heat from the heat source without changing the system's state (postulate of [Lord Kelvin](https://en.wikipedia.org/wiki/William_Thomson,_1st_Baron_Kelvin)).

* The third law 

There is also a zeroth law which essentially defines temperature.

## basic mathematical tools

The somewhat confusing part of thermodynamics is that the state variables are not all independent. For example, if we can find an [equation of state](https://en.wikipedia.org/wiki/Equation_of_state) for the system

$$ f(P, V, T) = 0$$, 

then only two of the three state variables are independent. 
Thus in thermodynamics, three tools from calculus are of great importance: 

* [chain rule](https://en.wikipedia.org/wiki/Chain_rule)
* [inverse function theorem](https://en.wikipedia.org/wiki/Inverse_function_theorem)
* [implicit function theorem](https://en.wikipedia.org/wiki/Implicit_function_theorem)

They can be used to derive magic equations like 

$$ \left(\frac{\partial P}{\partial V}\right)_T
\left(\frac{\partial V}{\partial T}\right)_P
\left(\frac{\partial T}{\partial P}\right)_V = -1 $$

## thermodynamic potentials

Combining the first and second law of thermodynamics, we have 

$$ dU = TdS - PdV + \mu dN $$

Often thermodynamic potentials are introduced to deal with different situations

$$ A = U - TS \\ H=U+PV \\ G=U-TS +PV $$

The corresponding differential forms are

$$ dA=-PdV-SdT+\mu dN \\ dH=TdS+VdP+\mu dN \\ dG=VdP-SdT+\mu dN $$




For simplicity, we can also ignore the last term.


As you can see, it's quite a mess. Fortunately, there is a trick in [Kerson Huang](https://en.wikipedia.org/wiki/Kerson_Huang)'s book

<a href="https://www.amazon.com/gp/product/0471815187/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0471815187&linkCode=as2&tag=nosarthur2016-20&linkId=01a45bc6b594cf81108b98b687543082" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0471815187&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0471815187" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

The trick is a square diagram. The 'energy'-like quantities are at the sides of the square and the varying quantities are at the corner. Partial derivatives of
the 'energy'-like quantity with respect to the corner quantity gives rise to the
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


## topics

### $$U \neq E$$

$$U = -T^2\frac{\partial(F/T)}{\partial T} $$

### $$S \simeq \text{DOS}$$


### $$ A = U - TS $$

There are many tricky equalities in thermodynamics. Here is a few particularly important ones


$$\beta \equiv \frac{1}{T} = \frac{\partial S}{\partial E} $$

$$ \frac{\partial U}{\partial\beta} = -kT^2\frac{\partial U}{\partial T} = -kT^2C_V = -\left<H^2\right> + \left<H\right>^2 $$

The probability that a given "microstate" $$\mu$$ occurs is

$$p_\mu = e^{\beta [F-H(\mu) ]} = e^{-S/k_B} $$


