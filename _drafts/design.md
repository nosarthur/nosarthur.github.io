---
layout: post
title: Design pattern by Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides
date:   2016-12-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [design]
---

As I write more and more code, the necessity of principles becomes apparent.
At high level, I find [Zen of Python](https://www.python.org/dev/peps/pep-0020/) quite pleasing. To learn more practical aspects, I got this book.

<a target="_blank"  href="https://www.amazon.com/gp/product/0201633612/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0201633612&linkCode=as2&tag=nosarthur2016-20&linkId=578b21eb39dee41c6f6f743aec13b1d9"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0201633612&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0201633612" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

On Amazon, it has the ranking of 

* #1 in Books > Computers & Technology > Computer Science > AI & Machine Learning > Computer Vision & Pattern Recognition
* #1 in Books > Computers & Technology > Programming > Software Design, Testing & Engineering > Software Reuse
* #2 in Books > Textbooks > Computer Science > Object-Oriented Software Design

principles of object-oriented design

* Program to an interface, not an implementation.
* Favor object composition over class inheritance.

causes of redesign

* Creating an object by specifying a class explicitly
* Dependence on specific operations
* Dependence on hardware and software platform
* Dependence on object representations or implementations
* Algorithmic dependencies
* Tight coupling
* Extending functionality by subclassing 
* Inability to alter classes conveniently

Here are some interesting quotes from it

* One thing expert designers know not to do is solve every problem from first principles.
* The choice of programming language is important because it influences one's point of view.
* Favoring object composition over class inheritance helps you keep each class encapsulated and focused on one task.
* The main advantage of delegation is that it makes it easy to compose behaviors at run-time and to change the way they're composed.
* A design pattern should only be applied when the flexibility it affords is actually needed.
* Encapsulate the concept that varies.

The design patterns are summarized in the following table

<style>
table td, table td * {
    vertical-align: top;
}
</style>
<table>
  <tr>
    <td colspan="2"></td>
    <td colspan="3">Purpose</td>
  </tr>
  <tr>
    <td colspan="2"></td>
    <td>Creational</td>
    <td>Structural</td>
    <td>Behavioral</td>
  </tr>
  <tr>
    <td rowspan="11">Scope</td>
    <td>Class</td>
    <td>Factory Method</td>
    <td>Adapter</td>
    <td>Interpreter<br> Template Method</td>
  </tr>
  <tr>
    <td>Object</td>
    <td>Abstract Factory<br>Builder<br>Prototype<br>Singleton</td>
	<td>Adapter<br>Bridge<br>Composite<br>Decorator<br>Facade<br>Flyweight<br>Proxy</td>
	<td>Chain of Responsibility<br>Command<br>Iterator<br>Mediator<br>Memento<br>Observer<br>State<br>Strategy<br>Visitor</td>
  </tr>
</table>

* Abstract Factory: Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
* Adapter: Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
* Bridge: Decouple an abstraction from its implementation so that the two can vary independently.
* Builder: Separate the construction of a complex object from its representation so that the same construction process can create different representations.
* Chain of Responsibility: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.
* Command: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
* Composite: Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
* Decorator: Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
* Facade: Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
* Factory Method: Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
* Flyweight: Use sharing to support large numbers of fine-grained objects efficiently. 
* Interpreter: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
* Iterator: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
* Mediator: Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.
* Memento: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.* Observer: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. 
* Proxy: Provide a surrogate or placeholder for another object to control access to it.
* Singleton: Ensure a class only has one instance, and provide a global point of access to it.
* State: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
* Strategy: Define a family of algorithms, encapsulate each one, and make them interchaneable. Strategy lets the algorithm vary independently from clients that use it.
* Template Method: Define the skeleton af an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
* Visitor: Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

