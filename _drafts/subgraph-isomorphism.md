---
layout: post
title: Subgraph isomorphism
date:   2019-03-02 13:00:00 -0500
categories: [math and physics]
comments: true
tags: [algorithm, graph theory]
---

I have always been very interested in graph theory for many reasons.

* intuitive 
* Due to its high-level of abstraction, it is relevant to all kinds of real-life problems.

Many of the graph theory problems can be deceiving simplicity, and the ingenuity in existing results.
Back in graduate school, I had a lot of fun [attacking the graph isomorphism problem of strongly regular graphs using quantum random walk](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.81.052313) with my colleagues.
In my current company invested in computational chemistry,
graph theory is also used everywhere since atoms and chemical bonds are natrually modeled by nodes and edges.
It is an important component of the field called [cheminformatics](https://en.wikipedia.org/wiki/Cheminformatics).

* graph isomorphism: are two molecules the same?
* subgraph isomorphism: does a molecule contrain some specific fragment?
* maximal common subgraph: what is the common structure between two molecules?

Note that [subgraph isomorphism problem](https://en.wikipedia.org/wiki/Subgraph_isomorphism_problem) is [NP-complete](https://en.wikipedia.org/wiki/NP-completeness).

[graph isomorphism](https://en.wikipedia.org/wiki/Graph_isomorphism_problem) is [NP-intermediate](https://en.wikipedia.org/wiki/NP-intermediate)


[Stirling's approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation) is used.

* VF: [C. Sansone L. P. Cordella, P. Foggia and M. Vento. Performance evaluation of the vf graph matching algorithm. Proc. of the 10th ICIAP, IEEE Computer Society Press, pp. 1172-1177, 1999.](http://ieeexplore.ieee.org/abstract/document/797762/)
* VF2: [L.P. Cordella, P. Foggia, C. Sansone, and M. Vento. A (sub)graph isomorphism algorithm for matching large graphs. Journal of the ACM (JACM) JACM Homepage archive Volume 23 Issue 1, Pages 31-42, 2004.](https://pdfs.semanticscholar.org/b621/74dcbd30c690014c3bdd769a4a15b7e37839.pdf)
* VF2 Plus: [Carletti V., Foggia P., Vento M. (2015) VF2 Plus: An Improved version of VF2 for Biological Graphs. In: Liu CL., Luo B., Kropatsch W., Cheng J. (eds) Graph-Based Representations in Pattern Recognition. GbRPR 2015. Lecture Notes in Computer Science, vol 9069. Springer, Cham](https://link.springer.com/chapter/10.1007/978-3-319-18224-7_17)
* VF2++:
* VF3: [Carletti V., Foggia P., Saggese A., Vento M. (2017) Introducing VF3: A New Algorithm for Subgraph Isomorphism. In: Foggia P., Liu CL., Vento M. (eds) Graph-Based Representations in Pattern Recognition. GbRPR 2017. Lecture Notes in Computer Science, vol 10310. Springer, Cham](https://link.springer.com/chapter/10.1007/978-3-319-58961-9_12)


In this post, I will review the maximum common subgraph problem in the context of mapping atoms between two molecules.

The [python networkx module](https://networkx.github.io/) already implemented the VF2 algorithm for subgraph isomorphism.

## introduction

maximum common subgraph (MCS)

There are two types of MCS due to a subtlety in the definition of subgraph: a subgraph can be created by deleting either edges or vertices.

When a vertex is deleted, the edges associated with it automatically get deleted.
The subgraph created by vertex deletion is also called [induced subgraph](https://en.wikipedia.org/wiki/Induced_subgraph).
For the edge deletion case, the vertices associated with the edge are not deleted.
As a result, the MCS created using these two ways are different.

* maximum common induced subgraph (MCIS): vertex deletion
* maximum common edge subgraph (MCES): edge deletion

For example, the right graph is a subgraph of the left graph, but not an induced subgraph.

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

strategies to speed up the tree search

* branch and bound
* pruning
    * best found, current + potential
    * consider only connected subgraphs
    * other graph properties, e.g., chromatic number is an upper bound for max clique size
* ordering



depth first search (DFS)
