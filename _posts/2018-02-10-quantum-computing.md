---
layout: post
title:  Quantum computing
date:   2018-02-10 10:00:00 -0500
categories: [technology]
comments: true
tags: [quantum computer]
---

There has been quite some news on [quantum computing](https://en.wikipedia.org/wiki/Quantum_computing) from the leading tech companies recently. To name a few:

* Oct.2017:
    * [Microsoft released a preview of its quantum computing development kit](https://docs.microsoft.com/en-us/quantum/?view=qsharp-preview)
    * [Intel announced 17-qubit processor](https://newsroom.intel.com/news/intel-delivers-17-qubit-superconducting-chip-advanced-packaging-qutech/)
    * [IBM demonstrated simulation of 56 qubits on classical computer with 3TB memory cost](https://www.ibm.com/blogs/research/2017/10/quantum-computing-barrier/)
    * [Google announced an open source chemistry package called OpenFermion](https://research.googleblog.com/2017/10/announcing-openfermion-open-source.html)
* Nov.2017: [IBM announced 20-qubit processor for clients and 50-qubit prototype](https://www-03.ibm.com/press/us/en/pressrelease/53374.wss)
* Jan.2018: [Intel announced 49-qubit processor](https://newsroom.intel.com/news/intel-advances-quantum-neuromorphic-computing-research/)

They have agreed on the [cloud-based quantum computing architecture](https://en.wikipedia.org/wiki/Cloud-based_quantum_computing) and it is anticipated that soon quantum computing will bring breakthroughs to the following fields

* drug development
* material science
* financial modeling
* climate forecasting

all of which are notoriously difficult problems in high performance computing.
In particular, a lot of enthusiasm in the following two areas

* chemistry simulation
* machine learning / artificial intelligence

In this post, I will give a gentle introduction to this technology, with some emphasis on chemistry simulation,
The ideal reader would have some acquaintance with science and technology, but not necessary an expert of quantum mechanics.
If you are interested in the fusion of quantum computing and neural network,
checkout [this article](https://www.quantamagazine.org/job-one-for-quantum-computers-boost-artificial-intelligence-20180129/).
Other sub-fields such as quantum communication, [quantum cryptography](https://en.wikipedia.org/wiki/Quantum_cryptography), [quantum algorithm design](https://en.wikipedia.org/wiki/Quantum_algorithm), [quantum complexity theory](https://en.wikipedia.org/wiki/Quantum_complexity_theory) etc, will be fully omitted here.

Doug Finke maintains a website with lots of useful information,
including up-to-date qubit count/characteristics, industry/academic players, job opportunities, etc:

* [quantum computing report](https://quantumcomputingreport.com/)

## introduction

In the early 80s, people started to think about simulating quantum systems using other quantum systems whose Hamiltonian can be tuned.
This is a very natural idea because simulating a quantum system on a classical computer is very expensive.
There are two aspects to this difficulty

* the amount of **space** to store the quantum state, either in memory or in disk
* the effort to calculate the time evolution, i.e., the **time** complexity

In the most straightforward implementation, the number of bits needed to describe a quantum system on a classical computer grows exponentially with the number of atoms.
For example, if 10 states are needed to describe an atom, then a 100-atom system would require a vector of size $$10^{100}$$ components.
Note that the [number of atoms in the whole universe](https://en.wikipedia.org/wiki/Observable_universe#Matter_content) is estimated to be $$\sim 10^{80}$$.

If you are not familiar with quantum mechanics, you can think of an analogy of throwing $$N$$ unfair dice.
Here each die represents an atom and the goal is to describe the probability of all possible outcomes.
Throwing the first die has 6 possible outcomes, throwing two dice has $$6^2=36$$ outcomes, etc.
Suppose the probability of the outcomes are fixed and independent for each die,
then we only need to store $$6N$$ numbers to figure out the probabilities of all $$6^N$$ outcomes,
thanks to the [product rule of probability]([200~https://www.khanacademy.org/science/biology/classical-genetics/mendelian--genetics/a/probabilities-in-genetics).
However, if the dice can interact with each other during the throwing, then the outcome depends on the details of their dynamics,
and we will need a vector of $$6^N$$ components to describe the probability of all possible outcomes of throwing $$N$$ dice.

In order to calculate the time evolution of quantum systems, [matrix manipulations](https://en.wikipedia.org/wiki/Matrix_(mathematics)) are needed.
On classical computers, straightforward implementation of [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication) has time complexity $$O(n^3)$$, where $$n$$ is the size of the input.
It is possible to make it slightly more efficient but not much: definitely not $$O(n^2)$$.
Going back to our unfair dice example, calculating the dynamics of $$N$$ dice would then have time complexity $$O(6^{3N})$$,
in the worst case.

Thus in practice, such straightforward implementation on classical computers, the so-called [full configuration interaction](https://en.wikipedia.org/wiki/Full_configuration_interaction) approach, can only be used to study very small molecules.
Various approximated methods have been developed to deal with medium sized molecules with less computational burden.
For large molecules such as proteins which can easily have more than 100,000 atoms, it is still extremely challenging if not impossible to simulate them quantum mechanically.

On the other hand, if we have a simulator which is itself a quantum mechanical object, the time evolution calculation is taken care of by nature.
There is no need to explicitly calculate matrix multiplications anymore.
All we need to do is to set up the [Hamiltonian](https://en.wikipedia.org/wiki/Hamiltonian_(quantum_mechanics)) of the system (i.e., give a description of how atoms interact) at the beginning, and then just wait for the desired end time of the simulation.
For example, if we use the quantum system of interest to 'simulate' itself and we are interested in the result at 1 second, then we just wait for 1 second and look at the system.

Nowadays there is the vague notion of [quantum supremacy at 50 qubits](https://en.wikipedia.org/wiki/Quantum_supremacy).
It basically claims that a quantum computer with 50 qubits could beat any classical computer in computational power.
If we just count the size of the state space, 50 qubit amounts to a state vector with size $$2^{50}\simeq 10^6 G$$.
Matrix multiplications of such vectors is indeed daunting.
There are still controversies on whether this supremacy happens at 50 qubits.
But it definitely gives strong incentives for the tech companies to make 50-qubit devices.

It did not take long for the idea of [universal quantum computer](https://en.wikipedia.org/wiki/Quantum_Turing_machine) to appear.
The goal here is to build a universal machine that can do all possible calculations, instead of building a specialized machine for each computational task.
In terms of quantum simulators, it means that one would have a device that can simulate all possible quantum systems at least with some approximations.
This line of thought is a direct analogy of the classical computer, the [Church-Turing machine](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis).

 \ | classical computer | quantum computer
 --- | --- | ---
 unit | {::nomarkdown} bit <ul><li>two states: 0 or 1</li><li>hardware: <ul><li>transistor (cpu)</li><li>transistor/capacitor (memory)</li><li>ferromagnetic material (hard drive)</li></ul> </li> </ul> {:/} | {::nomarkdown}qubit <ul><li>two basis states: 0 and 1</li><li>hardware: macroscopic quantum systems <ul><li>superconducting circuit (many companies) </li> <li>trapped ion (Amazon)</li> <li>quantum dot (Intel)</li><li>photon (NTT) </li> <li>topological (Microsoft) </li> <li>NV diamond</li><li>neutral atom</li></ul> </li> </ul> {:/}
 universal gate set| 1-bit gate NOT + 2-bit gate AND and OR | 1-qubit gate + some 2-qubit gate such as [CNOT](https://en.wikipedia.org/wiki/Controlled_NOT_gate)
 rationale| break arbitrary boolean functions into basic building blocks, for example, two-bit NAND and NOR gates | break arbitrary unitary evolutions to basic building blocks

This analogy with quantum gates and quantum circuits to the classical computer is known as the [quantum circuit model](https://en.wikipedia.org/wiki/Quantum_circuit).
There are also other implementations of universal quantum computer as well,
such as [one way quantum computing](https://en.wikipedia.org/wiki/One-way_quantum_computer) where computation is done by performing single-qubit measurements sequentially on special initial states.

There are two further points I would mention too

* In classical computer, the bit is both a computational unit and storage unit.  I am not aware of any storage device for qubits yet.
* I am also not aware of high-level [programming languages for quantum computer](https://en.wikipedia.org/wiki/Quantum_programming) yet. Right now one needs to plan out sequence of quantum gates on the qubits, which can be likened to programming with [assembly language on classical computer](https://en.wikipedia.org/wiki/Assembly_language). All kinds of tricks have been developed to use as few qubits as possible since there are not many available nowadays.


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

Michael Nielsen also maintains [a blog with many interesting articles](http://michaelnielsen.org/), and published [a free online book on deep learning](http://neuralnetworksanddeeplearning.com/).

## industry opportunities

Back in my graduate school years (around 2010), there were few industry opportunities for quantum computing graduates.
The ones I knew were

* [IBM](https://www.research.ibm.com/ibm-q/): general-purpose superconducting quantum computer based on [circuit QED](https://en.wikipedia.org/wiki/Circuit_quantum_electrodynamics)
* [Microsoft station-Q](https://www.microsoft.com/en-us/research/group/microsoft-quantum-santa-barbara-station-q/): [topological quantum computing](https://en.wikipedia.org/wiki/Topological_quantum_computer) (theory only)
* [D-Wave](https://www.dwavesys.com): superconductor based [adiabatic quantum computing](https://en.wikipedia.org/wiki/Adiabatic_quantum_computation)

To make things worse, they all specialize in some specific quantum computing architecture and there are not many openings.
Thus in order to be hired, one basically needs to graduate from a handful academic labs with flying colors.
As a result, most quantum computing graduates (not so many to start with) went to finance companies or software companies,
just like most other physics and math PhDs.

Fortunately, more and more companies start to invest in quantum computing nowadays.
A comprehensive list of such public and private companies can be found on the [quantum computing report website](https://quantumcomputingreport.com/players/).

The current status of the major players are as follows

company | device type | qubit count | next goal
--- | --- | --- | ---
IBM | superconductor | 50 | ?
Intel |superconductor | 49 | ?
Google | superconductor | 22 | 49
Rigetti | superconductor | 19 | ?
IonQ (funded by Amazon) | trapped ion | 7 | 20-50
D-Wave | superconductor | 2048 | 5000
NTT | photon | 2048 | 100,000

Note that the device of D-Wave and NTT are not general-purpose quantum computers.

As you can see, there is some favor over superconductor based architectures.
If you are interested in the comparison between different architectures, take a look at the following paper as well

* N.M. Linke, et.al., [Experimental comparison of two quantum computing architectures, PNAS 114(13) 3305, 2017](http://www.pnas.org/content/114/13/3305)

Many companies give public access to cloud based simulator of quantum computers, such as
[IBM quantum experience](https://en.wikipedia.org/wiki/IBM_Quantum_Experience), 
[Google quantum playground](http://www.quantumplayground.net/#/home),
[NTT QNN cloud](https://qnncloud.com/), etc.
IBM even allows public access to their real devices since 2016 (it was a 5-qubit device back then and it may be a 16-qubit device now):
a real quantum computer is thus only a few keyboard strokes from you.

## more on quantum chemistry simulations

Recently there is [news that drug discovery companies start to invest in quantum computer](https://edgylabs.com/11-companies-set-for-a-quantum-computing-leap) as well, for example

* [Amgen Inc.](http://www.amgen.com/)
* [Biogen Inc.](https://www.biogen.com/)

This interest may be traced to the following 4 papers (I might miss other important works too).

* [Aspuru-Guzik et al, Simulated Quantum Computation of Molecular Energies, Science 309 (5741), 1704 (2005)](http://science.sciencemag.org/content/309/5741/1704.long)
    * simulating quantum computer using classical computer, 4 qubits
    * calculate H2O and LiH ground state energies using recursive phase estimation (20 -> 4 qubits)
    * prepare approximate ground state for stretched H2
* [Lanyon et al, Towards quantum chemistry on a quantum computer, Nature Chemistry 2, 106 (2010)](https://www.nature.com/articles/nchem.483)
    * photonic implementation, 4 qubits
    * calculate the energy spectrum of H2 in a minimal basis
* [P.J.J. O'Mally, et al, Scalable Quantum Simulation of Molecular Energies PRX 6, 031007 (2016)](https://journals.aps.org/prx/abstract/10.1103/PhysRevX.6.031007)
    * superconducting qubits, 4 qubits
    * calculate H2 energy spectrum
* [Kandala et al, Hardware-efficient variational quantum eigensolver for small molecules and quantum magnets, Nature 549, 242 (2017)](https://www.nature.com/articles/nature23879)
    * superconducting qubits (fluxon circuit QED), 6 qubits
    * calculate H2, LiH, BeH2 ground state energies


