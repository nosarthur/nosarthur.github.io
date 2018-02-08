---
layout: post
title: Maximum common subgraph
date:   2019-02-01 13:00:00 -0500
categories: [math and physics]
comments: true
tags: [algorithm, graph theory]
---

## introduction

In this post, I will review the maximum common subgraph problem in the context of mapping atoms between two molecules.

maximum common subgraph (MCS)

There are two types of MCS due to a subtlety in the definition of subgraph: a subgraph can be created by deleting either edges or vertices.

When a vertex is deleted, the edges associated with it automatically get deleted.
The subgraph created by vertex deletion is also called [induced subgraph](https://en.wikipedia.org/wiki/Induced_subgraph).
For the edge deletion case, the vertices associated with the edge are not deleted.
As a result, the MCS created using these two ways are different.

* maximum common induced subgraph (MCIS): vertex deletion
* maximum common edge subgraph (MCES): edge deletion

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
