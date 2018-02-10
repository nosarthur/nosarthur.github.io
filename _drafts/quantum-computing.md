---
layout: post
title:  Quantum computing
date:   2018-02-03 23:00:00 -0500
categories: [technology]
comments: true
tags: [quantum computer]
---

There has been quite some news on quantum computers from the leading tech companies recently. To name a few:

* Oct.2017:
    * [Microsoft released a preview of its quantum computing development kit](https://docs.microsoft.com/en-us/quantum/?view=qsharp-preview)
    * [Intel announced 17-qubit processor](https://newsroom.intel.com/news/intel-delivers-17-qubit-superconducting-chip-advanced-packaging-qutech/)
    * [IBM demonstrated simulation of 56 qubits on classical computer with 3TB memory cost](https://www.ibm.com/blogs/research/2017/10/quantum-computing-barrier/)
    * [Google announced an open source chemistry package called OpenFermion](https://research.googleblog.com/2017/10/announcing-openfermion-open-source.html)
* Nov.2017: [IBM announced 20-qubit processor for clients and 50-qubit prototype](https://www-03.ibm.com/press/us/en/pressrelease/53374.wss)
* Jan.2018: [Intel announced 49-qubit processor](https://newsroom.intel.com/news/intel-advances-quantum-neuromorphic-computing-research/)

They have agreed on the [cloud-based quantum computing architecture](https://en.wikipedia.org/wiki/Cloud-based_quantum_computing) and it is anticipated that quantum computing will bring breakthroughs to the following fields soon

* drug development
* material science
* financial modeling
* climate forecasting

Specifically, there are papers demonstrate ideas in the following two areas

* chemistry simulation
* machine learning / artificial intelligence

In this post, I will give a gentle introduction to this technology.
The ideal reader would have some acquaintance with science and technology, but not necessary an expert of quantum mechanics.
Emphasis will be placed on chemistry simulation,
and other sub-fields such as quantum communication, algorithm design, etc, will be fully omitted.
If you are interested in the fusion of quantum computing and neural network,
checkout [this article](https://www.quantamagazine.org/job-one-for-quantum-computers-boost-artificial-intelligence-20180129/).

Doug Finke maintains a website with lots of useful information on quantum computing,
including up-to-date qubit count/characteristics, industry/academic players, job opportunities, etc

* [quantum computing report](https://quantumcomputingreport.com/).

## introduction

In the early 80s, people started to think about simulating quantum systems using some universal quantum simulator whose Hamiltonian can be easily tuned.
This is a very natural idea because simulating a quantum system on a classical computer is very expensive:
in the most straightforward implementation, the number of bits needed grows exponentially with the number of atoms.
For example, if 10 energy levels (states) are needed to describe each atom, then a 100-atom system would require a vector of size $$10^{100}$$ components.
Thus in practice, such straightforward implementation (so-called [full configuration interaction](https://en.wikipedia.org/wiki/Full_configuration_interaction)) can only be used to study very small molecules.
Various approximated methods have been developed to deal with intermediate sized molecules with less computational burden.
For large molecules such as proteins which can easily have more than 100,000 atoms, it is still extremely challenging if not impossible to simulate quantum mechanically.

It did not take long for the idea of [universal quantum computer](https://en.wikipedia.org/wiki/Quantum_Turing_machine) to pop up.
It is a direct analogy of the classical computer, the Church-Turing machine.

 \ | classical computer | quantum computer
 --- | --- | ---
 unit | bit <ul><li>two states: 0 or 1</li><li>hardware: <ul><li>transistor (cpu)</li><li>transistor/capacitor (memory)</li><li>ferromagnetic material (hard drive)</li></ul> </li> </ul> | qubit <ul><li>two basis states: 0 and 1</li><li>hardware: macroscopic quantum systems <ul><li>superconducting circuit (many companies) </li> <li>trapped ion (Amazon)</li> <li>quantum dot (Intel)</li><li>photon (NTT) </li> <li>topological (Microsoft) </li> <li>NV diamond</li><li>neutral atom</li></ul> </li> </ul>
 universal gate set| 1-bit gate NOT + 2-bit gate AND and OR (NAND and NOR) | 1-qubit gate + some 2-qubit gate such as [CNOT](https://en.wikipedia.org/wiki/Controlled_NOT_gate)

This analogy to the classical computer is known as [quantum circuit model](https://en.wikipedia.org/wiki/Quantum_circuit).
There are other implementations of universal quantum computer other than the [circuit model](https://en.wikipedia.org/wiki/Quantum_circuit),
such as [one way quantum computing](https://en.wikipedia.org/wiki/One-way_quantum_computer).
I will not discuss them further here.

In classical computer, the bit is both a computational unit and storage unit.
I am not aware of the storage device for qubits yet.

There is the vague notion of [quantum supremacy at 50 qubits](https://en.wikipedia.org/wiki/Quantum_supremacy)

Here is a list of the seminal theory papers before year 2000. It is not meant to be a complete list.

* R. Feynman, Simulating Physics with Computers, IJTP 21, 467 (1982)
* P. Benioff, Quantum Mechanical Models of Turing Machines That Dissipate No Energy, PRL 48, 1581 (1982)
* C.H. Bennett and G. Brassard, Quantum cryptography: Public key distribution and coin tossing, Proc. IEEE international Conference on Computers, Systems and Signal Processing 175 (1984)
* D. Deutsch, Quantum theory, the Church-Turing principle and the universal quantum computer, Proc. R. Soc. London A 400, 97 (1985)
* D. Deutsch and R. Jozsa, Rapid solutions of problems by quantum computation, Proc. R. Soc. London A 439, 553 (1992)
* C.H. Bennett, et al, Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels, PRL 70, 29 (1993)
* P.W. Shor, Algorithms for quantum computation discrete logarithms and factoring, Proc. 35th Symp. Foundations of Comp. Sci., IEEE Computer Society Press 124 (1994)
* P.W. Shor, Scheme for reducing decoherence in quantum computer memory, PRA 52, 2493 (1995)
* P.W. Shor, Fault-tolerant quantum computation,  Proc. 37th Symp. Foundations of Comp. Sci., IEEE Computer Society Press 56 (1996)

In year 2000, [Michael Nielsen](https://en.wikipedia.org/wiki/Michael_Nielsen) and [Isaac Chuang](https://en.wikipedia.org/wiki/Isaac_Chuang) published a book on quantum computing which becomes the standard textbook in this field

<a target="_blank" href="https://www.amazon.com/gp/product/1107002176/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1107002176&linkCode=as2&tag=nosarthur2016-20&linkId=1c89937daa1c6beab7b2f06bdb66724e"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1107002176&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20"></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1107002176" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

Michael Nielsen also writes [a blog with many interesting articles](http://michaelnielsen.org/).

## useful applications

* factor integers
* solving eigenvalues and eigenvectors
* matrix inversion
* search in database

## industry opportunities

Back in my graduate school years (around 2010), there were few industry opportunities for quantum computing graduates.

* [IBM](https://www.research.ibm.com/ibm-q/): general-purpose superconduting quantum computer
* [Microsoft station-Q](https://www.microsoft.com/en-us/research/group/microsoft-quantum-santa-barbara-station-q/): topological quantum computing (theory)
* [D-Wave](https://www.dwavesys.com): adiabatic quantum computing

A more comprehensive list of [public/private companies invested in quantum computing can be found here](https://quantumcomputingreport.com/players/).

company | type | qubit count | next goal
--- | --- | --- | ---
IBM | superconducting | 50 | ?
Intel |superconducting | 49 | ?
Google | superconducting | 22 | 49
Rigetti | superconducting | 19 | ?
IonQ (Amazon) | trapped ion | 7 | 20-50
D-Wave | superconducting | 2048 | 5000
NTT | photon | 2048 | 100,000


[IBM quantum experience](https://en.wikipedia.org/wiki/IBM_Quantum_Experience)


* N.M. Linke, et.al., [Experimental comparison of two quantum computing architectures, PNAS 114(13) 3305, 2017](http://www.pnas.org/content/114/13/3305)


## papers on quantum chemisty simulations

[news](https://edgylabs.com/11-companies-set-for-a-quantum-computing-leap)
drug discovery companies

* [Amgen](http://www.amgen.com/)
* [Biogen](https://www.biogen.com/)


* Aspuru-Guzik et al, Simulated Quantum Computation of Molecular Energies, Science (2005)
    * simulating quantum computer using classical computer, 4 qubits
    * calculate H2O and LiH ground state energies using recursive phase estimation (20 -> 4 qubits)
    * prepare approximate ground state for stretched H2
* Lanyon et al, Towards quantum chemistry on a quantum computer, Nature Chemistry 2, 106 (2010)
    * photonic implementation, qubits
    * calculate the energy spectrum of H2 in a minimal basis
* P.J.J. O'Mally, et al, Scalable Quantum Simulation of Molecular Energies PRX (2016)
    * 
    * H2
* Kandala et al, Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets, Nature (2017)
    * solid state implementation (fluxon circuit QED), 7 qubits


