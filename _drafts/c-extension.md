---
layout: post
title: Writing C Extension for Python3 and Numpy
date:   2018-10-11 13:00:00 -0500
categories: [coding]
comments: true
tags: [python extension, numpy]
---

familiar with Python and some knowledge of C or C++ programming.

CPython

Two common usages of C Extension are

* to call existing C/C++ code in Python
* to speed up Python functions

Python version 

manually

Cython
CType
SWIG

more detailed control over the conversion, and helps to understand the inner workings of Python.

```python
import numpy as np

def f(pos0: np.ndarray, pos1: np.ndarray, w=None) -> np.ndarray:
    """
    Average position. The inputs should be Nx3 Numpy arrays.
    """
    return np.average(a + b, axis=1, weight=w)
```


## data types and interfacing the C types

All Python objects are represented by `PyObject` struct, and it's always used as pointer.
Thus we need to make type conversion for the input and output variables.

```c
typedef struct {
    Py_ssize_t ob_refcnt;   /* reference count */
    PyTypeObject* ob_type;  /* object type */
};
```

Python type | CPython type | conversion
--- | --- | ---
`None` | |
`bool` | |
`int` | `PyLongObject` | `PyLong_FromLong`
`float` | |
`complex` | |
`str` | |
`tuple` | |
`list` | |
`dict` | |
`numpy.ndarray` | |

## wrap the C/C++ function

I will call the wrapper code `wrapper.cpp`.

### Import Python and Numpy header files

```c++
#include <Python.h>
#include <numpy/ndarrayobject.h>
```

```bash
g++ $(python3-config --includes) -I/usr/local/lib/python3.7/site-packages/numpy/core/include/ wrapper.cpp
```

```bash
sudo apt-get install python3-dev
sudo yum install python3-dev
```

### assert the input types

`NULL`

### 

## expose the wrapped function

PyMethodDef

PyCFunction

`NULL` terminated array

PyDoc_STRVAR()

## expose the extension as a module

PyModuleDef

```c
    PyModuleDef_HEAD_INIT,
    "",
    module_doc,
    -1,
    methods,
    NULL,
    NULL,
    NULL,
    NULL,
    };
```

PyModule_Create()

## packaging the extension

```python
from setuptools import setup, Extension
```

## memory leaks

Py_DECREF()

## using it

write a test

## references

* [Extending Python with C or C++](https://docs.python.org/3.7/extending/extending.html)
* [How to extend Numpy](https://docs.scipy.org/doc/numpy/user/c-info.how-to-extend.html)
* [C extension tutorial](https://llllllllll.github.io/c-extension-tutorial/index.html)
* [Software carpentry](https://intermediate-and-advanced-software-carpentry.readthedocs.io/en/latest/c++-wrapping.html)
