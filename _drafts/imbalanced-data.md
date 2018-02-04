---
layout: post
title: How to deal with imbalaned data in classification problems
date: 2018-10-01 03:43:08 -0500
categories: [machine learning]
comments: true
tags: [PDE]
---

## introduction

fraud detection 100:1


confusion matrix

<br> | predicted<br>positive | predicted<br>negative
--- | --- | ---
actual<br>positive | TP | FN
actual<br>negative | FP | TN



Although there are only four cases, 
accuracy (ACC), false positive rate (FPR) and true positive rate (TPR), defined as

$$\begin{align}
\text{ACC} =& \frac{TP + TN}{TP + TN + FP + FN}\\
\text{FPR} =& \frac{FP}{TN + FP} \\
\text{TPR} =& \frac{TP}{TP + FN}
\end{align}$$

Note that the TPR and FPR do not add up to 1.
The FPR is also known as 1 - specifity.
The TPR is also known as sensitivity, recall. 

[Receiver operating characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) (ROC)
The x-axis and y-axis are the FPR and TPR.


area under the curve (AUC)

![imbalance ROC](/assets/Fig2_SMOTE.png){:width='450px'}

> Figure 1. adapted from Fig.2 of the SMOTE paper.

* assign different costs to different classes 
* re-sampling
    * under sample the majority
    * over sample the minority (sample with replacement)
    * [SMOTE: Synthetic Minority Over-sampling Technique](https://www.jair.org/media/953/live-953-2037-jair.pdf) 2002
    * [ROSE: A Package for Binary Imbalanced Learning](https://journal.r-project.org/archive/2014-1/menardi-lunardon-torelli.pdf) 2014

The first three approaches are quite natual attempts. 
The obvious disadvantage of under-sampling is that not all information is used.
In the SMOTE paper, the author mentioned that many studies show a general trend about the performance of these three approaches

under sampling > over sampling > no re-sampling

And the problem with over-sampling of the minority class is over-fitting: 
too much emphasis is placed on the available minority data and the classifier doesn't generalize.
Tuning the minority class cost would have the same problem.

Both SMOTE and ROSE generate synthetic data to improve the classification performance.

## SMOTE

## ROSS
