---
layout: post
title: Heap and binary search tree
date:   2019-11-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [data structure, algorithms]
---


|binary heap | binary search tree (BST)
--- | --- | ---
invariance | parent >= children | all left children <= parent <= all right children
shape | complete binary tree | non-specific
operation complexity |  |
insert |avg $$O(1) worst $$O(\log N)$$ | avg $$O(\log N)$$ worst $$O(N)$$
remove |$$O(\log N)$$ | avg $$O(\log N)$$ worst $$O(N)$$
search | $$O(N)$$ | avg $$O(\log N)$$ worst $$O(N)$$
