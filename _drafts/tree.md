---
layout: post
title: Tree-based classifiers 
date:   2016-08-26 03:43:08 -0500
categories: [machine learning]
comments: true
description: An introduction on decision trees, random forest and boosted trees
tags: [decision tree, random forest, boosted tree]
---
Tree-based classifiers are commonly used in practice.
Their pros and cons are as follows.

* pros
    * relatively fast to train
    * able to achieve very good performance
    * able to classify data that are NOT linearly separable
    * somewhat easy to interpret the results
    * able to treat categorical features almost out-of-box
* cons
    * unstable (of high variance, somewhat difficult to generalize)

In this post, I will cover four models

* [decision tree](#tree)
* [bagged trees](#bag)
* [random forest](#forest)
* [boosted trees](#boost)

Decision tree is the basic building block of all tree-based classifiers. 
The later three classifiers average over many trees for better result.
In machine learning jargon, they are ensemble methods that 
build strong learner out of weak learners.

In practice, you probably don't want to use decision tree due to 
its instability.
Both random forest and boosted trees can be good to get some out-of-box
base-line performance. I have seen many examples in books saying that 
boosted trees may be slightly better than random forest.

For simplicity, I will use examples of binary classification
using binary decision trees.
The class labels are black and white, or $$Y\in\{0, 1\}$$ and 
the features are two real valued variables $$(x_1, x_2)$$.
Thus the data can be visualized in a plane, as shown in Figure 1.

<style> /* set the CSS */
.axis path,
.axis line {
        fill: none;
        stroke: grey;
        stroke-width: 1;
        shape-rendering: crispEdges;
}
</style>

<div id='button'><input name="updateButton" type="button" 
                       value="Update" onclick="updateData()"/></div>
<div id='dots'> </div>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src='/js/decision-tree.js'> </script>

> Figure 1. Black and white dots to be trained. Click the update button to show/hide decision boundaries.

As a physics major, I find the tree-based classifiers less natural to think 
of than the more 'geometric' methods such as logistic regression or support vector machine.
They deviate from my comfortable zone of *linear algebra* + *calculus* + 
*optimization* and contain some messiness and magic. I will elaborate on 
this point along the way.

## <a name='tree'></a> decision tree

The decision tree classifier uses a series of 
decisions to determine the class label. In the case of binary decision 
trees, the decisions are responses to yes/no questions, as shown in 
Figure 2. It is similar to the game [Botticelli](https://en.wikipedia.org/wiki/Botticelli_(game)).

The root node and internal nodes of the tree are the decisions to be made,
whereas the terminal nodes (leaves) are the class labels.

<svg width='500' height='280'> 
  <defs>
      <marker id="arrow" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" refx="5" refy="0" orient="auto" markerUnits="strokeWidth">
      <path d="M0,-5 L10,0 L0,5" />
      </marker>
  </defs>
<rect x="235" y="1" width="150" height="30" fill='white' stroke='black'/>
    <text x='310' y='21' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>1</tspan> > 0.3? </text>
    <line x1="285" y1="36" x2="180" y2="67" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="335" y1="36" x2="440" y2="70" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='210' y='48' text-anchor='middle' font-size='18'> yes </text>
    <text x='410' y='48' text-anchor='middle' font-size='18'> no </text>
<circle cx='465' cy='95' r='20' fill='black' stroke='black' /> 
<rect x="100" y="75" width="150" height="30" fill='white' stroke='black'/>
    <text x='170' y='95' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>2</tspan> > 0.5? </text>
    <line x1="140" y1="110" x2="40" y2="144" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="200" y1="110" x2="300" y2="147" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='70' y='125' text-anchor='middle' font-size='18'> yes </text>
    <text x='270' y='125' text-anchor='middle' font-size='18'> no </text>
<rect x="250" y="160" width="150" height="30" fill='white' stroke='black'/>
    <text x='320' y='180' text-anchor='middle' font-size='18'> is x 
    <tspan baseline-shift="sub" font-size='12'>1</tspan> > 0.4? </text>
<circle cx='20' cy='170' r='20' fill='white' stroke='black' /> 
    <line x1="290" y1="195" x2="190" y2="234" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <line x1="350" y1="195" x2="450" y2="237" stroke="#000" stroke-width="3" marker-end="url(#arrow)" />
    <text x='215' y='210' text-anchor='middle' font-size='18'> yes </text>
    <text x='425' y='210' text-anchor='middle' font-size='18'> no </text>
<circle cx='175' cy='259' r='20' fill='black' stroke='black' /> 
<circle cx='470' cy='259' r='20' fill='white' stroke='black' /> 
</svg>
> Figure 2. This decision tree generates the decision boundaries in 
Figure 1.

Geometrically, these yes/no questions form hard boundaries that partition
the feature space into rectangles (boxes) for
data with different labels. Please click the update button in Figure 1 to see one possible partition.

At the training stage, one needs to figure out the decision boundaries
(the splitting values for the yes/no questions).
This process is known as branching. 
For the test data, one simply follows the branches to get the class labels.

### branching

The immediate question is how to perform the branching. There are two issues:

* Which feature to split on?
* What value to split on?

Intuitively, the goal is to make the resultant partitions as pure as 
possible after each yes/no question. 
Practically, there are infinitely many ways to do the partitions and it is
even hard to define what 'optimal' partition means.
As a result, many (naive) empirical strategies exist. For example, one 
can partition the data on one feature at a time.
For a chosen feature, one can 

* pick N random values of that feature and pick the best one among them based on a purity measure
* always partition at the median/mean value of that feature 

It is also common to do feature selection and splitting value selection 
together using greedy method, i.e., check all features one by one
and pick the best feature with its best splitting point. 

To be fancier, you may want to define 'optimality' as the least number of
decision boundaries, or maybe you want to parametrize the decision boundary
using more than one feature (e.g., a tilted line in Figure 1). 
Such attempts immediately make 
branching a lot harder. And the effort is probably not 
justified: in the end, one really only cares about the classification performance on 
unseen test data, which is very unlikely to be related to these artificial
'optimality' measures.

In general, there are more details one needs to worry about. For example

* how many branches to use at one splitting point?
* how deep the tree is (stopping criteria for tree growth)?

Unfortunately, there is no clean answer to them. 
For the first question, two branches as well as 
$$\sqrt{N_\text{features}}$$ branches are commonly used.
For the second question, some limits would be applied to the tree growth 
since a fully grown tree classifies the training data perfectly and is 
almost for sure an overfit. Possible limits include

* set the minimum number of data points at tree leaf
* set the depth of the tree
* prune the tree after it is fully grown

Thus (a lot of) try and error is needed in practice to fine tune the tree parameters. 

### (im)purity measure

To evaluate the quality of a decision boundary (yes/no question), we need
to quantify the purity of the data with and without the decision boundary.

One natural measure of purity (for physics major) is entropy:

$$ S = -\sum_{i=0}^1 p_i \log p_i$$

where $$p_i = N_i / N$$ is the percentage of white/black dots in the data.

For our two-class example, there is only one degree of freedom since 
$$p_0+p_1=1$$. We can simplify the notation using the
[binary entropy function](https://en.wikipedia.org/wiki/Binary_entropy_function)

$$H(p) = -p\log p - (1-p)\log (1-p)$$

where $$p$$ is the percentage of white dots. The shape of the binary
entropy function can be seen in Figure 3. It takes on small values if 
any of the two species dominates and takes the maximum value 1 when 
the two species are of equal number. In other words, it is an impurity 
measure.

In fact, any function that assumes a similar shape with the entropy 
function could be used as purity measure. The default one used in 
[sklearn](http://scikit-learn.org/stable/) is Gini index

$$G = \sum_{i=0}^1 p_i(1-p_i)$$ 

It is preferred over entropy due to the ease of computation.
I will stick to entropy in this post.

![entropy function](https://upload.wikimedia.org/wikipedia/commons/2/22/Binary_entropy_plot.svg){:width="450px"}

> Figure 3. Binary entropy function. 

The decision boundary separates the data into two groups, let's call them
a and b. Then the entropy after splitting is given by 

$$EH = \sum_{i={a,b}}\frac{N_i}{N} H(p_i) $$

where $$p_a$$ is the percentage of white dots in group a,
$$N_a$$ is the number of data points (both black and white) in group a, 
$$N$$ is the total number of data points in both groups.
In other words, it is the average entropy of the two groups.

In practice, one only need to compute the entropy after splitting and 
pick the splitting condition that minimizes $$EH$$.

## why averaging over trees is a good idea

The biggest problem with decision tree is its instability, i.e., if the
training data changes a little bit due to noise and/or sampling, 
the decision boundaries may change a lot. 
Thus for any particular test data point, the predicted class
label is likely to change as a result of 

* including/excluding certain training data points (not necessarily outliers)
* changes of the branching rules
* constrains on the tree growth

In some sense, the decision 
tree model is similar to [k-nearest neighbor (KNN) model](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm): the former uses straight lines
parallel to the feature variable axis to partition the feature space 
whereas the latter uses Voronoi diagram to do the partition.
When k is small,  the KNN model overfits and the change in the training data significantly changes the model. 

Since it is hard to find one perfect decision tree, one obvious solution is
to average over many trees. This is actually the rationale for all the
[ensemble methods](https://en.wikipedia.org/wiki/Ensemble_learning). To see why it works, let's consider an artificial case
where all $$n$$ base classifiers (weak learner) 
have the same error $$\epsilon$$ 
and we combine their results via majority voting. 
The [voting classifier](http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.VotingClassifier.html) has error

$$\epsilon_{VC} = \sum_{k>\frac{n}{2}}^n\binom{n}{k}\epsilon^k(1-\epsilon)^{n-k}$$

In other words, it is wrong only when more than half of the base classifiers
are wrong. The numerical value of $$\epsilon_{VC}$$ for 11 and 51 base
classifier is shown in Figure 3.

![ensemble error](/assets/ensemble_error.png){:width="600px"}

> Figure 3. Error of the voting classifier. 

As you can see from Figure 3, as long as each base classifier does better
than random guess ($$\epsilon=0.5$$), the voting classifier can further
reduced the error. And when that happens, the more base classifiers the
better.

There is one underlying assumption in this error reduction though:

* the base classifiers should not be correlated

Otherwise there is no point averaging them. 
The ways of how to construct uncorrelated trees differentiate the later 
development such as bagging, boosting and random forest model.

## <a name='bag'></a> bagged trees

Bagging is short for bootstrap aggregating. 
As the name indicates, you first bootstrap then average over the results.

Well, what is bootstrap then?

### bootstrap

It is a resampling method that generates new dataset from original dataset
following the two rules

* sample with replacement
* keep sample size the same

For example, if our dataset is two balls in an urn, one black one red, then the bootstrap sample could be (black, black), (black, red) or (red, red).
Thus if we compare the bootstrap dataset to the original dataset, 
some data points would be excluded and some would have several copies.
If we run an unstable classifier on the bootstrap dataset, we are
almost guaranteed to get a somewhat different model: more uncorrelated
to the original one if the classifier is more unstable.

### why bagging works

Recall that in our case, bootstrap is done on the training data for fitting
new decision trees. 
Ideally, we want to get another independent training dataset. 
Or even better, obtain many 
more independent training datasets and train a decision tree on each of 
them, then average over the predictions of the trees.
You will probably agree that the averaged tree with extra training data
would perform better than any individual tree. But why would bagging
('fake' extra training data) help?

First, let's look at some fictitious plots. Let's assume that we have 
three base classifiers trained with different bootstrap datasets, 
each of which has 80% accuracy and we average over them (majority
vote). Note here I am imagining the data come from a generative model
and the 80% accuracy is with respect to the generative model (or you can
think of training + test data).

If the classifier is stable, the three base classifiers may agree on most
data, let's say 70% of them. In this case majority vote actually hurts!
We actually end up with worse accuracy for the voting classifier, see 
Figure 4 for an example.

<svg width='500' height='160'>
<rect x='0' y='0' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='55' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='110' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='0' width='400' height='50' fill='blue'/>
<rect x='0' y='55' width='350' height='50' fill='blue'/>
<rect x='400' y='55' width='50' height='50' fill='blue'/>
<rect x='0' y='110' width='350' height='50' fill='blue'/>
<rect x='450' y='110' width='50' height='50' fill='blue'/>
</svg>

> Figure 4. Voting classifier gets 70% accuracy even though the 3 base 
classifiers all have 80% accuracy.

On the other hand, if the classifier is unstable, the base classifiers
trained on bootstrap datasets may agree on only small portion of the data.
This is exactly when majority vote works: the voting committee is both
informed (better than random guess accuracy) and diverse (uncorrelated
from each other), see Figure 5 for an example. 

<svg width='500' height='160'>
<rect x='0' y='0' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='55' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='110' width='500' height='50' fill='none' stroke='black' stroke-width='1'/>
<rect x='0' y='0' width='400' height='50' fill='blue'/>
<rect x='100' y='55' width='400' height='50' fill='blue'/>
<rect x='0' y='110' width='200' height='50' fill='blue'/>
<rect x='300' y='110' width='200' height='50' fill='blue'/>
</svg>
> Figure 5. Voting classifier gets 100% accuracy even though the 3 base classifiers all have 80% accuracy.

As a summary, bagging does not always work. It only works for unstable 
classifiers when the classifiers trained on bootstrap data do not
agree too much. Thus the magic is partly in the classifiers and partly in 
the data itself.

One example is shown in Figure 6 where the data points follow Gaussian
distributions. The two Gaussians center at (1, 1) and (3, 1) and share
the same standard deviation 0.5. 
Ideally the decision boundary should be at $$x_1=2$$.
The code can be found [here](https://github.com/nosarthur/bagged-trees).

As you can see, one black dot is mingled to the white dot region and 
it strongly affects the decision tree result.
On the other hand, the bootstrap samples may not contain this 'outlier'
and thus provide less deviated decision boundaries.
In this case, the bagged trees classifier has much higher accuracy
than the decision tree classifier for the test data.

![two blobs](/assets/two_blobs.png){:width="400px"}

> Figure 6. Decision boundary of decision tree and bagged trees classifiers
for two Gaussian blobs centered at (1, 1) and (3, 1). 

## <a name='forest'></a> random forest

Two ideas are used in the random forest classifier:

* bagging
* random feature subsets for each tree

The second idea makes the individual trees less correlated to each other. 

## <a name='boost'></a> boosted trees

As you have seen in Figure 4 and 5, the voting classifier works 
when the base ones do not agree with each other on the same regions.
The technique of [boosting](https://en.wikipedia.org/wiki/Boosting_(machine_learning)) explicitly construct base classifiers to perform well on different data points.

The boosted trees classifier contains an iterative process to construct 
base classifiers. Typically the base classifiers are trees with depth one,
also called stumps. 

Two weights will be introduced 

* a weight $$w_i$$ at the iterative stage for focusing on the data points wrongly classified in the previous rounds 
* a weight $$\alpha_i$$ at the voting stage for focusing on the good base classifiers



## summary



