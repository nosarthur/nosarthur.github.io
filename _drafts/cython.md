---
layout: post
title: Cython
date: 2018-10-15 10:00:00 -0500
categories: [coding]
comments: true
tags: [python]
---

Back in the school days, I usually follow two steps for my projects

* prototype with Matlab/octave
* if speed is of concern, rewrite with C/C++, possibly calling out the Fortran LAPACK library

At that time (~2007), Numpy was quite buggy comparing to Matlab so it wasn't my choice.

For example, there is a nice quantum optics library called [QuTiP](http://qutip.org).

There are two main usage of Cython

* wrap C/C++ code
* speed up Python code

* accessing C variables is faster than accessing Python variables
* calling C functions is faster than calling Python functions



To install Cython, simply type in the terminal
```
pip3 install Cython
```

The version I installed is 0.27.3


* [Cython tutorial](http://docs.cython.org/en/latest/src/tutorial/cython_tutorial.html)
* [Cython language basics](http://docs.cython.org/en/latest/src/userguide/language_basics.html)
