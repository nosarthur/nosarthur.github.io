---
layout: post
title: Maximum common subgraph 
date:   2017-11-21 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [algorithm, graph theory]
---
## introduction

I have always been interested in graph theory and group theory.
In graduate school, I had a lot of fun [applying quantum random walk to the graph isomorphism problem](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.81.052313) with my collegues.
In my current company, I help out with some graph theory related [cheminformatics](https://en.wikipedia.org/wiki/Cheminformatics).
In this post, I will review the maximum common subgraph problem in the context of mapping atoms between two molecules.

* graph isomorphism (whether two molecules are the same)
* subgraph isomorphism (whether one molecule contains another molecule)
* maximal common subgraph (what is the common structure between two molecules)


maximum common subgraph (MCS)

There are two types of MCS due to a subtlety in the definition of subgraph: a subgraph can be created by deleting either edges or vertices.

When a vertex is deleted, the edges associated with it automatically get deleted.
The subgraph created by vertex deletion is also called [induced subgraph](https://en.wikipedia.org/wiki/Induced_subgraph).
For the edge deletion case, the vertices associated with the edge are not deleted.
As a result, the MCS created using these two ways are different.

* maximum common induced subgraph (MCIS): vertex deletion
* maximum common edge subgraph (MCES): edge deletion

As an example, 

<svg width='430' height='180'> 
<circle cx='400' cy='30' r='20' fill='white' stroke-width='3' stroke='black' /> 
<circle cx='300' cy='30' r='20' fill='white' stroke-width='3' stroke='black' /> 
<circle cx='300' cy='130' r='20' fill='white' stroke-width='3' stroke='black' /> 

<circle cx='135' cy='30' r='20' fill='white' stroke-width='3' stroke='black' /> 
<circle cx='35' cy='30' r='20' fill='white' stroke-width='3' stroke='black' /> 
<circle cx='35' cy='130' r='20' fill='white' stroke-width='3' stroke='black' /> 
<line x1="300" y1="49" x2="300" y2="111" stroke="#000" stroke-width="3" />
<line x1="390" y1="47" x2="317" y2="122" stroke="#000" stroke-width="3" />
<line x1="35" y1="49" x2="35" y2="111" stroke="#000" stroke-width="3" />
<line x1="125" y1="47" x2="52" y2="122" stroke="#000" stroke-width="3" />
<line x1="54" y1="30" x2="115" y2="30" stroke="#000" stroke-width="3" />
</svg>

* vertex product graph
* edge product graph

[modular product graph](https://en.wikipedia.org/wiki/Modular_product_of_graphs)

* a MCIS corresponds to maximal complete subgraph ([clique](https://en.wikipedia.org/wiki/Clique_(graph_theory))) in the node product graph

MCS is in the NP-complete class.

## strategies

maximum clique 

a MCIS between two graphs is equivalent to a maximum clique in the modular product graph.

maximum clique  is also in the NP-complete class.

## algorithms

There is a neat but somewhat old comprehensive review of existing algorithms

* JW Raymond and P Willett, Maximum common subgraph isomorphism algorithms for the matching of chemical structures, Journal of Computer-Aided Molecular Design 16, 521 (2002)

The classic papers include

* G Levi, A note on the derivation of maximal common subgraphs of two directed or undirected graphs, Calcolo 9, 341 (1973)
* C Bron, J Kerbosch, Algorithm 457: finding all cliques of an undirected graph, Communications of the ACM 16, 575 (1973)
* JR Ullmann, An Algorithm for Subgraph Isomorphism, Journal of the ACM 23, 31 (1976)
* JJ McGregor, Backtrack search algorithms and the maximal common subgraph problem, Software: Practice and Experience 12, 23 (1982)

##


[PJ Durand, R Pasari, JW Baker, C Tsai, An Efficient Algorithm for Similarity Analysis of Molecules, Internet Journal of Chemistry 2, 17 (1999)](http://www.cs.kent.edu/~jbaker/paper/)

strategies to speed up the tree search

* branch and bound 
* pruning
    * best found, current + potential
    * consider only connected subgraphs
    * other graph properties, e.g., chromatic number is an upper bound for max clique size
* ordering


Node correspondence table?

depth first search (DFS)
