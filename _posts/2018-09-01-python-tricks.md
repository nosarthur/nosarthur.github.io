---
layout: post
title: Some Python tricks
date:   2018-09-01 08:00:00 -0500
categories: [coding]
comments: true
tags: [python]
---

## command line

Beside calling `python <some script file>` directly, we can
give extra options to the python command.

The `-c` option executes the string input directly. For example,

```bash
python3 -c "print('hello world')"
```

The `-m` option executes the module as a script. This requires the module to
have `<pkg>.__main__` entry point. For example,

```bash
python3 -m pip
python3 -m venv
python3 -m IPython
```
It is more convenient to `alias` them in the `.bashrc`.

The `-O` option removes `assert` statements.

More information about these options can be found on the page of
[Command line and environment](https://docs.python.org/3/using/cmdline.html).

## profile

> We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. --- Donald Knuth

The python standard library ships two profilers `cProfile` and `profile` with
the same interface. `cProfile` is faster than `profile`, but less convenient to
extend.

I use a tool called [snakeviz](https://jiffyclub.github.io/snakeviz/) to
visualize the profile results interactively in a webpage. To install, run

```shell
pip3 install snakeviz
```

To do the profiling and generate the visualization, use the following commands

```shell
python3 -m cProfile -o program.prof my_program.py
snakeviz program.prof
```

More information about the profiler can be found on the page of
[The Python Profilers](https://docs.python.org/3/library/profile.html).

## pytest

The pytest library uses fixtures to manage resources and dependency injection.
For example, if several tests use the some data without changing it, we can
load it once and share among them:

```python
import pytest

@pytest.fixture(scope='session')
def data1():
    d = load_data('some file name')
    return preprocess(d)
```

This code can be placed in a file called `conftest.py`, which is loaded by
pytest automatically. Any test files located in sub-directories of the `conftest.py`'s
direction can use this fixture. We can also create multiple `conftest.py` at
different locations to control the accessibility of different fixtures.
In the test code, one can pass `data1` as argument to the test function directly.
The scope could be `session`, `module`, `class`, and `function`.

More information is on the [pytest fixture page](https://docs.pytest.org/en/latest/fixture.html).
For example, one can even parametrize the fixture.

In the following example, I combine several tricks together

```python
import pytest
from unittest.mock import patch

@patch("import/path/to/a/function")
@pytest.mark.parametrize('input, expected', [
    (100, ['a', 123]),
    (200, ['b', 345]),
    pytest.param((999, ['c', 222]), marks=pytest.mark.xfail(reason="some reason")),
])
def test_something(mock_f, input, expected, data1, data2, tmpdir):
    some_arg = get_arg(data2)
    with tmpdir.as_cwd():
        result = some_func(input,  data1)
        assert expected == result
```

* `patch` mocks a function
* `parametrize` generates multiple tests with the same structure
* `param` and `xfail` denotes failing test
* `tmpdir` is a fixture defined by pytest to simplify the use of temporary directory
* `data1` and `data2` are fixtures defined elsewhere

It's easy to get test coverage and parallelization too. To install

```bash
pip3 install pytest-cov, pytest-xdist
```

To use, run

```bash
pytest tests/ --cov=./gita -n=auto
```

Here `tests/` is the directory containing the test files, `./gita` is the package
being tested, and `-n` specified the number of processes for parallelization.
