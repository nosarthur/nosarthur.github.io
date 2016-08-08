---
layout: post
title: Kaggle titanic challenge II
date:   2016-08-03 13:43:08 -0500
categories: [side project]
comments: true
description: My solution with score 0.78469 on Kaggle titanic competition
tags: [feature engineering, random forest]
---

## fine tuning the classifiers

* decision threshold 

* imbalance between the labels `class_weight`

## feature engineering

* Untraviolet analytics' [blog](http://www.ultravioletanalytics.com/2014/11/05/kaggle-titanic-competition-part-iii-variable-transformations/)
* Trevor Stephens' [blog](http://trevorstephens.com/kaggle-titanic-tutorial/r-part-4-feature-engineering/)

The title [master](https://en.wikipedia.org/wiki/Master_(form_of_address)) refers to boys who have not entered society.

```python
title_map = {'Ms':'Mrs', 'Mlle':'Mrs', 'Mme':'Mrs', 'Capt':'Sir',              
     'Dr':'Sir', 'Rev':'Sir', 'Major':'Sir', 'Col':'Sir', 'Don':'Sir', 
     'the Countess':'Lady', 'Jonkheer':'Lady', 'Dona':'Lady' } 
```

After adding the title feature, my score was boosted to **0.79426** from **0.78469**.
There are 34 rows being different between the two submissions.
If I assume that there are 418 entries in the test, then the addition of the `Title` feature only allows me to get 4 more correct predictions.



