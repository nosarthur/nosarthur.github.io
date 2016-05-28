---
layout: post
title:  Deep learning
date:   2016-05-24 23:43:08 -0500
last_update:   2016-05-28 03:43:08 -0500
categories: [machine learning]
description: My note on this topic.
comments: true
tags: [machine learning, neural network]
---

## Introduction

Deep learning (DP) is a buzzword nowadays. 
It has found great success in object recognition, speech 
recognition, image segmentation, machine translation, etc.
In this post I will summarize what I have learned from readings. 

## What it is

Deep learning is built upon the older field of neural networks (NN). 
Roughly speaking, it is a NN with many layers. 
Typically it is used as supervised learning. 
Like NN, its structure encodes a nonlinear input-output relationship
and parameters are to be fitted using known input-output data (training set). 
After parameter fitting, 
generalization to unseen input (test data) is then possible. 
Although one is still solving an optimization problem in DP or NN, 
the explicit parametrization of the cost function is too cumbersome to write down. 
On the other hand, the cost function naturally has layered structure thus allows updates to be done layer by layer (back propagation).

## A brief history

According to the [book][2] by Ian Goodfellow, Yoshua Bengio and Aaron Courville, there have been three waves of development of deep learning. 

1. cybernetics 1940s - 1960s
    * idea: intelligence may be modeled by reverse engineering 
            the brain function using artificial NN
    * hindrance: too little is know about how the brain works
2. connectionism 1980s - 1990s
    * idea: intelligence can emerge when a large number of simple
            computational units are networked together
    * hindrance: computational cost is too great
3. deep learning since 2006
    * idea: depth of NN can be important in the performance
    * hindrance: understanding is poor of why things work 

## The building block 

The basic computational unit of NN is a single neuron, which takes a vector input $$x$$ and scalar output $$y$$. 
There many choices of input-output relationship of a single neuron. 
One popular choice is the sigmoid neuron with $$y=\sigma(wx+b)$$, 
where $$\sigma(z)=\frac{1}{1+\exp(-z)}$$ is the sigmoid function, 
$$w$$ is a row vector called weight and $$b$$ is a scalar called bias. 
Another popular choice is the linear rectifier neuron with 
$$\sigma(z) = \max(0, z)$$.

This setup is motivated by the biological neuron, 
which receives inputs from other neurons and passes its output to 
others. 
The sigmoid function is a smoothed version of the step function, 
thus it characterizes the neuron as being either activated 
(1) or deactivated (0). 
The linear rectifier neuron is either deactivated (0), 
or activated with different intensities.

## The network

In a NN there are layers of neurons and there is freedom how to connect the neurons. 
The outputs of previous layers are fed into the succeeding layer as inputs. 
A succinct way to write the input-output relationship for one layer is  $$a'=\sigma(Wa+b)$$, 
where $$a'$$ is the output vector, $$a$$ is the input vector (or the output vector of the previous layer), 
$$W$$ is a matrix whose rows correspond to the weights to the neurons of the current layer, 
and $$b$$ is the bias vector. 
Note $$a'$$ and $$b$$ are of the same size while $$a$$ may not have the same size since the number of neurons does not need to be the same from layer to layer.

Thus the parameters of the NN are the weights and biases of the individual neurons. 
The purpose of the training data is to fit out these parameters. 
Note the number of parameters grows rapidly with the number of neurons and the number of layers. 
Thus a large training data set is needed for a sophisticated NN otherwise the system is under-determined. 
Regularization helps in these cases. Also data augmentation can be used to increase the training data.

## The solver: back propagation 
The cost function can take on many forms, as long as it aims to characterize the difference between ground truth and model output. 
A typical choice is the cross-entropy function, i.e.,

$$C_x = -[y(x)\log a + (1-y(x))\log(1-a)] $$

where $$y(x)$$ is the ground truth result for the input $$x$$ and $$a$$ is the NN output. 
The overall cost function is $$C = \sum_x C_x$$. 
To minimized the cost function, one needs to calculate $$\nabla C_x$$ 
where the partial derivatives are with respect to the weights and biases. 
In theory it is possible to write down explicit expression of these derivatives for each neuron. 
But such approach would make the coding extremely tedious and any change in the NN structure would require big change in the code. 
Fortunately, the layered structure of NN enables a layer-by-layer update of all the partial derivatives of $$C$$, 
starting from the output layer towards the input layer. 
This technique is called back propagation, which is essentially the chain rule of calculus. 
At each layer, it is helpful to introduce an intermediate variable $$\delta_j^k\equiv\frac{\partial C}{\partial z_j^k}$$ 
where $$j$$ refers to the neuron index and $$z^k\equiv Wa^{k-1}+b$$. 
Note here the superscript denotes the layer index. 
Then starting from the output layer, all the partial derivatives can be easily derived.

For a long time, NN with many layers cannot be solve in reasonable time due to a so-called vanishing gradient problem. 
This is because when there are many layers, the partial derivatives with respect to the early layers become too small. 
This problem limited the early NN research to shadow network structures. 
From 2006, special NN structures have been proposed, 
which are deep (with many layers) and somewhat easier to train due to their designs.
Two examples are convolutional neural network (CNN) and recurrent neural network (RNN).

To be continued ...

## References

* [Neural Networks and Deep Learning][1] by [Michael Nielsen][MN]
* [Deep learning book][2] by Ian Goodfellow, Yoshua Bengio and Aaron Courville
* [Learning Deep Architectures for AI][4] by Yoshua Bengio
* Stanford deep learning [tutorial][3]

[MN]: http://michaelnielsen.org/
[1]: http://neuralnetworksanddeeplearning.com/
[2]: http://www.deeplearningbook.org/
[3]: http://deeplearning.stanford.edu/tutorial/
[4]: http://www.iro.umontreal.ca/~bengioy/papers/ftml_book.pdf

