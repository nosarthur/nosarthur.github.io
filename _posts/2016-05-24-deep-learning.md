---
layout: post
title:  Deep learning
date:   2016-05-24 23:43:08 -0400
categories: machine learning
comments: true
tags: [machine learning]
---

Deep learning (DP) is built upon the older field of neural networks (NN). 
Roughly speaking, it is a NN with many layers. 
Typically it is used as supervised learning. 
Like NN, its structure encodes a nonlinear mapping between input and output and parameters are to be fitted using known input-output data (training set). 
After the parameters are fitted, generalization to unseen input (test data) is then possible. 
Although one is still solving an optimization problem in DP or NN, the explicit parametrization of the cost function is too cumbersome to write down. 
On the other hand, the cost function naturally has layered structure thus allows updates to be done layer by layer (back propagation).

The basic computational unit of NN is a single neuron, which takes a vector input $$x$$ and scalar output $$y$$. 
There many choices of input-output relationship of a single neuron. 
One possible choice is the sigmoid neuron with $$y=\sigma(wx+b)$$, 
where $$\sigma(z)=\frac{1}{1+\exp(-z)}$$, $$w$$ is a row vector called weight and $$b$$ is a scalar called bias. 
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
One may need a large training set for a sophisticated NN otherwise the system is underdetermined. 
Regularization helps in these cases. Also data augmentation can be used to increase the training data.

The cost function can take on many forms, as long as it aims to characterize the difference between ground truth and model output. 
A typical choice is the cross-entropy function, i.e., , where y(x) is the ground truth result for the input x and a is the NN output. 
The overall cost function is . 
To minimized the cost function, one needs to calculate  where the partial derivatives are with respect to the weights and biases. 
In theory it is possible to write down explicit expression of these derivatives for each neuron. 
But such approach would make the coding extremely tedious and any change in the NN structure would require big change in the code. 
Fortunately, the layered structure of NN enables a layer-by-layer update of all the partial derivatives of C, starting from the output layer towards the input layer. 
This technique is called back propagation, which is essentially the chain rule of calculus. 
At each layer, it is helpful to introduce an intermediate variable  where j refers to the neuron index and . 
Note here the superscript denotes the layer index. 
Then starting from the output layer, all the partial derivatives can be easily derived.

For a long time, NN with many layers cannot be solve in reasonable time due to a so-called vanishing gradient problem. 
This is because when there are many layers, the partial derivatives with respect to the early layers become too small. 
This problem limited the early NN research to shadow network structures. 
From around 2006, special NN structures have been proposed, 
which are deep (with many layers) and somewhat easier to train due to their designs.

convolutional neural network (CNN)

recurrent neural network (RNN)

Resources

Michael Nielsen's book
deep learning book by Ian Goodfellow, Yoshua Bengio and Aaron Courville
Stanford deep learning tutorial
