---
layout: post
title: A crash course on python
date:   2016-08-12 13:43:08 -0500
categories: [coding]
comments: true
tags: [python]
---

## Introduction

This is a quick-and-dirty tutorial of the python programming language. 
With prior programming experience, you will learn from this post to 

* write basics python code
* identify some common gotchas

The material contains small code examples with explanations, 
which are not systematic or comprehensive. 
All examples run in python 2.7.

### the motivation
When learning a new topic, I always get frustrated with books/tutorials.
The problem is that book/tutorial usually assumes no prior knowledge 
whereas I have some. As a result, I ended up wasting time
filtering information here and there. 

If you already know some other programming language, then learning python
should be very easy. It will be a waste of time to read a thick book.
However, without some readings, you will probably hit into some gotchas.

Thus I organized this material to get you started quickly with exposition of the common gotchas.

### about you

Familiarity with other programming language is assumed. Ideally, you should know C/C++ or Matlab. 

You probably want to install [iPython](https://en.wikipedia.org/wiki/IPython) which is an interactive environment to run python programs and test out codes.

## Basic facts

These facts may be too dry for the first read,
you can come back to them after going over the examples.

In python, everything is an object (instance of a class), 
including the built-in data types and even functions.

The basic data types include

* `None`
* boolean
* integer
* float
* sequence 
    * **list** `[]`
    * tuple `()`
    * string `""` or `''`
* **dictionary**  `{}`

`None` is a special type that serves the purpose of null.

The ones in bold face are **mutable** data types,
and the rest are **immutable**. In python, this mutability refers to whether
the memory associated with a variable name can be modified directly.
You will see how they differ in later examples.

The sequence data types can host multiple elements in an ordered sequence.
Two operations are supported to access the elements

* indexing: access single element
* slicing: access a sub-sequence

The ordering makes the sequence data type **iterable**.
Python has special support for the iterable data types.
For example, you can 

* use the keyword `in` to test membership
* use the built-in function `iter()` to generate iterators to loop over the sequence more efficiently


Dictionaries map keys to values and are implemented as hash maps.

Finally, there are some features to save typing

* `;` is not needed at the end of line.
* Parentheses are not needed for the logic test in looping and conditional statement.
* Unlike other languages where curly braces are used to define code blocks,
python uses indentation and `:`. There are five cases where code blocks are
necessary:
    * conditional statement: `if`, `else`, `elif`
    * looping statement: `while`, `for`
    * function definition: `def` 
    * class definition: `class`
    * error handling: `try`, `except`, `finally`

## Code examples

```python
a = 0.8
a.is_integer()
```
* Everything is an object of some class. Even the simple data types.
* You can use `dir()` to see the member methods of an object.

```python
a = (0, 1, 2, 3)
print(a[0])
print a[-1]
print a[1:3]
```
* Here `a` is a built-in data type `tuple`. It is **iterable** (can be looped over) and **immutable** (cannot be modified). 
* Python index is zero-based.
* Negative index means indexing from the back. `-1` refers to the last element.
* `a[1:3]` is a slicing. It returns the elements from index 1 to 2 (the last element, i.e., 3, is excluded since python uses half-open interval convention).
* In python 3, you have to use `print()` with the parentheses.

```python
a = [23, 73, 81, 99]
for i in range(len(a)):
    print(a[i])
for i in xrange(len(a)):
    print(a[i])
for x in a:
    print(x)
```
* Here `a` is a built-in data type `list`.
It is basically an array. It is **iterable** and **mutable**.
* `len()` is a built-in function to return the length of the object
* `range()` is a built-in function to create a list ranging from 0 to the input number (last number excluded due to the half-open interval convention)
* `in` is a python keyword to test if a value is in a sequence
* `a[i]` retrieves the value at location `i` 
* `xrange()` is a built-in function to create an **iterator** that iterates from 0 to the input number (excluding the last number). The advantage of iterators is that they do 
not return a copy of the list but `yield` elements one by one, 
thus is more efficient with big data size. `list(xrange(4))` will create `[0, 1, 2, 3]`, which is the same as `range(4)`.
* `for` loop can directly loop over the elements instead of indices.
* To access the elements of a sequence, the first two ways are not as pythonic as the third way. 
* It is bad practice to modify a `list` (or any mutable sequence) inside a `for` loop while looping over it. It may cause bugs since python internally tracks the index location of the `for` loop. 

```python
a = [23, 70]
b = a + a
c = a * 2
a.append(33)
a.extend([0, 1, 2])
```
* `+` and `*` act on `list` as concatenation. Here `b` and `c` both equal to `[23, 70, 23, 70]`.
* Python optimizes the `append()` method to be of O(1). `list` has another method called `remove()` and removing the last element is also of O(1).
* Concatenation creates a new list thus is expensive. For a large list, it is better to use the `extend()` method.

```python
s = 'abdafdsasdfadfa'
for c in s:
    print c
```
* Here `s` is a built-in string data type. It is **iterable** and **immutable**. 
* The `for` loop loops over the characters in `s`.

```python
a_long_name = [0, 'asdf', 33, 2.2]
for i, x in \ 
    enumerate(a_long_name):
    print(a[i])
    print(x)
```
* `enumerate()` is a built-in function to provide access to both the index and the element.
* If a line is too long, one can use `\` to break the line.

```python
d = {'a': 100, 'b': 200, 'c': 111}
d['e'] = 234
count = d.get('f', 0)
for key, value in d.items():
    print key, value
```
* Here `d` is a built-in data type `dict`. It is **iterable** and **mutable**.
* The second line adds a key-value pair of `'e':234`.
* Accessing a non-existing key causes an error. The `get()` method can return a default value when the key does not exist.
* The `items()` method returns a list of (key, value) pairs.

```python
a = (1, 2) + (3,)
b = (1, 2) * 2
```
* `(3,)` informs python of tuple data type
* Concatenation works for other iterable data types, such as list and str. 

```python
a = 2 ** 3
a, b = 'abc', 4 ** 0.5
a, b = b, a
```
* Type declaration is not needed and the same variable can be dynamically linked to different types.
* The second expression assigns `'abc'` to `a` and `4**0.5` to `b`
* `**` is the exponential operator, e.g., `4**0.5=2.0`
* The last expression swaps the values of `a` and `b`
* Tuples are used under the hood.

```python
if x > 0:
    print('positive: %0.2f' % x)
elif x == 0:
    # write more code here later
    pass
elif -5 < x < 0:
    print('negative: %0.2f' % x)
else:
    print('x < -5')
```
* Anything after `#` is commented out
* `pass` does not do anything. It is a place-holder.
* C style string formatting can be used, although the more pythonic way is to use `'negative: {:0.2f}'.format(x)`.

```python
def binary_search(nums, x):
    ''' binary search

        input:  a sorted array nums
                a search key x
        output: index if found, otherwise -1
    '''
    low, high = 0, len(nums)-1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == x:
            return mid
        if nums[mid] > x:
            high = mid -1
        else:
            low = mid + 1
    return -1
```
* This is an implementation of binary search.
* `def` together with `:` and indentation defines functions
* A pair of `'''` is used to define string that spans multiple lines.
* `//` is the C style integer division
* `None` is the default return value if `return` statement is missing in a function definition.

```python
def square(x):
    return x**2
# lambda function
square_lambda = lambda x: x**2

square_lambda(3)
```
* Short functions can be defined using the `lambda` keyword. You almost never want to assign it to a variable like I did here.

```python
# mutable 
a = [0, 1, 2]
b = a
b[0] = 1
# immutable
i = 0
j = i
i = 1
```
* After execution, `a` becomes `[1, 1, 2]`, i.e., it equals `b`.
* After execution, `i` and `j` are 1 and 0.
* This is because `list` is **mutable** whereas integer is **immutable**. You can think of the variables as pointers. Assignment of immutable object moves the pointer to other location in the memory whereas modification of mutable object does not affect the pointer value.
* Using the built-in function `id()`, you can see that `i` and `j` refer to different locations in memory whereas `a` and `b` refer to the same location.

```python
a = [0, 1, 2]
b = a
b = [3, 4]
```
* After execution, `a` is still `[0, 1, 2]`
* Assignment of mutable object also moves the pointer to other location in the memory.

```python
nums = [10, 20, 30]
def letgo(x):
    x.remove(2)
# rebinding
def letgo2(x):
    x = [0, 1]
```
* After the execution of `letgo(nums)`, `nums` becomes `[10, 20]`.
* After the execution of `letgo2(nums)`, `nums` remains `[10, 20, 30]`. 
* Inside the function scope, `x` is a local variable which you can think of as `only_here.x`. When the function is called, an assignment `only_here.x = x` happens first where `x` is the input. Then the behavior can be understood as the previous example.

```python
a = [0, 1, 2, None, 4]
a_sum = 0
for x in a:
    if x is not None:
        a_sum += x
```
* `None` is of its own data type `NoneType` and cannot be converted to other types 
* `is` and `is not` should be used to compare variable to `None`
* `==` and `!=` compare the value whereas `is` and `is not` compare memory location `id()`

```python
a = x if x>0 else 0
```
* This is the ternary expression in python.

```python
a = [0, 1, 2, None, 4]
a_sum = sum([x for x in a if x is not None])

# nested list comprehension 
b = [['a', 'b', 'c'], [0, 3, 9]]
flattened = [x for y in b for x in y]
```
* `list` can be created using `for` loop and `if` statements. This is called list comprehension.
* Multiple `for` loop is allowed for list comprehension.
* To write a list comprehension, simply move the execution block before the `for` statements and `if` statements and remove the `:`.

## Further study

* [Google python course](https://developers.google.com/edu/python/) provides a succinct tutorial of the python language.
* [Zen of Python](https://www.python.org/dev/peps/pep-0020/) talks about general principles about python programming.
* Matt Harrison's 150 page book talks about more advanced features such as generators, iterators, decorators and functional programming.

<a href="https://www.amazon.com/gp/product/149055095X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=149055095X&linkCode=as2&tag=nosarthur2016-20&linkId=51404148fd08fe0b10d4260dc8dbfaf2" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=149055095X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=149055095X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />


