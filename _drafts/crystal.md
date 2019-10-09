---
layout: post
title: crystal lattices and space groups
date:   2019-10-10 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [crystallography, solid state physics, group theory]
---

3D

Throughout I will use the [Hermann–Mauguin notation](https://en.wikipedia.org/wiki/Hermann%E2%80%93Mauguin_notation),
where

symbol | meaning
--- | ---
$$n$$ | $$n$$-fold rotation
$$\bar n$$ or $$-n$$ | $$n$$-fold rotary inversion
$$m$$, same as $$-2$$ | mirror
$$\frac {n}{m}$$ or $$n/m$$ | $$n$$-fold rotation and

## 4 unit cell types

A crystal is a periodic structure in 3D and the smallest repeating unit is called
the **primitive cell**.
The choice of primitive cell is not unique, see Fig. 1.

> Fig. 1. Unit cell

Usually it's better to choose basis vectors to reflect the crystal's symmetry.
As in Fig. 1, a rectangular unit cell would be better than a parallelepiped one.

Sometimes it helps to define **conventional cell** whose volume is integral
multiples of the primitive cell.
Their advantage is in reflecting the crystal symmetry better.

- P: primitive
- I: body-centered
- F: face-centered
- C: side-centered, aka end-centered

I will use side-centered conventional cell as an example. Suppose we have a
crystal with triclinic primitive cell, but the cell parameters satisfy

$$ a_1 = a_2, \alpha_{13} = \alpha_{23}.$$

Then we can

> Fig. 2. Side-centered unit cell. The primitive cell basis vectors $$\mathbf a_1$$
  and $$\mathbf{a_2}$$ are in the plane of the screen, $$\mathbf a_3$$ is pointing
  into the screen but not perpendicular to the screen.

$$\begin{align}
\mathbf {A_1} =& \mathbf a_1 + \mathbf a_2 \\
\mathbf {A_2} =& \mathbf a_1 - \mathbf a_2
\end{align}$$

Here $$\mathbf A_1$$ is the symmetry element $$2$$.

In the Hermann notation for space group

Centring Type| Symbol|Multiplicity
Primitive - no centring |P|	1
A-face centred |	A|	2
B-face centred|	B	|2
C-face centred|	C	|2
All-face centred|	F|	4
Body centred|	I|	2
Rhombohedrally centred|	R|	3

## 7 crystal systems

crystal system | characteristic symmetry | syngony | unit cell parameters | independent parameters
--- | --- | --- | --- | ---
 cubic | | $$a=b=c , \alpha=\beta=\gamma=90^\circ$$, PIF
 tetragonal| $$a=b\neq c, \alpha=\beta=\gamma=90^\circ$$, PI
 orthorhombic| $$a\neq b\neq c, \alpha=\beta=\gamma=90^\circ$$, PIFC
 hexagonal| $$a=b\neq c, \alpha=\beta=90^\circ, \gamma=120^\circ$$, P
 trigonal| $$a=b=c, \alpha=\beta=\gamma\neq90^\circ$$, P
 monoclinic| $$a\neq b\neq c, \alpha=\gamma=90^\circ, \beta\neq120^\circ$$, PC
 triclinic| 1x 1-fold | -1 | $$a\neq b\neq c, \alpha\neq\beta\neq\gamma\neq90^\circ$$, P

## 14 Bravais lattice

## 32 point groups


## 230 space group

## references

- [3D symmetry](http://pd.chem.ucl.ac.uk/pdnn/symm1/symindex.htm)
