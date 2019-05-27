---
layout: post
title: "Milestone 1 of the gita project: basic CLI"
date: 2019-05-24 10:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the first milestone where we implement command-line interface (CLI)
with subcommands.

0. [overview]({% post_url 2019-05-19-gita-breakdown %})
1. **milestone 1: basic CLI**
2. milestone 2: git integration
3. milestone 3: git delegation
4. milestone 4: speedup

Before we start, let's first look at the folder structure of a typical python
project.

```
gita
├── gita
│   ├── __init__.py
│   └── ...
├── requirements.txt
├── setup.py
└── tests
    └── ...
```

Here the project root folder `gita` contains the source code `gita` folder,
the `tests`folder, and a few configuration files.
The source code folder has an `__init__.py` to make it importable.
The `requirements.txt` defines the project's dependencies on other Python packages.
The `setup.py` file is used to package and publish the project.

Additional files for the project

- `LICENSE`: A must-have for any serious open-source project.
- `Makefile`: defines shortcuts for commands
- `MANIFEST.in`: It specifies non-Python files to publish
- `README.md`: It provides basic information about the project
- `conftest.py`: It defines [test fixtures](https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection)
  and [per-directory plugins](https://docs.pytest.org/en/latest/writing_plugins.html#conftest-py-plugins)
  for `pytest`.

## v0.0.1. implement `add` and `rm` subcommands

Use argparse to implement a CLI with the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm xxx
> xxx is removed
```

parser could have sub-parsers

[sub-commands](https://docs.python.org/3/library/argparse.html#sub-commands)

```
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('integers', metavar='N', type=int, nargs='+',
                    help='an integer for the accumulator')
parser.add_argument('--sum', dest='accumulate', action='store_const',
                    const=sum, default=max,
                    help='sum the integers (default: find the max)')

args = parser.parse_args()
print(args.accumulate(args.integers))
```
## v0.0.2. enhance `add` subcommand

If the `add` argument is a valid directory, e.g., `/a/b/c`,
save it in the file `~/.gita/repo_path` where `~` denotes user home directory
(these are Linux system conventions).

```
```

Here the rationale is that `c` is the repo name.

With multiple input, save all valid paths and separate them with `:`.

```
$ gita add /a/b/c /d/e
> c is added
> e is added
```

If you are new to the Python `os` module, take a look at [this link](https://automatetheboringstuff.com/chapter8/).

## 3. add `ls` subcommand

List all repo names saved in `repo_path` file.

```
$ gita ls
> c e
```

## 4. enhance `rm` subcommand

If the folder names exist, delete them from the `repo_path` file.

## 5. add tests

Test the behavior of `add`, `rm`, `ls`, and any other utility function.
There are a few things to check

- adding invalid path should not succeed
- adding the same path multiple times should not result in redundant repos
- removing a non-existent repo should not cause traceback


