---
layout: post
title: Maximum common subgraph 
date:   2017-07-21 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [algorithm, graph theory]
---
## introduction

* graph isomorphism (whether two molecules are the same)
* subgraph isomorphism (whether one molecule contains another molecule)
* maximal common subgraph (what is the common structure between two molecules)

maximum common subgraph (MCS)

* maximum common induced subgraph (MCIS)
* maximum common edge subgraph (MCES)

[induced subgraph](https://en.wikipedia.org/wiki/Induced_subgraph) means subgraph by vertex deletion

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

There is a comprehensive review of existing algorithms

* JW Raymond and P Willett, Maximum common subgraph isomorphism algorithms for the matching of chemical structures, Journal of Computer-Aided Molecular Design 16, 521 (2002)

The classic papers include

* G Levi, A note on the derivation of maximal common subgraphs of two directed or undirected graphs, Calcolo 9, 341 (1973)
* C Bron, J Kerbosch, Algorithm 457: finding all cliques of an undirected graph, Communications of the ACM 16, 575 (1973)
* JR Ullmann, An Algorithm for Subgraph Isomorphism, Journal of the ACM 23, 31 (1976)
* JJ McGregor, Backtrack search algorithms and the maximal common subgraph problem, Software: Practice and Experience 12, 23 (1982)


review papers

* JW Raymond, P Willett, Maximum common subgraph isomorphism algorithms for the matching of chemical structures, Journal of Computer-Aided Molecular Design 16, 521 (2002)

strategies to speed up the tree search

* branch and bound 
* pruning
* ordering

strategies to truncate the search tree

* consider only connected subtrees
* 

Node correspondence table?

depth first search (DFS)
