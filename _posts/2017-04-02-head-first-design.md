---
layout: post
title: Head First Design Patterns by Eric Freeman, Bert Bates, Kathy Sierra, and Elisabeth Robson
date:   2017-04-02 09:00:00 -0500
categories: [readings]
comments: true
tags: [coding]
---

This is the best design pattern book I have read so far. 
The examples are interesting (very down to earth, somewhat stupid, but I like them) and the writing is engaging. 
For me, the gang of four book is quite hard to read since the examples there are detailed and specialized (which don't really interest me).
This book on the other hand is not only informative but also fun to read.
I wish I wrote it.

<a target="_blank"  href="https://www.amazon.com/gp/product/0596007124/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596007124&linkCode=as2&tag=nosarthur2016-20&linkId=838fc3bf09c895e6b0e5592796cfc593"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0596007124&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0596007124" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## OO Basics

* abstraction
* encapsulation
* polymorphism
* inheritance

## OO Principles

* identify the aspects of your application that vary and separate them from what stays the same
* program to an interface (i.e., supertype), not an implementation
* favor composition over inheritance
* strive for loosely coupled designs between objects that interact
* classes should be open for extension, but closed for modification
* depend upon abstractions. Do not depend upon concrete classes
    * no variable should hold a reference to a concrete class
    * no class should derive from a concrete class
    * no method should override an implemented method of any of its base classes
* principle of least knowledge - talk only to your immediate friends
    * the object itself
    * objects passed in as a parameter to the method
    * any object the method creates or instantiates
    * any components of the object
* the Hollywood principle: don't call us, we'll call you
* a class should have only one reason to change
