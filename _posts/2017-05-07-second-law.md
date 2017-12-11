---
layout: post
title: Second law of thermodynamics
date:   2017-05-07 16:43:08 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

For some reason, the second law of thermodynamics is commonly known as "**entropy does not decrease**".
In my opinion, it is a bad way to understand what's going on because entropy is a somewhat abstract concept and it's not immediately clear why it tends to increase even after equating entropy to complexity
(my messy room does become tidy after I clean it and I am part of the universe). 
Also see [this post for an explanation of entropy]({% post_url 2016-12-30-entropy %}) if interested. 

On the other hand, historically the second law has very clean physical meanings: **perpetual engine (of the second kind) is not possible**.

I don't know why this clean formulation gradually gives way to the entropy formulation. In this post, I will explain this clean way,
following closely to Fermi's book

<a target="_blank"  href="https://www.amazon.com/gp/product/048660361X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=048660361X&linkCode=as2&tag=nosarthur2016-20&linkId=c6b0375762f9be271aab01a2f0d0cd23"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=048660361X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=048660361X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## second law in terms of engines

There are many different ways to formulate [the second law of thermodynamics](https://en.wikipedia.org/wiki/Second_law_of_thermodynamics) in terms of (perpetual) engines. The common form is that if the engine goes around a cycle, i.e., it somehow goes back to its initial state, then certain scenarios are impossible otherwise we have perpetual engine. For example, 

* if the engine is only in contact with one heat source, then it's impossible to convert heat to work ([Lord Kelvin](https://en.wikipedia.org/wiki/William_Thomson,_1st_Baron_Kelvin)'s formulation)
* if the engine is in contact with two heat sources, then it's impossible to conduct heat from the low temperature source to the high temperature source ([Clausius](https://en.wikipedia.org/wiki/Rudolf_Clausius)'s formulation)

Both statements are quite intuitive (have you ever seen a perpetual machine or heat conduction from cold object to hot object?). 
However, it may be a bit unclear how Clausius's formulation relates to perpetual engine. According to the first law of thermodynamics, 

$$\Delta U = \Delta Q - W$$

For a cyclic process, $$\Delta U=0$$ thus 

$$W = \Delta Q = Q_1 + Q_2$$

where our sign convention is that $$W$$ is the work done by the engine, $$Q_i$$ is the heat absorption of the engine from heat source $$i$$ at temperature $$T_i$$.
Thus as long as there is net heat transfer between the two heat sources (1 to 2 or 2 to 1), work can be done $$W>0$$.
Note that Clausius's formulation is not against the possibility of work being done for a cyclic process ([Carnot cycle](https://en.wikipedia.org/wiki/Carnot_cycle) for example), but against the possibility of net heat transfer from cold heat source to hot heat source.

There are two natural questions at this point

* What is a perpetual engine (of the second kind) anyways? Why is Carnot engine not considered as perpetual machine?
* What's wrong with heat transfer from cold object to hot object (maybe we just haven't had enough life experience to observe one yet)?

These two questions are basically the same question. The short answer is:

* perpetual machine of the second kind is defined as the negation of Lord Kevin's formulation
* Clausius' formulation is equivalent to Lord Kevin's formulation.

To show their equivalence, let's first show some useful facts using Clausius' formulation. 
Suppose we have two engines, both working between two heat sources 1 and 2, and both are not refrigerators, i.e., $$W>0$$ and $$W'>0$$.
Here we use primed and un-primed letters to distinguish the two. Then

1. $$Q_1 Q_2 < 0$$, i.e., there is indirect heat transfer between the two heat sources via the engine
1. assuming $$Q_1<0$$, then $$Q_1'<0$$ as well
1. assuming the un-primed engine is reversible and the primed one is not, then $$\frac{Q_2}{-Q_1}> \frac{Q_2'}{-Q_1'}$$
1. $$\frac{Q_2}{Q_1} = \frac{Q_2'}{Q_1'}$$ if both engines are reversible

**Proof for 1**: Let's focus on one engine.
Since $$W=Q_1+Q_2>0$$, there are only two possibilities for the signs of $$Q_1$$ and $$Q_2$$:
either $$Q_1Q_2<0$$ or $$Q_1>0, Q_2>0$$. 
The first fact says that engines have to absorb heat from one source and release heat to the other source,
they cannot absorb heat from both sources.
The problem with absorbing heat from both sources is that we can place the two sources in thermal contact such that either $$Q_1>0$$ or $$Q_2>0$$ heat is transferred between them. As a result of the combined process of engine cycle and direct thermal conduction, work is done and effectively only one heat source is involved, violating Lord Kevin's formulation.

