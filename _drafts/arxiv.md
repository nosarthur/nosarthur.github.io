---
layout: post
title: deep + learning + medical + images
date:   2016-06-21 13:43:08 -0500
categories: [machine learning]
comments: true
tags: [reference review]
---

The search of 'deep learning medical images' in arXiv gives rise to 
the trend in Fig. 1. 

<style> /* set the CSS */

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}
</style>
<div id='trend'> </div>

<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src='/js/trend.js'> </script>

> Figure 1. Number of papers on 'deep learning medical images' on arXiv.

The readings of Radiologists are typically

* time consuming 
* tedious
* expensive

Thus automation using deep learning may be the future.

## what has been done

* Automated lymph node detection from CT images. 
	* For the two datasets 
of 90 CT volumes with 388 mediastinal LNs and 86 patients with 595 abdominal LNs,
sensitivity of 70%/83% at 3 FP/vol and 84%/90% at 6 FP/vol is achieved.
	* axial, coronal and sagittal slices in a Volume-of-Interest (VOI) into to the RGB channels
	* represent 3D image volume by a set of 2D image set with 3 orthogonal slices

* pancreas segmentation in CT imaging
	* 60 training, 2 validation, 20 testing
	* Dice scores of 68% ± 10% (range, 43-80%) in testing

* patch-based 3D hippocampal segmentation 

* automated classification of human anatomy 
	1. Classify axial CT images into six anatomical classes: brain, neck,
 shoulder, chest, abdomen, pelvis.
200 training set gives rise to over 95% accuracy on 6000 test cases.
	2. using 4,298 separate axial 2D key-images to learn 5 anatomical classes: neck, lung, liver, pelvis, legs, with AUC 0.998 and classification error 5.9%

