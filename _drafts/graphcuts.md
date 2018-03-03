---
layout: post
title: Segmentation using graph cuts
date:   2019-02-28 09:00:00 -0500
categories: [image processing]
comments: true
tags: [computer vision]
---

In this post I am going to talk about a very neat method in computer vision called [graph cuts](https://en.wikipedia.org/wiki/Graph_cuts_in_computer_vision).
It nicely demonstrates how probability, graph theory can be pulled together to do something useful.

In particular, quadratic pseudo-Boolean optimization (QPBO) by Vladimir Kolmogorov and Ramin Zabih.


It all starts from the [Ising model](https://en.wikipedia.org/wiki/Ising_model),
a toy model proposed in the 1920's by [Ernst Ising](https://en.wikipedia.org/wiki/Ernst_Ising) (aged 98) and
his Phd advisor [Lenz](https://en.wikipedia.org/wiki/Wilhelm_Lenz) to explain [ferromagnetism](https://en.wikipedia.org/wiki/Ferromagnetism).
We probably all have seen iron pieces being attracted to a magnet.
This phenomenon is called [paramagnetism](https://en.wikipedia.org/wiki/Paramagnetism).
In fact most materials are paramagnetic but the attraction is too weak to be observed.
To be qualified as ferromagnetic, the material needs to remain magnetic when the external magnet is removed.
Not many materials are ferromagnetic. The common ones are iron, nickel, cobalt,
all of which are still intensively studies nowadays, because they can be used to make useful things, such as hard disks.

The energy function Ising studied has the form

$$ E(x) = h\sum_i x_i + J\sum_{<i,j>} x_i x_j $$

where $$x_i =\pm1$$ is the state label at each site, and the summation $$<i,j>$$ is over nearest neighbors.
In this model, the state labels represents the direction of spins (think of small magnets) either along the external field or opposite to the external field,
$$h$$ represents external magnetic field, and $$J$$ describes the spin-spin interaction strength.

At the time, there was interest to model 'spontaneous magnetization', i.e., without an external magnetic field,
magnetization just appears as a result of lowering temperature.
In the case of $$h=0, J<0$$, having all $$x_i$$ being the same value (either all 1 or all -1) would be the ground state.

Many famous physicists have contributed to the development of are associated with Ising model.
The most well-known one may be [Lars Onsager](https://en.wikipedia.org/wiki/Lars_Onsager), who solved the exact analytical
solution of the free energy in the absence of magnetic field on 2D square lattice in 1944.
Others include [Rudolf Peierls](https://en.wikipedia.org/wiki/Rudolf_Peierls) (aged 88),
[Hans Bethe](https://en.wikipedia.org/wiki/Hans_Bethe) (aged 98),
[C.N. Yang](https://en.wikipedia.org/wiki/Chen-Ning_Yang) (age 95 now), [T.D. Lee](https://en.wikipedia.org/wiki/Tsung-Dao_Lee) (age 91 now), and many more.

There are endless variations of Ising model.

* increase the number of possible states at each lattice site
[Potts model](https://en.wikipedia.org/wiki/Potts_model).
* change the lattice topology, triangular lattice, kagome (kagome is the Japanese word for a special type of bamboo basket) lattice, or any crystal lattice structures.
* change the interaction pattern from nearest neighbor to something else
* change the mathematical entity at each lattice site, for example, the [Heisenberg model](https://en.wikipedia.org/wiki/Heisenberg_model_(quantum))

Even today there are many physicists working on the variants of it, particularly for [frustrated systems](https://en.wikipedia.org/wiki/Geometrical_frustration).

Statisticians and computer scientists usually call these variations of Ising model [Markov random field](https://en.wikipedia.org/wiki/Markov_random_field).
Note here Markovian refers to the spatial dimension instead of the temporal dimension, as the name 'field' indicates.



[max flow min cut theorem](https://en.wikipedia.org/wiki/Max-flow_min-cut_theorem)
Ford-Fulkerson algorithm in 1956

from MIT OCW

{% include youtubePlayer.html id="VYZGlgzr_As" %}


* J. Besag, Spatial Interaction and the Statistical Analysis of Lattice Systems, J. Royal Statistical Soc., Series B, vol. 36, pp. 192-236, 1974.

In 1989, D.M. Greig

* D. Greig, B. Porteous, and A. Seheult, Exact Maximum A Posteriori Estimation for Binary Images, J. Royal Statistical Soc., Series B, vol. 51, no. 2, pp. 271-279, 1989.


Now we are going to switch gears for the image processing.
Here binary values 0 and 1 are preferred.

$$x_i\in \{0, 1, \O\}$$

minimizing quadratic function of 0-1 variables

submodularity



## references

http://www.csd.uwo.ca/~yuri/Papers/pami04.pdf)
http://pub.ist.ac.at/~vnk/software.html)

* Vladimir Kolmogorov and Ramin Zabih, What energy functions can be minimized via graph cuts, IEEE transactions on pattern analysis and machine intelligence, vol. 26, no. 2, pp. 147, Feb. 2004.
* Kindermann, Ross; Snell, J. Laurie (1980). Markov Random Fields and Their Applications (PDF). American Mathematical Society.
