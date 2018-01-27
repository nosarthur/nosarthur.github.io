---
layout: post
title: Segmentation using graph cuts 
date:   2018-02-28 09:00:00 -0500
categories: [image processing]
comments: true
tags: [computer vision]
---

In this post I am going to talk about a very neat method in computer vision called [graph cuts](https://en.wikipedia.org/wiki/Graph_cuts_in_computer_vision).
It nicely demonstrates how probability, graph theory can be pulled together to do something useful.

In particular, QPBO by Vladimir Kolmogorov and Ramin Zabih.



It all starts from the [Ising model](https://en.wikipedia.org/wiki/Ising_model),
a toy model proposed in the 1920's to explain [ferromagnetism](https://en.wikipedia.org/wiki/Ferromagnetism).
We probably all have the experience that a piece of iron can be attracted to a magnet.
This phenomenon is called [paramagnetism](https://en.wikipedia.org/wiki/Paramagnetism). 
All these ferromagnetic metals such as iron, nickel, cobalt are still intensively being studies nowadays, because
they can be used to make useful things, for example, hard disk.


$$ E(x) = h\sum_i x_i + J\sum_{<i,j>} x_i x_j $$

$$x_i =\pm1$$

binary values

Many famous names are associated with Ising model.
Lars Onsager solved the exact analytical solution of the free energy in the absence of magnetic field on 2D square lattice in 1944.
C.N. Yang and T.D. Lee also had important contributions on it.

There are endless variations of it. 

* increase the number of possible states at each lattice site 
[Potts model](https://en.wikipedia.org/wiki/Potts_model).
* change the lattice topology, triangular lattice, kagome (kagome is the Japanese word for a special type of bamboo basket) lattice, or any crystal lattice structures.
* change the interaction pattern from nearest neighbor to something else

Even today there are many physicists working on the variants of it, particularly for [frustrated systems](https://en.wikipedia.org/wiki/Geometrical_frustration).


In 1989, D.M. Greig 


submodularity



## references

http://www.csd.uwo.ca/~yuri/Papers/pami04.pdf)
http://pub.ist.ac.at/~vnk/software.html)

Vladimir Kolmogorov and Ramin Zabih, What energy functions can be minimized via graph cuts, IEEE transactions on pattern analysis and machine intelligence, vol. 26, no. 2, pp. 147, Feb. 2004.
