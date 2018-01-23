---
layout: post
title: coroutine
date:   2018-12-12 13:43:08 -0500
categories: [coding]
comments: true
---


pipeline, event driven

distributed system



* generator: produce values
* coroutine: consume values `.send()`

The 'bad' part of generator is that there is no control over the destination of its output
control is given back to the caller of the `next`

On the other hand, coroutine does not know where the input come from,
but it knows where the output goes.
control is given back to the caller of `send`


* how to write test for coroutines


* `yield` suspends
* `send` resumes
* `close` terminates

`yield` suspends for the generator as a statement and coroutine as an expression.

David Beazley has a trilogy on 

* [Generator tricks for systems programmers](http://www.dabeaz.com/generators-uk/)
* [coroutine PyCon2009](https://www.youtube.com/watch?v=Z_OAlIhXziw)
* [Generators: The Final Frontier PyCon2014](https://www.youtube.com/watch?v=D1twn9kLmYg)
