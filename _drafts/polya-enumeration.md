---
layout: post
title: Polya enumeration theorem
date:   2017-08-21 03:43:08 -0500
categories: [math and physics]
comments: true
tags: [combinatorics, graph theory]
---

## introduction

[Polya enumeration theorem](https://en.wikipedia.org/wiki/P%C3%B3lya_enumeration_theorem) is a very powerful tool in combinatorics. The paradigm 
question it answers is:
**How many distinct necklaces can one make out of N black and M white beads?**

For example, suppose N=2 and M=2.
It's easy to see that there are only two possibilities, as shown in Figure 1.
When the number of beads gets large, it will be very tedious to enumerate them by brutal force.
And this post is all about neat book keeping tricks.

<svg width='350' height='140'> 
<circle cx='70' cy='70' r='50' fill='none' stroke='black' /> 
    <circle cx='120' cy='80' r='16' fill='white' stroke='black' /> 
    <circle cx='90' cy='115' r='16' fill='white' stroke='black' /> 
    <circle cx='50' cy='115' r='16' fill='black' stroke='black' /> 
    <circle cx='20' cy='80' r='16' fill='black' stroke='black' /> 
<circle cx='270' cy='70' r='50' fill='none' stroke='black' /> 
    <circle cx='320' cy='80' r='16' fill='white' stroke='black' /> 
    <circle cx='290' cy='115' r='16' fill='black' stroke='black' /> 
    <circle cx='250' cy='115' r='16' fill='white' stroke='black' /> 
    <circle cx='220' cy='80' r='16' fill='black' stroke='black' /> 
</svg>
> Figure 1. Two distinct necklaces with 2 black and 2 white beads.

Before we proceed to the tricks, I would like to point out a few random things.
The mathematician [George Polya](https://en.wikipedia.org/wiki/George_P%C3%B3lya) who discovered this enumeration theorem
has various important contributions to combinatorics, number theory, and probability theory.
One interesting and popular example is the [Polya urn model](https://en.wikipedia.org/wiki/P%C3%B3lya_urn_model), commonly known as 'the rich get richer'. 
He also wrote a popular book on problem solving called [How to solve it](https://en.wikipedia.org/wiki/How_to_Solve_It).
Also he lived up to 97 years of age.

<a target="_blank"  href="https://www.amazon.com/gp/product/069116407X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=069116407X&linkCode=as2&tag=nosarthur2016-20&linkId=da65865ac356f1c2db12e495df3f2fd9"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=069116407X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=069116407X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## preliminary attempts

There are two complications in our necklace counting problem:

* identical beads
* symmetry caused by the necklace

The former is quite easy to deal with.
In fact, if we ignore the necklace symmetry for now, elementary combinatorics would tell us that there are 

$$ \frac{4!}{2!2!} = 6 $$

ways to arrange the 2 black and 2 white beads. They are listed in Figure 2.
From now on I will draw the necklaces as squares because for four beads the symmetry group is 
[dihedral group](https://en.wikipedia.org/wiki/Dihedral_group) of order 4, i.e., $$D_4$$.

<svg width='520' height='280'> 
<rect x='20' y='20' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='20' cy='20' r='16' fill='white' stroke='black' /> 
    <circle cx='20' cy='100' r='16' fill='white' stroke='black' /> 
    <circle cx='100' cy='100' r='16' fill='black' stroke='black' /> 
    <circle cx='100' cy='20' r='16' fill='black' stroke='black' /> 
<rect x='140' y='20' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='140' cy='20' r='16' fill='white' stroke='black' /> 
    <circle cx='140' cy='100' r='16' fill='black' stroke='black' /> 
    <circle cx='220' cy='100' r='16' fill='black' stroke='black' /> 
    <circle cx='220' cy='20' r='16' fill='white' stroke='black' /> 
<rect x='260' y='20' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='260' cy='20' r='16' fill='black' stroke='black' /> 
    <circle cx='260' cy='100' r='16' fill='black' stroke='black' /> 
    <circle cx='340' cy='100' r='16' fill='white' stroke='black' /> 
    <circle cx='340' cy='20' r='16' fill='white' stroke='black' /> 
<rect x='380' y='20' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='380' cy='20' r='16' fill='black' stroke='black' /> 
    <circle cx='380' cy='100' r='16' fill='white' stroke='black' /> 
    <circle cx='460' cy='100' r='16' fill='white' stroke='black' /> 
    <circle cx='460' cy='20' r='16' fill='black' stroke='black' /> 

<rect x='140' y='140' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='140' cy='140' r='16' fill='white' stroke='black' /> 
    <circle cx='140' cy='220' r='16' fill='black' stroke='black' /> 
    <circle cx='220' cy='220' r='16' fill='white' stroke='black' /> 
    <circle cx='220' cy='140' r='16' fill='black' stroke='black' /> 
<rect x='20' y='140' width='80' height='80' fill='none' stroke='black' /> 
    <circle cx='20' cy='140' r='16' fill='black' stroke='black' /> 
    <circle cx='20' cy='220' r='16' fill='white' stroke='black' /> 
    <circle cx='100' cy='220' r='16' fill='black' stroke='black' /> 
    <circle cx='100' cy='140' r='16' fill='white' stroke='black' /> 
</svg>
> Figure 2. Six different ways to arrange 2 black and 2 white beads without considering $$D_4$$ symmetry.
The first and second rows are two different orbits.

There are 8 elements in $$D_4$$

$$D_4 = \{R_0, R_{90}, R_{180}, R_{270}, H, V, D_1, D_2 \}$$

where $$R_\theta$$ is rotation with $$\theta$$ degrees (say clockwise), $$H$$ and $$V$$ are horizontal and vertical flips,
$$D_{1,2}$$ are diagonal flips. Specifically, let's assume $$D_1$$ flips around the line connecting the two white balls in the first necklace in the second row.
Note also that $$R_0$$ is identity.

From Figure 2, we can see that the 4 necklaces in the first row are equivalent
to each other under the symmetry of $$D_4$$ and the 2 necklaces in the second row are equivalent.
Thus there are only two distinct necklaces with the given beads.
These equivalent necklaces are examples of [orbits](https://en.wikipedia.org/wiki/Group_action#Orbits_and_stabilizers) in group theory.

As a summary, what we did in this section is to first explore the identical bead condition to limit the $$4!=24$$ possible necklaces to 6.
Then check their equivalence by hand.
This approach is not practical when the number of beads gets large.

## the magic

To demonstrate the power of Polya enumerate theorem, let me first show you the procedure to get that answer of 2 for our necklace counting problem.

Each group is associated with a polynomial called [cycle index](https://en.wikipedia.org/wiki/Cycle_index),
which is basically a fingerprint of the group in terms of how its individual element generates cycles (more details will be given in the next section).
The cycle index of many famous groups are known. Even if it is unknown for a group, its calculation is very easy albeit somewhat tedious.
For $$D_4$$ it is given by 

$$Z_{D_4}(x_1,x_2,x_3,x_4) = \frac{z_1^4 + 2z_1^2z_2 + 3z_2^2 + 2z_4}{8} $$

Now we make the substitution 

$$z_1\rightarrow B+W, z_2\rightarrow B^2+W^2, z_4\rightarrow B^4 + W^4$$

where $$B$$ and $$W$$ denote the color of the bead. After simplification, the polynomial becomes

$$B^4 + B^3W + 2B^2W^2 + BW^3 + W^4$$

and the coefficient of $$B^2W^2$$, i.e., 2, is the number of distinct necklaces with 2 black beads and 2 white beads.
Similarly, the coefficients of other terms are the number of distinct necklaces with the corresponding beads.
Also, if we set $$B=W=1$$, then the polynomial evaluates to $$6$$, which is the number of distinct necklaces with four beads of two colors.
Furthermore, if we set $$z_1=z_2=z_4=n$$, then the polynomial evaluates to the number of distinct necklaces with four beads of $$n$$ colors.

I was quite shocked when I first learned this.

## the details

In this section, I will try to explain why the previous magic works. Basic familarity with group theory is assumed.
For example, you should know what [coset](https://en.wikipedia.org/wiki/Coset) is.

The following three concepts are essential for Polya enumeration theorem.
We assume there is a set $$X$$, and a group $$G$$ that acts on it.

* **orbit**: the set of set elements reachable by the group action, i.e., <span>$$orb_G(x)=\{g(x)|g\in G\}$$</span>. For example, the two rows in Fig. 2 are two orbits.
* **stabilizer**: the set of group elements that stabilize a particular set element, i.e., <span>$$stab_G(x)=\{g\in G|g(x)=x\}$$</span>.
* **fixed points**: the set of set elements that are stabilized by a particular group element, i.e., <span>$$fix_X(g)=\{x\in X|g(x)=x\}$$</span>.

To be concrete, in our necklace example in Fig. 1,
let's call the necklaces in the first row $$a_i$$, and the ones in the second row $$b_i$$. 
Then some of the stabilizers and fixed points are as follows

$$stab_G(a_1)=\{R_0, H\}, stab_G(a_2)=\{R_0, V\}, stab_G(b_1)=\{R_0, R_{180},D_1, D_2\}\\
fix_X(R_{90})=\varnothing, fix_X(H)=\{a_1,a_3\}, fix_X(D_1) = \{b_1, b_2\}
$$

If you take the trouble to work out all the stabilizers for each necklace in Fig. 1, 
there is a pattern: all $$a_i$$ have 2 stabilizers, and all $$b_i$$ have 4 stabilizers. 
Also note $$D_3$$ has 8 elements. It turns out all these observations are no coincidence. 
There is a so-called orbit-stabilizer theorem which states:

$$|G| = |orb_G(x)| |stab_G(x)|, \forall x \in X$$

To prove it, notice that $$stab_G(x)$$ is a subgroup of $$G$$.
Then all we need to do is to show **the existence of a one-to-one correspondence between the orbit of $$x$$ and the left cosets of $$stab_G(x)$$**.
Such a mapping can be written as $$ \phi: orb_G(x) \rightarrow G/stab_G(x)$$
and 

$$ \phi(g(x)) = g * stab_G(x)$$

where $$*$$ denotes the operation between group elements. I will omit it as long as it's not confusing.
The proof then has three parts, i.e., $$\phi$$ needs to be

* well-defined
* injective
* surjective

For $$\phi$$ to be well-defined, we need to show that for $$g, h\in G$$, 
if $$g(x)=h(x)$$, then $$\phi(g(x))=\phi(h(x))$$,
i.e., same input should give same output.
Note that the assumption immediately tells us that $$h^{-1}g\in stab_G(x)$$, thus $$h^{-1}g * stab_G(x) = stab_G(x)$$, which gives the desired result.

For $$\phi$$ to be injective, we need to show that if $$\phi(g(x))=\phi(h(x))$$, then $$g(x)=h(x)$$.
This proof is essentially the same as the well-defineness proof.

Finally, the surjectiveness of $$\phi$$ is obvious.

I find the orbit-stabilizer therorem quite neat because set $$X$$ has nothing to do with $$G$$, but still any element of it can be used to partition $$G$$.
Furthermore, set elements in the same orbit have the same number of stabilizers.

With these terminologies, our necklace counting problem can be stated as:
**given a group G (symmetry, equivalence criterion) acting on a set X (beads), how many different orbits (necklaces) are there?**

In fact, orbit-stabilizer theorem is powerful enough to answer this question.
To get the number of orbits, we need to utilize an auxiliary quantity:
the total number of (stabilizer, fixed point) pairs.
There are two ways to count it, either from the stabilizers or from the fixed points.
The results should agree, i.e.,

$$ \sum_{x\in X}|stab_G(x)| = \sum_{g\in G}|fix_X(g)|$$

Since orbits partition the set, the first summation can be broken down as

$$\sum_{o \in orbits}\sum_{x\in o}|stab_G(x)| = \sum_{o \in orbits}|G|$$

Thus we have 

$$\text{# of orbits} = \frac{1}{|G|} \sum_{g\in G}|fix_X(g)|$$

This is known as [Burnside's lemma](https://en.wikipedia.org/wiki/Burnside%27s_lemma).
There are still a lot of work involved in Burnside's lemma in the fixed points calculation.

<svg width='120' height='130'> 
<rect x='20' y='20' width='80' height='80' fill='none' stroke='black' /> 
<text x='20' y='15'> 4</text>
<text x='90' y='15'> 1</text>
<text x='20' y='115'> 3</text>
<text x='90' y='115'> 2</text>
<line x1='10' y1='10' x2='110' y2='110' stroke-dasharray='5, 5' stroke='black' />
</svg>
> Figure 3. Labeling of the bead positions and the diagonal flip $$D_2$$ axis.


$$
R_0: (1)(2)(3)(4) \rightarrow z_1^4\\
D_2: (13)(2)(4) \rightarrow z^2_1z_2\\
R_{90}: (1432) \rightarrow z_4 \\
R_{180}: (13)(24) \rightarrow z_2^2
$$

Weighted version of [Burnside’s Lemma](https://en.wikipedia.org/wiki/Burnside%27s_lemma) can be used.


$$(x+y)^2 = x^2 + xy + yx + y^2$$


