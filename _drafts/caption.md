---
layout: post
title: Image captioning 
date:   2016-07-03 03:43:08 -0500
categories: [machine learning]
comments: true
tags: [deep learning]
---

There are many papers on image captioning using deep learning. 

## strategies

### Microsoft

1. image -> words
    * image -> regions using edge information 
    * regions -> feature vectors
    * feature vector -> words
2. words -> sentences
3. rank the sentences

### Stanford

1. image -> words
    * image -> regions
    * regions -> feature vectors
    * text -> feature vectors
    * align feature vectors

## details

metric

[BLEU](https://en.wikipedia.org/wiki/BLEU)


## references

* [Microsoft 2014 blog](https://blogs.technet.microsoft.com/machinelearning/2014/11/18/rapid-progress-in-automatic-image-captioning/)
* [Karpathy 2015 CVPR](http://cs.stanford.edu/people/karpathy/deepimagesent/)
* [Piotr’s 2015 blog](https://pdollar.wordpress.com/2015/01/)
