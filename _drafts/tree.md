---
layout: post
title: Tree-based classifiers 
date:   2016-08-26 03:43:08 -0500
categories: [machine learning]
comments: true
description: An introduction on decision trees, random forest and boosted trees
tags: [decision tree, random forest, boosted tree]
---
Tree-based classification methods are very commonly used in practice.
Their strength and weakness are as follows.

* pros
    * relatively fast to train
    * able to achieve very good performance
    * able to classify data that are not linearly separable
    * able to treat categorical features out-of-box
    * somewhat easy to interpret the results
* cons
    * high variance (does not generalize well)

In this post, I will cover three major topics

* decision tree
* random forest
* boosted trees

The decision tree is the basic building block. 
The later two methods, as well as another trick called [bagging](https://en.wikipedia.org/wiki/Bootstrap_aggregating), average over many
trees for better results.
In terms of the machine learning jargon, they are ensemble methods that 
build strong learner out of weak learners.

For simplicity, I will use an example with two real valued features
$$(x_1, x_2)$$, two class labels (black and white, or $$Y\in\{0, 1\}$$)
and binary decision trees. The training data are shown as follows

<style> /* set the CSS */
.axis path,
.axis line {
        fill: none;
        stroke: grey;
        stroke-width: 1;
        shape-rendering: crispEdges;
}
</style>

<div id='dots'> </div>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src='/js/decision-tree.js'> </script>

> Figure 1. Black and white dots to be classified.

As a physics major, I find the tree-based classifiers conceptually simple
but less natural to think of than the geometric methods such as logistic regression or support vector machine.

## decision tree

The decision tree classifier uses a series of 
decisions to determine the class label. In the case of binary decision 
trees, the decisions are responses to yes/no questions, as shown in 
Figure 2.

The root node and internal nodes of the tree are the decisions to be made
whereas the terminal nodes (leaves) are the class labels.

<svg width='500' height='280'> 
  <defs>
      <marker id="arrow" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" refx="5" refy="0" orient="auto" markerUnits="strokeWidth">
      <path d="M0,-5 L10,0 L0,5" />
      </marker>
  </defs>
<rect x="235" y="1" width="150" height="30" fill='white' stroke='black'/>
    <text x='310' y='21' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>1</tspan> > 0.3? </text>
    <line x1="285" y1="36" x2="180" y2="67" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="335" y1="36" x2="440" y2="70" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='210' y='48' text-anchor='middle' font-size='18'> yes </text>
    <text x='410' y='48' text-anchor='middle' font-size='18'> no </text>
<circle cx='465' cy='95' r='20' fill='black' stroke='black' /> 
<rect x="100" y="75" width="150" height="30" fill='white' stroke='black'/>
    <text x='170' y='95' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>2</tspan> > 0.5? </text>
    <line x1="140" y1="110" x2="40" y2="144" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="200" y1="110" x2="300" y2="147" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='70' y='125' text-anchor='middle' font-size='18'> yes </text>
    <text x='270' y='125' text-anchor='middle' font-size='18'> no </text>
<rect x="250" y="160" width="150" height="30" fill='white' stroke='black'/>
    <text x='320' y='180' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>1</tspan> > 0.4? </text>
<circle cx='20' cy='170' r='20' fill='white' stroke='black' /> 
    <line x1="290" y1="195" x2="190" y2="234" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="350" y1="195" x2="450" y2="237" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='215' y='210' text-anchor='middle' font-size='18'> yes </text>
    <text x='425' y='210' text-anchor='middle' font-size='18'> no </text>
<circle cx='175' cy='259' r='20' fill='black' stroke='black' /> 
<circle cx='470' cy='259' r='20' fill='white' stroke='black' /> 
</svg>
> Figure 2. Classification using a series of yes/no questions.

Geometrically, these yes/no questions form hard boundaries that separate
data with different labels (click the button in Figure 1).

### branching

One immediate question is how to pick the threshold values for the features. Intuitively, the goal is to make the resultant partitions as pure as 
possible. 

quantify information gain
median

$$ S = -\sum_i p_i \log p_i$$

$$H(p) = -p\log p - (1-p)\log (1-p)$$


![entropy function](https://upload.wikimedia.org/wikipedia/commons/2/22/Binary_entropy_plot.svg){:width="450px"}

> Figure 3. 

$$EH(p) = \sum_{i=1}^2 \frac{N_i}{N} H(p_i) $$

## why averaging over trees is a good idea

$$ p\left(y>\frac{n}{2}\right) = \sum_{k=\frac{n}{2}}^n\binom{n}{k}\epsilon^k(1-\epsilon)^{n-k}$$

* each weak learner should do better than random guess
* the weak learners should not be correlated

To fight the overfit problem 

* ensemble  
* restrict the branching
* pruning

## bagging

## random forest

* bagging
* random feature subsets

## boosted trees

## when trees fail

## references
* [xgboost tutorial](http://xgboost.readthedocs.io/en/latest/model.html)
