---
layout: post
title: A crash course on python
date:   2016-08-12 13:43:08 -0500
categories: [coding]
comments: true
tags: [python]
---

This is a quick introduction to the python programming language. 
My goal here is to demonstrate the basics of python via small code examples.
Familiarity with other programming language is assumed. Ideally, you should know C or Matlab or C++. Given that background, it should be really easy to pick up python.

Here all examples run in python 2.7 (probably will run in python 3 as well).
I highly recommend installing [iPython](https://en.wikipedia.org/wiki/IPython) which is an interactive environment to run python programs and test out codes.

## basics, control flow, looping, function

```python
a = 2 ** 3
a, b = 'abc', 4 ** 0.5
a, b = b, a
```
* Type declaration is not needed and the same variable can be dynamically linked to different types.
* `;` is not needed at the end of line
* The second expression assigns `abc` to `a` and `4**0.5` to `b`
* `**` is the exponential operator, e.g., `4**0.5=2.0`
* The last expression swaps the values of `a` and `b`

```python
a = 0.8
a.is_integer()
```
* Everything is an object of some class. Even the simple data types.

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
* Indentation and `:` are used to denote code blocks. 
Note in python the indentation is used not only for aesthetic purposes, it is required to define the code blocks.
Improperly indented codes will not run.
* Anything following `#` is commented out
* `pass` does not do anything. It is a place-holder.
* C style string formatting can be used

```python
a = [23, 73, 81, 99]
for i in range(len(a)):
    print(a[i])
for i in xrange(len(a)):
    print(a[i])
```
* Here `a` is a python built-in data type `list`.
It is basically an array. It is **iterable** (can be looped over) and **mutable** (can be modified).
* `len()` is a built-in function to return the length of the object
* `range()` is a built-in function to create a list ranging from 0 to the input number
* `in` is a python keyword to test if a value is in a sequence
* `a[i]` retrieves the value at location `i` 
* `xrange()` is a built-in function to create an **iterator** that iterates from 0 to the input number. The advantage of iterator is that it does not create the list, thus is more efficient. `list(xrange(4))` will create `[0, 1, 2, 3]`, which is `range(4)`.

```python
a = [23, 70]
for x in a:
    print(x)
b = a + a
c = a * 2
a.extend([0, 1, 2])
```
* `for` loop can directly loop over the elements instead of indices.
* `+` and `*` act on `list` as concatenation. Here `b` and `c` both equal to `[23, 70, 23, 70]`.
* Concatenation creates a new list and thus is expensive. For large list, it is better to use the `extend()` method.

```python
a = [0, 'asdf', 33, 2.2]
for i, x in enumerate(a):
    print(a[i])
    print(x)
```
* `enumerate()` is a built-in function to provide access to both the index and the element.

```python
def bsearch(nums, x):
    ''' binary search

        input:  a sorted array nums
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
* A pair of `'''` is used to define string. It is commonly used to make multi-line comment.
* `//` is the C style integer division

```python
a = [0, 1, 2]
b = a
b[0] = 1
```
* After execution, `a` becomes `[1, 1, 2]`

```python
a = (0, 1, 2)
print(a[1])
```
* Here `a` is a python built-in data type `tuple`. It is **iterable** (can be looped over) and **immutable** (cannot be modified). 

```python
d = {'a': 100, 'b': 200, 'c': 111}
d['e'] = 234
```
* 

```python
nums = [10, 20, 30]

def letgo(x):
    x.remove(2)

def letgo2(x):
    x = [0, 1]
```
* After the execution of `letgo2(nums)`, `nums` remains `[10, 20, 30]`. 
* After the execution of `letgo(nums)`, `nums` becomes `[10, 20]`

```python
a = [0, 1, 2, None, 4]
a_sum = 0
for x in a:
    if x is not None:
        a_sum += x
```
* `None` is of its own data type `NoneType` and cannot be converted to other types 
* `is` and `is not` should be used to compare variable to `None`
* `==` and `!=` compare the value whereas `is` and `is not` compare

## more tricks


```python
a = [0, 1, 2, None, 4]
a_sum = sum([x for x in a if x is not None])

# nested list comprehension 
b = [['a', 'b', 'c'], [0, 3, 9]]
flattened = [x for y in b for x in y]
```
* list comprehension
* 

```python
a = x if x>0 else 0
```
* This is the ternary expression in python.

```python
a = [(1,2), (3,4), (5,6)]
for i,j in a:
    print(i+j)
```
* The output is 3, 7, 11.

```python

sort()
sort(, key=)
```

```python
zip()
zip(*)
```

```python
lambda x:
```
* ***lambda function*** 
