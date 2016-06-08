---
layout: post
title:  ROC curve
date:   2016-04-16 23:43:08 -0500
categories: [machine learning]
comments: true
tags: [ROC]
---

The ROC curve is short for receiver operating characteristic curve. 


The true positive rate (TPR) and false positive rate (FPR) are defined as

$$
\begin{align}
TPR \equiv& \frac{TP}{TP + FN} \\
FPR \equiv& \frac{FP}{FP+TN}
\end{align}
$$

They are also known as sensitivity/recall, and (1-specificity)/fall-out.

Each point on the ROC curve corresponds to the (TPR, FPR) pair give a 
specific threshold value. 

When the operation context is known, the indifference curve can be plotted.
The expected utility can be computed as 
\begin{align}
E(u) = u_{TP}r_P TPR + u_{FN}r_P(1-TPR) + u_{FP}r_NFPR + u_{TN}r_N(1-FPR)
\end{align}
where $$u$$ is the utility of different classes, $$r_P$$ is the probability of 
positive events.
