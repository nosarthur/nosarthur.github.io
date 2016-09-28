---
layout: post
title: A crash course on python
date:   2016-09-18 13:43:08 -0500
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
All examples run in python 2.7.10.

### the motivation
When learning a new topic, I often get frustrated with books/tutorials.
The problem is that they usually assume no prior knowledge 
whereas I have some. Time is wasted filtering information here and there. 

If you already know a programming language, learning python
should be very easy. Reading systematic learning materials will be a waste of time.
It is far better to learn the minimal to get you started first and learn as needed along the way.
Thus I organized this material to get you started quickly.

There are four major parts of this post:

* [basic facts: boring stuff](#facts)
* [basic examples: essential syntax](#basic)
* [common gotchas: boring stuff but important to know](#gotchas)
* [advanced tricks: syntactic sugars](#sugars)

### about you

Familiarity with other programming language is assumed. Ideally, you should know C/C++ or Matlab. 

Two things you should probably do before coding python

* install [iPython](https://en.wikipedia.org/wiki/IPython) which is an interactive environment to run and test python codes 
* use white space instead of tab for indentation (`set expandtab` if you use [vi](https://en.wikipedia.org/wiki/Vi))


## <a name='facts'></a> Basic facts (boring)

*Warning: these facts may be too dry for the first read,
you can come back to them after going over the basic examples.*

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

Dictionaries map keys to values and are implemented as hash maps.

The ones in bold face are **mutable** data types,
and the rest are **immutable**. In python, this mutability refers to whether
the memory associated with a variable name can be modified directly (in-place).
You will see how they differ in later examples.

The sequence data types can host multiple elements in an ordered sequence.
Two operations are supported to access the elements

* indexing: access single element
* slicing: access a sub-sequence

The ordering makes the sequence data type **iterable**.
Python has special support for the iterable data types.
For example, you can 

* use the keyword `in` to test membership
* use the built-in function `iter()` to loop over the sequence more efficiently

Finally, there are some features to save typing

* `;` is not needed at the end of line.
* Parentheses are not needed for the logic test in looping and conditional statement.
* Unlike other languages where curly braces are used to define code blocks,
python uses indentation and `:`. There are six cases where code blocks are
defined:
    * conditional statement: `if`, `elif`, `else`
    * looping statement: `while`, `for`, `in`
    * function definition: `def` 
    * class definition: `class`
    * error handling: `try`, `except`, `else`, `finally`
    * context generation: `with`, `as`

## <a name='basic'></a> Basic examples (essential syntax)

```python
a = 0.8
a.is_integer()
```
* Everything is an object of some class. Even the basic data types.
* The built-in function `dir()` displays the member methods of an object.
* Type declaration is not needed.

```python
a = (0, 1, 2, 3)
print(a[0])
print a[-1]
print a[1:3]
```
* Here `a` is a built-in data type `tuple`, which is **iterable** (can be looped over) and **immutable** (cannot be modified in-place). 
* `a[i]` retrieves the value at location `i` 
* Python index is zero-based.
* Negative index means indexing from the back. `-1` refers to the last element.
* `a[1:3]` is a slicing. It returns the elements from index 1 to 2 (the last element, i.e., 3, is excluded since python uses half-open interval convention).
* In python 3, you have to use `print()` with the parentheses.

```python
a = (1, 2) + (3,)
b = (1, 2) * 2
```
* Tuple with only one element needs a comma in the definition, e.g., `(3,)` 
* Concatenation works for other **iterable** data types as well, such as `list` and `str`. 

```python
a = 2 ** 3
a, b = 'abc', 4 ** 0.5
a, b = b, a
```
* The same variable can be dynamically linked to different types, although it is bad practice to do so.
* The second expression assigns `'abc'` to `a` and `4**0.5` to `b`
* `**` is the exponential operator, e.g., `4**0.5=2.0`
* The last expression swaps the values of `a` and `b`
* Tuples are used under the hood.

```python
a = [23, 73, 81, 99]
for i in range(len(a)):
    print(a[i])
for i in xrange(len(a)):
    print(a[i])
for x in a:
    print(x)
```
* Here `a` is a built-in data type `list`, which is **iterable** and **mutable**.
It is basically an array. 
* The built-in function `len()` returns the length of a sequence object
* The built-in function `range()` creates a list ranging from 0 up to the input number (last number excluded due to the half-open interval convention)
* The keyword `in` tests if a value is in a sequence
* The built-in function `xrange()` creates an **iterator** that iterates from 0 up to the input number (excluding the last number). The advantage of iterators is that they do 
not return a `list` but `yield` elements one by one, 
thus is more efficient with big data size. `list(xrange(4))` will create `[0, 1, 2, 3]`, which is the same as `range(4)`.
* `for` loop can directly loop over the elements instead of indices.
* To access the elements of a sequence, the third way is more pythonic than the first two.
* It is bad practice to modify a `list` (or any mutable sequence) inside a `for` loop while looping over it. It is error-prone since python internally tracks the index location of the `for` loop. 

```python
a = [23, 70]
b = a + a
c = a * 2
a.append(33)
a.extend([0, 1, 2])
```
* `+` and `*` act on `list` as concatenation. Here `b` and `c` both equal to `[23, 70, 23, 70]`.
* Python optimizes the `append()` method to be of O(1). `list` has another method called `remove()` and removing the last element is also of O(1).
* Concatenation creates a new list thus is expensive. For a large list, it is better to use the `extend()` method, which does not create a new `list`. 

```python
s = 'abdafdsasdfadfa'
for c in s:
    print c
```
* Here `s` is a built-in string data type, which is **iterable** and **immutable**. 
* The `for` loop loops over the characters in `s`.

```python
a = [0, 'asdf', 33, 2.2, None, False, [1, 2]]
for i, x in \
    enumerate(a):
    print a[i], x
```
* `list` can hold different data types. 
* The built-in function `enumerate()` provides access to (index, element) pairs.
* If a line is too long, one can use `\` to break the line.

```python
d = {'a': 100, 'b': 200, 'c': 111}
d['e'] = 234
count = d.get('f', 0)
for key, value in d.items():
    print key, value
```
* Here `d` is a built-in data type `dict`, which is **iterable** and **mutable**.
* The second line adds a key-value pair of `'e':234`.
* Accessing a non-existing key causes an error. The `get()` method returns a default value if the key does not exist.
* The `items()` method returns a list of (key, value) pairs.

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
* The `pass` keyword does not do anything. It is a place-holder.
* C style string formatting works, although the more pythonic way is to use `'negative: {:0.2f}'.format(x)`. See [PEP 3101](https://www.python.org/dev/peps/pep-3101/).

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
* `def` together with `:` and indentation defines function
* A pair of `'''` defines string that spans multiple lines.
* `//` is the C style integer division. `/` is equivalent to `//` in python 2 but not python 3.
* `None` is the default return value if `return` statement is missing in a function definition.

```python
a = [0, 1, 2, None, 4]
a_sum = 0
for x in a:
    if x is not None:
        a_sum += x
```
* `None` is of its own data type `NoneType` and cannot be converted to other types 
* `is` and `is not` should be used to compare variable to `None`
* `==` and `!=` compare value whereas `is` and `is not` compare memory location `id()`

## <a name='gotchas'></a> Gotchas (boring but important)

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
* `a` becomes `[1, 1, 2]`, i.e., it equals `b`.
* `i` and `j` are 1 and 0.
* This is because `list` is **mutable** whereas integer is **immutable**. You can think of the variables as pointers. Assignment of **immutable** object moves the pointer to other location in the memory whereas modification of **mutable** object does not affect the pointer value.
* Using the built-in function `id()`, you can see that `i` and `j` refer to different locations in memory whereas `a` and `b` refer to the same location.

```python
a = [0, 1, 2]
b = a
b = [3, 4]
```
* After execution, `a` remains `[0, 1, 2]`
* Assignment of **mutable** object also moves the pointer to other location in the memory. It is not an in-place modification.

```python
nums = [10, 20, 30]
def letgo(x):
    x.remove(2)
# rebinding
def letgo2(x):
    x = [0, 1]
```
* `letgo(nums)` makes `nums` `[10, 20]`.
* `letgo2(nums)` does not change `nums` 
* Inside the function scope, `x` is a local variable which you can think of as `letgo2.x`. When the function is called, an assignment `letgo2.x = x` happens first where `x` is the input. Then the behavior can be understood as in the previous example.

```python
x = 10
def bar():
    print x
bar()
def foo():
    print x
    x += 1
```
* `bar()` works (are you surprised? I was) and `foo()` does not.
* `bar()` works since python treats variables inside a function implicitly `global` if they are only referenced but not assigned
* When a variable is assigned in the function, it becomes a local variable and shadows variables with the same name outside the function scope.

```python
a = [1, 2, 3, 4]
for x in a:
    x += 1
```
* `a` remains its original values
* `x` gets assigned to each entry of `a` and gets incremented.

```python
a = ('abc'
     'def')
```
* `a` is a `str` variable `'abcdef'`
* This is a feature but could be a bug if one plans for tuple but forgets to put `,`.

```python
def is_it():
    return False
if is_it:
    print 'Yes'
else:
    print 'No'
```
* Since functions are objects in python, this code still runs although `()` is missing for the function call. No error no warning and you get the wrong result.

```python
def f(a=[]):
    a.append(1)
    return a
```
* If you keep calling `f()`, the return value will keep having more 1s.
* This is because default values are only set once when the function is first called. 
* Typically you don't want to use **mutable** data type as default value, unless you are doing cache or memoization.

```python
a = [0]
id1 = id(a)
a = a + [1]
id2 = id(a)
a += [2]
id3 = id(a)
```
* `id2` and `id3` are equal, and they differ from `id1` 
* For list, `+=` is equivalent to `.extend()` instead of assignment. It is a member function call `__iadd__()`

## <a name='sugars'></a> More tricks 

```python
a = x if x > 0 else 0
```
* This is the ternary expression in python.

```python
a = [0, 1, 2, None, 4]
a_sum = sum([x for x in a if x is not None])

# nested list comprehension 
b = [['a', 'b', 'c'], [0, 3, 9]]
flattened = [x for y in b for x in y]
```
* `list` can be created using `for` loop and `if` statements. This is called **list comprehension**.
* Multiple `for` loops are allowed for list comprehension.
* To write a list comprehension, simply move the execution block before the `for` statements and `if` statements, then remove the `:`.

```python
def square(x):
    return x**2
# lambda function
square_lambda = lambda x: x**2

square_lambda(3)
```
* Short functions can be defined using the `lambda` keyword. You almost never want to assign it to a variable like I did here.
* Functions are objects too, thus can be assigned to variables and passed as arguments.

```python
a = [1, 2, 3, 4]
b = filter(lambda x: x > 2, a)
c = map(lambda x: x + 1, a)
```
* These are more typical use of `lambda` functions. 
* `b` is `[3, 4]` and `c` is `[2, 3, 4, 5]`
* The built-in functions `filter` and `map` are functionals.
* It's much faster to run these functional than looping and conditioning.

```python
mul = lambda x, y, z=2: x * y * z
t = (3, 4, 5)
mul(*t)
d = {'x':3, 'y':4}
mul(**d)
```
* `lambda` function can take multiple input parameters, even default parameters 
* `*` unpacks tuple and `**` unpacks dictionary. One standard usage is `*args, **argc`.
* When using `**`, make sure the variable names match with the dictionary keys.

```python
seq1 = ['a', 'b', 'c']
seq2 = [1, 2, 3]
z = zip(seq1, seq2)
unz1, unz2 = zip(*z)
```
* The built-in function `zip()` helps to pair up elements in sequences.
* `z` is `[('a', 1), ('b', 2), ('c', 3)]`
* `unz1` is `('a', 'b', 'c')` and `unz2` is `(1, 2, 3)`.

## Further study

* [The Zen of Python (PEP 20)][zen] talks about general principles about python programming.
* [Python code style guide (PEP 8)](https://www.python.org/dev/peps/pep-0008/)
* Matt Harrison's 150 page book talks about more advanced features such as generators, iterators, decorators and functional programming.

<a href="https://www.amazon.com/gp/product/149055095X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=149055095X&linkCode=as2&tag=nosarthur2016-20&linkId=51404148fd08fe0b10d4260dc8dbfaf2" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=149055095X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=149055095X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

* [Google python course](https://developers.google.com/edu/python/) provides a succinct tutorial of the python language.
* [The Hitchhiker’s Guide to Python!](http://docs.python-guide.org/en/latest/) has many useful topics on python programming.
* [The python programming FAQ](https://docs.python.org/2/faq/programming.html) has many useful tips.

[zen]: https://www.python.org/dev/peps/pep-0020/
