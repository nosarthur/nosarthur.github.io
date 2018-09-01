---
layout: post
title: Python tricks
date:   2018-09-01 08:00:00 -0500
categories: [coding]
comments: true
tags: [python]
---

Here I will share some python tricks.

## command line

Beside calling `python <your script>` or using the interactive shell, we can
give extra options to the python command.

The `-c` option executes the text input directly. For example,

```bash
python3 -c "print('hello world')"
```

The `-m` option executes the module as a script. This requires the module to
have `<pkg>.__main__` entry point. For example,

```bash
python3 -m IPython
```

The `-O` option removes `assert` statements.

More information about these options can be found on the help page of
[Command line and environment](https://docs.python.org/3/using/cmdline.html).

## profile

The python standar library ships two profilers `cProfile` and `profile` with
the same interface. `cProfile` is faster than `profile`, but more difficult to
add extension.

I use a tool called [snakeviz](https://jiffyclub.github.io/snakeviz/) to
visualize the profile results in a webpage.
It can be installed as

```shell
pip3 install snakeviz
```

To run the profiling and create the visualization, use the following commands

```shell
python3 -m cProfile -o program.prof my_program.py
snakeviz program.prof
```

More information about the profiler can be found in the page of
[The Python Profilers](https://docs.python.org/3/library/profile.html).

## pytest

The pytest library uses fixtures manage test resources and dependency injection.
For example, if several tests use the some data without changing it, we can
load it once and share among them:

```python
import pytest

@pytest.fixture(scope='session')
def data1():
    return load_data('some file name')
```

This code can be placed in a file called `conftest.py`, which pytest will load
automatically. 

In the test code, one can pass `data1` as argument to the test function directly.
The scope could be `session`, `module`, `class`, and `function`.

[pytest fixture page](https://docs.pytest.org/en/latest/fixture.html).

```python
import pytest
from unittest.mock import patch

@pytest.mark.parametrize('input, expected', [
    (100, ['a', 123]),
    (200, ['b', 345]),
    pytest.param((999, []), marks=pytest.mark.xfail(reason="some reason")),
])
def test_something(input, data1, data2, tmpdir):
    some_arg = get_arg(data2)
    with tmpdir.as_cwd():
        result = some_func(input,  data1)
        assert expected == result
```

mock

parametrize

test coverage and parallelization.
