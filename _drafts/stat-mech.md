---
layout: post
title: Review of statistical mechanics and thermodynamics
date:   2017-05-12 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [statistical mechanics, thermodynamics]
---

Recently I joined a company where close to 60% of the employees are PhDs in
computational chemistry.
I figure it's time to review my statistical mechanics and thermodynamics for
further engaging conversations.
Based on the interactions so far, I am convinced that the chemists have a much 
better understanding of these topics than me. To me, thermodynamics is
multi-variable calculus and statistical mechanics is information theory.
But for them, the thermodynamic quantities are experimental measurable thus
they have intuitions behind the math.

Obviously it's not possible to give a full story of these two subjects in a blog post since either of them deserves a thick book. Only the quintessential and a
little bit of fun stuff will be covered, i.e.,

* [the basics](#basics)
* [phase transition](#phase)

In the basics, I will summarize the important thermodynamic identities, lay
down the starting point for statistical mechanics, and talk about several 
topics that I find useful.

The phase transition section is the fun section. There I will focus on water,
which contains quite a lot of fascinating behaviors within 100 °C range of temperature change.

## <a name='basics'></a> the basics 

### thermodynamics

Combining the first and second law of thermodynamics, we have 

$$ dU = TdS - PdV + \mu dN $$

This is a direct result of the first law of thermodynamics.


$$ A = U - TS \\ H=U+PV \\ G=U-TS +PV $$

The corresponding differential forms are

$$ dA=-PdV-SdT+\mu dN \\ dH=TdS+VdP+\mu dN \\ dG=VdP-SdT+\mu dN $$

As you can see, it's quite a mess. Fortunately, I learned a trick from [Kerson Huang](https://en.wikipedia.org/wiki/Kerson_Huang)'s book

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

### statistical mechanics

### topics

#### $$U \neq E$$

$$U = -T^2\frac{\partial(F/T)}{\partial T} $$

#### $$S \simeq \text{DOS}$$


#### $$ A = U - TS $$

There are many tricky equalities in thermodynamics. Here is a few particularly important ones


$$\beta \equiv \frac{1}{T} = \frac{\partial S}{\partial E} $$

$$ \frac{\partial U}{\partial\beta} = -kT^2\frac{\partial U}{\partial T} = -kT^2C_V = -\left<H^2\right> + \left<H\right>^2 $$

The probability that a given "microstate" $$\mu$$ occurs is

$$p_\mu = e^{\beta [F-H(\mu) ]} = e^{-S/k_B} $$

<a href="https://www.amazon.com/gp/product/0201360764/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0201360764&linkCode=as2&tag=nosarthur2016-20&linkId=36441850561212a488b7ff2ed6871a7b" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0201360764&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0201360764" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## <a name='phase'></a> phase transitions

![phase diagram of water](https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Phase-diag2.svg/1200px-Phase-diag2.svg.png)


