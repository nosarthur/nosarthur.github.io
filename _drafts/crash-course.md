---
layout: post
title: A crash course on data science
date:   2016-08-12 13:43:08 -0500
categories: [side project]
description: The outline of my data science course to break into the field.
comments: true
tags: [data science]
---

## The motive

Clarity in life is important. If I don't know what I am doing, it is bad.
If I don't know why I am doing what I am doing, it is worse.

My dear academia (postdoc) friend, is it clear why you are still there?
After getting my physics PhD in 2011, it becomes more and more clear to 
me that doing research is more suitable as a hobby instead of a job for me.
Thus I made the transition to industry in 2016 and became a data scientist.

Specifically, I would like to walk you through the preparation process for
data scientist jobs, with median base salary $104k (add 13k if you have a PhD) in the US according to [the O'Reilly's 2015 survey](https://www.oreilly.com/ideas/2015-data-science-salary-survey/). 

## The guiding principles

While preparing the materials, I tried to follow the following principles as much as possible.

* simple is better than complex
* concise is better than verbose
* concrete is better than abstract
* intuitive is better than rigorous
* self-contained is better than referencing

## The ideal reader

When planning out the materials, I see you as someone with quantitative background willing to get a data scientist job. 
Ideally, you have a PhD in physics.

Specifically, you should be familiar with the following concepts. 

* linear algebra
    * e.g., matrix inverse, eigen values / vectors, SVD
* multi-variable calculus
    * e.g., Jacobian matrix, inverse function theorem
* probability / statistics 
    * e.g., Bayes rule, chain rule, hypothesis test
* C / Matlab

## The materials

* coding
    * python
        * basics
        * packages: pandas, sklearn, numpy, scipy
    * SQL
    * github
    * interview problems
* statistics
    * hypothesis test
* machine learning
    * tree based methods
    * [naive Bayes]({% post_url 2016-08-01-naive-Bayes %})
    * [logistic regression]({% post_url 2016-06-08-classification %})
    * [support vector machine]({% post_url 2016-06-22-svm %})
* portfolio projects

### data science transitions

* [Preparing for Insight][1]
* [Preparing for DataIncubator][4]
* [Preparing for the Transition to Data Science][2]
* [The Definitive Guide to Do Data Science for Good][3]

### public data sets

* [data.gov](http://catalog.data.gov/dataset)
* [google data](https://cloud.google.com/bigquery/public-data/#usa-names)
* [awesome datasets](https://github.com/caesar0301/awesome-public-datasets)
* [rs.io](http://rs.io/100-interesting-data-sets-for-statistics/)
* [fivethirtyeight](https://github.com/fivethirtyeight/data)


[1]: http://insightdatascience.com/blog/preparing_for_insight.html
[2]: http://www.insightdatascience.com/blog/transition_to_ds.html
[3]: http://blog.datalook.io/definitive-guide-data-science-good/
[4]: http://blog.thedataincubator.com/2014/09/how-to-prepare-for-the-data-incubator/


