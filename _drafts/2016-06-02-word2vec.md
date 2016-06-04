---
layout: post
title:  Turn words into vectors
date:   2016-06-02 20:00:00 -0500
categories: [machine learning]
comments: true
tags: [word embedding]
---

Numbers are easier to deal with than texts for computers. 
A good numerical representation for words is of great importance for further linguistic analysis. 
In this post I will summarize the different approaches to obtaining
numerical representations of words.

To make the discussion concrete, let us assume that 
our text $$\mathbf w$$ contains $$N_T$$ words with vocabulary
$$V$$,
i.e., there are $$N_V$$ unique words in this text. 
The text $$\mathbf w$$ is also known as corpus. 
And the goal is to find a vector $$u_w\in\mathbb R^d$$ for each
word $$w\in V$$.
Note $$N_T>N_V$$ due to repeated words and we would like to 
have $$d\le N_V$$ or even $$d\ll N_V$$. 
For practical applications, both $$N_T$$ and $$N_V$$ can be 
large (think of $$N_V$$ as thousands and $$N_T$$ as millions).
According to [Wikipedia][wiki], a native English speaker knows about 
10,000 words and mastering 3000 words is necessary for 
a non-native speaker. 
According to [Steven Pinker][Pinker], 
a typical high school graduate has a vocabulary of 60,000 words.

## One-hot vectors
The most straightforward word representation is the so-called 
one-hot representation. Here all words live in the $$N_V$$ 
dimensional 
space and every one of them is a unit vector along the axes. 
These one-hot vectors are not particularly useful since 
all semantic information is eliminated. 
The only information left is that the vocabularies are 
different from each other.
In terms of cosine similarity, they are not similar to each other
at all.

## Distributional vectors

A better representation built on the one-hot vectors is the 
distributional vector representation.
Here the idea is that a word is characterized by the words near it, 
just like a person is somewhat characterized by his or her friends.
The neighborhood of a word is called its context and is defined
as a window near the word. 

To analyze the context, one can either do statistics of the word
co-occurrence in the context (latent semantic analysis) or 
use neural network to train the context (neural probabilistic language
model). The former is known as count-based model and the latter
predictive model.

A very simple count-based model can work as follows. 
For each word $$w_k$$, calculate the probability
of all the words in its context. Then use these probabilities to
form a $$N_V$$ dimensional vector $$u_{w_k}$$, that is 
$$u_{w_k}\cdot i_{w_i} = P(w_i\in \text{context}(w_k))$$ where
$$i_{w_i}$$ is the one-hot vector of $$w_i$$. 
Although this model completely disregards word ordering, 
the vectors $$u_{w_k}$$ still encode some semantic 
similarities between words into their spatial distances. 
To reduce the dimensionality of this representation, one can then
apply principal component analysis (PCA). 

To understand the predictive models, we need to know a bit more
about probabilistic language model.

### The probabilistic language model

The probabilistic language model aims to assign probabilities to 
sentences (sequences of words), i.e., 
$$P(\mathbf w)\equiv P(w_1, w_2,\ldots, w_n)$$.
According to the chain rule of probability

$$
P(w_1, w_2, \ldots, w_t) = \Pi_{i=1}^t P(w_i|w_1, w_2, \ldots, w_{i-1})
$$

Thus the purpose is equally served if we can assign all the 
conditional probabilities.
Here $$t$$ is the number of words in a sentence. 
Note in this setup, it is very natual to take word ordering into 
account. 

Given a text with many sentences, one can calculate all the 
conditional probabilities. However, as the sentence gets longer, 
there are too many combinations of the words thus the 
computational burden becomes huge. Furthermore the text might not 
be long enough to provide good statistics of these conditional 
probabilities with long sentences. 
As a result, such brutal force approach is almost never used. 

#### The N-gram model

One famous example of the count-based language model is the 
N-gram model. It was proposed in the 80's and it approximates
the conditional probabilities with long sentences with that with
short sentences. It basically assumes that words in the far past
do not affect the probability of current word.
If only the last $$N-1$$ words need to be considered, 
the corresponding model is called N-gram model. 



#### Perplexity 

$$
PP(W) = P(W)^{\frac{1}{N}}
$$

lower peplexity is better model

#### Laplace smoothing



The more recent trend is called word embedding. Here  instead of V dimensional vectors, lower dimensional vectors are used (think of a few hundred). 

word embedding is one of the few successful unsupervised learning.

semantic similarity
analogy
The analogy is encoded in the difference between vectors. The famous example is king-man+woman=queen.

paragraph vector


## Resources:
* [Neural net language models][model] by Yoshua Bengio
* RADIM ŘEHŮŘEK's word2vec [tutorial][tutorial] 
* gensim word2vec [page][gensim]
* TensorFlow's word2vec [tutorial][tf]
* python nltk [book][book]

## Notes:
* To use word2vec in gensim, make sure Cython is installed. It helps with speed.

[tutorial]: http://rare-technologies.com/word2vec-tutorial/
[gensim]: https://radimrehurek.com/gensim/models/word2vec.html
[book]: http://www.nltk.org/book/
[wiki]: https://en.wikipedia.org/wiki/Vocabulary#Native-language_vocabulary_size
[Pinker]: https://www.youtube.com/watch?v=Q-B_ONJIEcE
[tf]: https://www.tensorflow.org/versions/r0.8/tutorials/word2vec/index.html
[model]: http://www.scholarpedia.org/article/Neural_net_language_models
[off]: http://www.offconvex.org/2016/02/14/word-embeddings-2/
