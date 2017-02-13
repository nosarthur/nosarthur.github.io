---
layout: post
title: Torsion (dihedral) angle force
date:   2017-02-01 10:00:00 -0500
categories: [math and physics]
comments: true
tags: [molecular modeling]
---
In this post I will use vector calculus to derive the forces due to torsion (dihedral) angle energy.

## introduction

Computational chemists have developed classical models for molecules, known as [molecular mechanics](https://en.wikipedia.org/wiki/Molecular_mechanics).
The stable molecular geometric configuration is defined as the energy minimum of 

$$ E = E_\text{covalent} + E_\text{non-covalent} $$

where

$$\begin{align}
E_\text{covalent} =& E_\text{bond} + E_\text{angle} + E_\text{dihedral}\\
E_\text{non-covalent} =& E_\text{electrostatic} + E_\text{van der Waals} 
\end{align}$$

$$E_\text{bond}$$ fixes the distance between two atoms. 
$$E_\text{angle}$$ fixes the angle between two adjacent bonds, i.e., three atoms. 
$$E_\text{dihedral}$$ fixes the angle between three adjacent bonds, i.e., four atoms. 
I don't know whether this model comes from an expansion of some first principle energy function.
My impression is that it's empirical.

As for the form of each energy term, many choices exist (due to the empirical nature of molecular mechanics).
Usually, harmonic potential is used for the bond and angle term.
[Lennard-Jones potential](https://en.wikipedia.org/wiki/Lennard-Jones_potential) is used for the van der Waals term. 
Atoms with charge have the electrostatic term and partially charged virtual sites are introduced to account for dipole/quadrupole effects.

Since this post is about the dihedral term, I will give several choices of its energy form. 
To simplify the notation, I will call it $$U(\phi)\equiv E_\text{dihedral}$$  where $$\phi\equiv\phi_{abcd}$$ is the [dihedral angle](https://en.wikipedia.org/wiki/Dihedral_angle) of the four atoms as shown in Figure 1.
Some choice of $$U(\phi)$$ are as follows

$$\begin{align}
U(\phi) = & \frac{k}{2}(\phi-\phi_0)^2 \\
    =& A[1+\cos(m\phi-\delta)]\\
    =& \frac{k}{2}(\cos\phi - \cos\phi_0)^2 \\
    =&\frac{A_1}{2}(1+\cos\phi)+\frac{A_2}{2}(1-\cos2\phi)+\frac{A_3}{2}(1+\cos3\phi).
\end{align}$$

where all the coefficients are to be fitted with data.

<svg width='300' height='380'> 
  <defs>
      <marker id="arrow" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" refx="5" refy="0" orient="auto" markerUnits="strokeWidth">
      <path d="M0,-5 L10,0 L0,5" />
      </marker>
  </defs>
<circle cx='25' cy='355' r='20' fill='black' stroke='black' /> 
    <text x='60' y='360' text-anchor='middle' font-size='18'>a</text>
<line x1="25" y1="355" x2="135" y2="275" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='100' y='280' text-anchor='middle' font-size='18'>r1</text>
<circle cx='155' cy='255' r='20' fill='black' stroke='black' /> 
    <text x='190' y='270' text-anchor='middle' font-size='18'>b</text>
<line x1="155" y1="255" x2="205" y2="180" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='170' y='200' text-anchor='middle' font-size='18'>r2</text>
<circle cx='215' cy='155' r='20' fill='black' stroke='black' /> 
    <text x='250' y='155' text-anchor='middle' font-size='18'>c</text>
<line x1="215" y1="155" x2="195" y2="80" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='220' y='100' text-anchor='middle' font-size='18'>r3</text>
<circle cx='195' cy='55' r='20' fill='black' stroke='black' /> 
    <text x='230' y='55' text-anchor='middle' font-size='18'>d</text>
</svg>
> Figure 1. Dihedral angle of four atoms. You need to imagine that atoms a,
b, and c are in the same plane (your computer screen for example) whereas atom d is out of the plane.

To get the force due to the dihedral angle potential, we need to take gradient operation with respect to each atom's coordinates.
It is helpful to first express $$\cos\phi$$ in terms of the atoms' coordinates and use chain rule.
Then the exact form of $$U(\phi)$$ becomes less important in the derivation of the dihedral forces because

$$ \mathbf f_a=\nabla_a U(\phi) = \frac{\partial U(\phi)}{\partial \cos\phi}\nabla_a \cos\phi$$

and we only need to worry about $$\nabla_a\cos\phi$$.
Here I used atom a as example and $$\nabla_a$$ means gradient with respect to atom a's coordinates. The other atoms follows the same notation.

If you look at Figure 1 long enough, you will see that 

$$ \cos\phi = \frac{(\mathbf r_1\times\mathbf r_2)\cdot(\mathbf r_2\times \mathbf r_3)}{|\mathbf r_1\times\mathbf r_2| |\mathbf r_2\times\mathbf r_3|}$$

where 

$$\begin{align}
\mathbf r_1 =& \mathbf b - \mathbf a \\
\mathbf r_2 =& \mathbf c - \mathbf b \\
\mathbf r_3 =& \mathbf d - \mathbf c
\end{align}$$

and I use bold face font to denote vectors.

## two helpers and more notations

I will use the following two vector identities repeatedly for the dihedral force derivations

$$ (\mathbf a \times \mathbf b)\cdot (\mathbf a \times \mathbf b) = a^2b^2-(\mathbf a\cdot \mathbf b)^2$$

$$(\mathbf a\times\mathbf b)\times\mathbf a = a^2\mathbf b - \mathbf a\cdot\mathbf b\mathbf a $$

The first one is basically [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).
The second identity has the geometric meaning of removing the vector component along a from vector b.

Both vector identities can be easily derived using the antisymmetric tensor trick in [my other blog post]({% post_url 2016-08-21-vector-analysis%}).

To further simplify the notation, let's define 

$$\hat m = \frac{\mathbf r_1\times \mathbf r_2}{|\mathbf r_1\times \mathbf r_2|},\quad
\hat n = \frac{\mathbf r_2\times \mathbf r_3}{|\mathbf r_2\times \mathbf r_3|} $$

They are surface normals of the planes defined by atoms abc and bcd.

In this notation, $$\cos\phi=\hat n \cdot \hat m$$. 

## the exterior atoms: a and d

I will only show the derivation for atom a here. The result of atom d follows exactly the same way.
Note that only $$\mathbf r_1$$ depends on $$\mathbf a$$. Thus we have 

$$\begin{align}
\nabla_a\cos\phi = & \nabla_a \frac{(\mathbf r_1\times \mathbf r_2)\cdot\hat n}{|\mathbf r_1\times \mathbf r_2|}\\
    =& \frac{\nabla_a (\mathbf r_1\times \mathbf r_2)\cdot\hat n}{|\mathbf r_1\times \mathbf r_2|} - \frac{(\mathbf r_1\times \mathbf r_2)\cdot\hat n}{2}\frac{\nabla_a[(\mathbf r_1\times \mathbf r_2)\cdot(\mathbf r_1\times \mathbf r_2)]}{|\mathbf r_1\times \mathbf r_2|^3}
\end{align}$$

The first term simplifies to 

$$ \frac{\hat n \times \mathbf r_2}{|\mathbf r_1\times \mathbf r_2|} $$

The second term is a bit trickier and it is given by 

$$ -\frac{\hat m\cdot\hat n \hat m\times \mathbf r_2}{|\mathbf r_1\times \mathbf r_2|} $$

Combining the two terms, we get 

$$ \nabla_a\cos\phi = \frac{\hat n \times\hat m \times \hat n \times \mathbf r_2}{|\mathbf r_1\times \mathbf r_2|} $$

The validity of this solution can be seen intuitively.
Two of atom a's three degrees of freedom do not change the dihedral angle, i.e., translation along $$\mathbf r_1$$ and $$\mathbf r_2$$.
Only its rotation about the axis $$\mathbf r_2$$ changes the dihedral angle thus the force is perpendicular to the plane spanned $$\mathbf r_1$$ and $$\mathbf r_2$$, which is exactly what the solution is (the $$\hat n$$, $$\hat m$$ business gives rise to the right magnitude).
Recall that $$(\hat n\times\hat m)\times\hat n$$ is the component of $$\hat m$$ perpendicular to $$\hat n$$.

To get the force on atom d, we can simply use the following mapping to the force on atom a

$$ \begin{align}
\mathbf r_1 &\rightarrow -\mathbf r_3\\
\mathbf r_2 &\rightarrow -\mathbf r_2\\
\mathbf r_3 &\rightarrow -\mathbf r_1
\end{align}$$

Thus we have 

$$ \nabla_d\cos\phi = \frac{\hat m \times\hat n \times \hat m \times \mathbf r_2}{|\mathbf r_1\times \mathbf r_2|} $$

## the interior atoms: b and c 

I will only show the derivation for atom b here. The result of atom c follows exactly the same way.
Note that both $$\mathbf r_1$$ and $$\mathbf r_2$$ depend on $$\mathbf b$$.
Splitting the gradient operator, we get three terms

$$\nabla_b\cos\phi = \frac{\nabla_b (\mathbf r_1\times \mathbf r_2)\cdot(\mathbf r_2\times \mathbf r_3)}{|\mathbf r_1\times \mathbf r_2||\mathbf r_2\times \mathbf r_3|} + (\mathbf r_1\times \mathbf r_2)\cdot\hat n\nabla_b\frac{1}{|\mathbf r_1\times \mathbf r_2|} + (\mathbf r_2\times \mathbf r_3)\cdot\hat m\nabla_b\frac{1}{|\mathbf r_2\times \mathbf r_3|} $$

I don't have a neat way to evaluate the first term, thus I simply expand it as 

$$\begin{align}
&\frac{\nabla_b \epsilon_{ijk}\epsilon_{mnk}r_{1i}r_{2j}r_{2m}r_{3n}}{|\mathbf r_1\times \mathbf r_2||\mathbf r_2\times \mathbf r_3|}\\
=&\frac{\mathbf r_2\times(\mathbf r_2\times\mathbf r_3) + \mathbf r_1\times(\mathbf r_2\times\mathbf r_3)+(\mathbf r_1\times\mathbf r_2)\times\mathbf r_3}{|\mathbf r_1\times \mathbf r_2||\mathbf r_2\times \mathbf r_3|}\\ 
=&  \frac{(\mathbf r_1 + \mathbf r_2)\times \hat n}{|\mathbf r_1\times \mathbf r_2|} +\frac{\hat m\times\mathbf r_3}{|\mathbf r_2\times \mathbf r_3|} 
\end{align}$$

The second term simplifies to 

$$ \frac{\hat m \cdot\hat n}{|\mathbf r_1\times \mathbf r_2|} \hat m\times (\mathbf r_1+\mathbf r_2)$$

The third term simplifies to 

$$ \frac{\mathbf r_3\times \hat n \hat m\cdot \hat n}{|\mathbf r_2\times \mathbf r_3|} $$


Combining all three terms, we get 

$$\nabla_b\cos\phi = \frac{\hat n\times\hat m\times \hat n\times\mathbf r_3}{|\mathbf r_2\times \mathbf r_3|} - \frac{\hat m\times\hat n\times\hat m\times (\mathbf r_1+\mathbf r_2)}{|\mathbf r_1\times \mathbf r_2|} $$

Again, intuitively, moving atom b along $$\mathbf r_2$$ does not change the dihedral angle thus there is no force on atom b along $$\mathbf r_2$$.
However, it's hard to see it from the above equation. We can verify from 

$$\begin{align}
\mathbf r_2\cdot\nabla_b\cos\phi =& \left\{\frac{\hat n\times\hat m\times \hat n\times\mathbf r_3}{|\mathbf r_2\times \mathbf r_3|} - \frac{\hat m\times\hat n\times\hat m\times \mathbf r_1}{|\mathbf r_1\times \mathbf r_2|} \right\}\cdot \mathbf r_2\\
\propto & [\mathbf r_1\times\mathbf r_2\times\mathbf r_3 - (\mathbf r_1\times\mathbf r_2)\cdot\hat n\hat n\times\mathbf r_3-\mathbf r_2\times\mathbf r_3\times \mathbf r_1 + \hat m\cdot(\mathbf r_2\times \mathbf r_3)\hat m \times \mathbf r_1]\cdot \mathbf r_2\\
\propto& r_2^2\mathbf r_1\cdot\mathbf r_3 - \mathbf r_1\cdot\mathbf r_2\mathbf r_2\cdot\mathbf r_3 + (\mathbf r_1\times\mathbf r_2)\cdot(\mathbf r_2\times\mathbf r_3) \\
=& 0
\end{align}$$

## final caution

In the derivations, I didn't check if any singularity exists at the origin.
To do that, the easiest way I know is to use generalized functions.
For more details you can check out this book:

<a target="_blank"  href="https://www.amazon.com/gp/product/0817643435/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0817643435&linkCode=as2&tag=nosarthur2016-20&linkId=ed64adcee4d0cdd5a96d7caa3bc4ca83"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0817643435&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0817643435" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