**Proof for 2**: For the sake of argument, let's say $$Q_2>0$$ and $$Q_1<0$$ from now on, i.e., the engine absorbs heat from heat source 2 and release heat to heat source 1.
Common sense would tell us that heat source 2 has higher temperature than heat source 1, although we don't really exploit this prior information here.
Given this convention, the second engine has to have $$Q_2'>0$$ and $$Q_1'<0$$ as well.
Otherwise we can combine the two engines with the correct number of cycles such that effectively the combined engine is in contact with only one heat source and is able to do work, violating Lord Kevin's formulation.

The correct number of cycles is 

$$ \frac{Q_2}{-Q_2'} = \frac{N'}{N}$$

where the scenario is $$Q_2>0$$ and $$Q_2'<0$$,
and the intention is to have both $$N$$ and $$N'$$ integers such that they represent number of cycles.
Even in the case of irrational heat ratio, we can have $$N$$ and $$N'$$ large enough so that the heat ratio is approximated well enough to any given accuracy.

**Proof for 3**: For now let's assume the un-primed engine is reversible and the primed one is not.
The proof is basically the same as proof 2. Since the un-primed engine is reversible, we can reverse it (into a refrigerator) and make a combined engine with the correct number of cycles such that the combined engine is in contact with only one heat source.
In this scenario, $$Q_2<0$$ and $$Q_1>0$$ and the un-primed engine is a refrigerator.

The correct number of cycles is 

$$ \frac{-Q_2}{Q_2'} = \frac{N'}{N}$$

and the total work done by the combined engine is 

$$ NQ_1 + N'Q_1' = N\left(Q_1 + \frac{-Q_2}{Q_2'}Q_1'\right)$$ 

This total work has to be non-positive otherwise we violate Lord Kevin's formulation. We thus get the desired inequality.

**Proof for 4**: If two engines are both reversible, then we can reverse either one of them and get two inequalities as in part 3, with both $$\ge$$
and $$\le$$ signs. Thus we get the desired equality.

The efficiency of an engine can be defined as 

$$\eta = \frac{W}{Q_2} = 1 - \frac{|Q_1|}{Q_2} < 1$$

Thus fact 3 and 4 tell us that all reversible engines have the same efficiency, which is higher than the efficiency of irreversible ones.
This is the [Anna Karenina principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle) for engines: reversible engines are all alike, irreversible ones are less efficient in their own ways.

Notice that these four facts are derived from Lord Kevin's formulation of the second law without direct involvement of temperature.
For the first two facts, however, common sense would tell us that $$Q_2$$ (the positive one) is with respect to the higher temperature heat source.
Indeed, it is possible to show that for reversible engines, 

$$ \frac{Q_2}{-Q_1} = \frac{T_2}{T_1}$$

Thus $$\eta > 0$$ gives rise to $$T_2 > T_1$$, i.e., **all reversible engines (the one that output work $$W>0$$) working between two heat sources absorb heat from the higher temperature source  and release heat to the low temperature source**.
The proof of the equality is omitted here due to its complications,
which is related to what temperature is. 

With this equality, it's easy to show that violating the Clausius formulation would violate Lord Kevin's formulation.
I will leave it to you as an exercise.

## second law in terms of entropy

For irreversible engines, the previous equality becomes

$$ \frac{Q_2}{-Q_1} < \frac{T_2}{T_1}$$

which is a direct result of fact 3.
Rearranging them, we get

$$ \frac{Q_2}{T_2} + \frac{Q_1}{T_1} \le 0$$ 

where the equality sign holds for reversible engines.
Generalizing it for more heat sources, or even continuous distribution of them, we have 

$$\sum_i \frac{Q_i}{T_i} \rightarrow \oint\frac{dQ}{T} \le 0$$

where $$dQ$$ is the infinitesimal heat absorbed by the engine from the heat source at temperature $$T$$.
Recall that we have been discussing cyclic processes all along, thus $$\oint$$ is used to remind us that the engine goes back to its starting state in the end.
Again the equality sign holds only for reversible engines.
Calculus then tells us that it will be convenient to define a new quantity, i.e., the entropy, as a state function

$$\Delta S = S_b - S_a = \int_a^b \frac{dQ}{T}$$

where a and b are the starting and ending states of the engine. For an isolated system, $$dQ=0$$, thus

$$\Delta S \ge 0$$

which is the commonly known "entropy never decreases" statement.

