---
layout: post
title: Naive Bayes classifier
date:   2016-01-01 03:43:08 -0500
categories: [machine learning]
comments: true
tags: [Bayes]
---

## introduction 

In this post, I will describe naive Bayes classifier. 
As you will see, the underlying idea is quite natural and intuitive. 
To be concrete, let's compare apples and oranges as an example.
For simplicity, three features are considered: 

* weight ($$x_1$$): either continuous or binary (greater or less than a cutoff)
* color ($$x_2$$): red / green / orange
* tenderness ($$x_3$$): soft / hard 

In probability theory, 
the treatments for continuous and discrete variables are slightly different. 
If you want to be more relaxed, think of weight as binary feature. 

The problem can be formulated as follows.
We already have a lot of apples and oranges in stock and we have recorded their features
$$(x_1, x_2, x_3)$$.
Now a new fruit comes in and we need to decide whether it is an apple or an orange. 

To make the notation simple, let's define a class label $$y$$ and 

* apple: $$y=0$$
* orange: $$y=1$$

More on notations: 

* I will also write $$(\mathbf x)$$ to denote $$(x_1, x_2, x_3)$$.
* For features from a specific fruit, we can write $$\left(x_1^{(k)}, x_2^{(k)}, x_3^{(k)}\right)$$.
* I will NOT use upper-case letters for random variables and lower-case letters for values.
Hopefully the context will make the meaning clear. If not, please drop me a comment. 

## brain storming

It may be very tempting to use the following approach:

1. find a few fruits in stock that resemble the new one 
1. do a majority vote on them 

It is surely a valid and very practical approach. It is essentially the 
[k-nearest neighobors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm).
But for the sake of this post, let's think of something else.

## more brain storming

To me, it's also very tempting to think of the following

1. calculate the distributions for individual features using fruits in stock 
1. check where the new fruit stands in these distributions and then decide

Basically the first step estimates <span>$$P(x_i|y)$$</span> using existing data and the second step requires some comparison. 
In the figure below, I plot some fictitious <span>$$P(x_i|y)$$</span>.


Now suppose the new fruit is heavy, green and hard. Then we can quite confidently conclude that
it is an apple based on the plots. 

You may wonder why do we estimate <span>$$P(x_i|y)$$</span>, instead of <span>$$P(\mathbf x|y)$$</span>. There are several reasons.

* My little brain prefers to think about single variable, rather than multi-variable functions
* With a given dataset, 

The Bayes' rule

$$
P(y|x) = \frac{P(x|y)P(y)}{P(x)}
$$

$$
\text{posterior} = \frac{\text{prior}\times\text{likelihood}}{\text{evidence}}
$$

The chain-rule 

$$
P(y|\mathbf x) = \frac{P(y)}{P(\mathbf x)}P(x_1|y)P(x_2|y, x_1)P(x_3|y, x_1, x_2)
$$

## summary 

