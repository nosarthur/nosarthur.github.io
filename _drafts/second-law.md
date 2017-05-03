---
layout: post
title: second law of thermodynamics
date:   2017-05-14 23:43:08 -0500
categories: [math and physics]
comments: true
tags: [thermodynamics]
---

For some reason, the second law of thermodynamics is commonly known as "**entropy does not decrease**".
In my opinion, it is a bad way to understand what's going on because entropy is a somewhat abstract concept and it's not immediately clear why it tends to increase even if we equate entropy to complexity (my messy room does become tidy after I clean it and I am part of the universe). 

On the other hand, historically the second law have very clean physical meanings: **perpetual engine (of the second kind) is not possible**.

I don't know why this clean formulation gradually gives way to the entropy formulation. In this post, I will explain how this clean way works.

## second law in terms of engines

There are many different ways to formulate [the second law of thermodynamics](https://en.wikipedia.org/wiki/Second_law_of_thermodynamics) in terms of (perpetual) engines. The shortcut is that if the engine goes around a cycle, i.e., it somehow goes back to its initial state, then certain scenarios are impossible otherwise we have perpetual engine. For example, 

* if the engine is only in contact with one heat source, then it's impossible to convert heat to work ([Lord Kelvin](https://en.wikipedia.org/wiki/William_Thomson,_1st_Baron_Kelvin)'s formulation)
* if the engine is in contact with two heat sources, then it's impossible to conduct heat from the low temperature source to the high temperature source ([Clausius](https://en.wikipedia.org/wiki/Rudolf_Clausius)'s formulation)

Both statements are quite intuitive (do you see heat conduction from cold object to hot object?). 
However, it may be a bit unclear how Clausius's formulation relates to perpetual engine. According to the first law of thermodynamics, 

$$\Delta U = \Delta Q - W$$

For a cyclic process, $$\Delta U=0$$ thus 

$$W = \Delta Q = Q_1 + Q_2$$

where our sign convention is that $$W$$ is the work done by the engine, $$Q_i$$ is the heat absorption of the engine from heat source $$i$$ at temperature $$T_i$$.
Thus as long as there is heat transfer between the two heat sources (1 to 2 or 2 to 1), work can be done $$W>0$$.
The essence of the Clausius's formulation is not against the possibility of work being done for a cyclic process ([Carnot cycle](https://en.wikipedia.org/wiki/Carnot_cycle) is an example), but against the possibility of net heat transfer from cold heat source to hot heat source.

There are two natural questions at this point

* What is a perpetual engine (of the second kind) anyways? Why is Carnot engine not considered perpetual machine?
* What's wrong with heat transfer from code object to hot object (maybe we just haven't had enough life experience to observe one yet)?

These two questions are basically the same question: perpetual machine is defined as the negation of Lord Kevin's formulation and Clausius' formulation is equivalent to Lord Kevin's formulation.

To show their equivalence, let's first show some useful facts using Lord Kevin's formulation. 
Suppose we have two engines, both working between two heat sources 1 and 2, and both are not refrigerators, i.e., $$W>0$$ and $$W'>0$$.
Here we use primed and un-primed letters to distinguish the two. Then

* $$Q_1 Q_2 < 0$$
* $$\frac{Q_2}{|Q_1|} \ge \frac{Q_2'}{|Q_1'|}$$ if the un-primed engine is reversible and the primed one is not 
* $$\frac{Q_2}{Q_1} = \frac{Q_2'}{Q_1'}$$ if both engines are reversible

Since $$W=Q_1+Q_2>0$$, there are only two possibilities for the signs of $$Q_1$$ and $$Q_2$$: $$Q_1Q_2<0$$ and $$Q_1>0, Q_2>0$$. 
The first fact says engines have to absorb heat from one source and release heat to the other source,
they cannot absorb heat from both sources.
The problem with absorbing heat from both sources is that we can place the two sources in thermal contact such that either $$Q_1>0$$ or $$Q_2>0$$ heat has been transferred between them. As a result of the combined process of engine cycle and direct thermal conduction, work is done and only one heat source is involved, violating Lord Kevin's formulation.

For the sake of argument, let's say $$Q_2>0$$ and $$Q_1<0$$ from now on.

The efficiency of an engine can be defined as 

$$\eta = \frac{W}{Q_2} = 1 - \frac{|Q_1|}{Q_2} < 1$$

This is the [Anna Karenina principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle) for engines: reversible engines are all alike, irreversible ones are less efficient in their own ways.

## entropy
