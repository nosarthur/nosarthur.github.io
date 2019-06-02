---
layout: post
title: "Milestone 1 of the gita project: basic CLI"
date: 2019-06-02 00:00:01 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the first milestone where we implement command-line interface (CLI)
with subcommands. The other posts in this series are linked below.

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- **milestone 1: basic CLI**
- milestone 2: git integration
- milestone 3: git delegation
- milestone 4: speedup

In general, I will not provide complete code for each step, but only hints,
references, or snippets.
This mimics a real working situation, where one only gets instructions
from the senior members.
If you are really stuck, please take a look at the [source code of gita][gita].

[gita]: https://github.com/nosarthur/gita

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
The `requirements.txt` defines the project's dependencies on other third-party
Python packages.
The `setup.py` specifies the details about how to package the project.

Other common files include

- `LICENSE`: A must-have for any serious open-source project.
- `Makefile`: Although Python code doesn't require compilation, it's convenient
  to define shortcuts.
- `MANIFEST.in`: It specifies the non-Python files for packaging and release.
- `README.md`: General information about the project.
- `conftest.py`: This file is specific to [pytest]().
  It defines
  [test fixtures](https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection)
  and [per-directory plugins](https://docs.pytest.org/en/latest/writing_plugins.html#conftest-py-plugins).

After creating the root `gita` folder, you can run `git init` to initialize a
git repo. In case you have created a repo on Github first, you can run
`git clone <remote path>` to generate a local copy.

## v0.0.1: implement `add` and `rm` subcommands

The command-line interface (CLI) is like the skeleton of the project. 
For the first commit, we will use `argparse` to implement the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm xxx
> xxx is removed
```

Nothing is added or removed from anywhere. We only print out some texts for now.
The real functionalities will be added later.

To get you started, I give a simple implementation for `add` below.
```python
import argparse


def add(args):
    print(f'{args.path} is added.')


if __name__ == '__main__':
    p = argparse.ArgumentParser(prog='gita')
    subparsers = p.add_subparsers(help='sub commands -h')

    p_add = subparsers.add_parser('add')
    p_add.add_argument('path')
    p_add.set_defaults(func=add)

    args = p.parse_args()
    if 'func' in args:
        args.func(args)
    else:
        p.print_help()
```

Here we attach sub-parsers to the root parser. By calling the root parser `p`'s
`parse_args()` method, we retrieve all the command-line input from user in a
dictionary-like object `args`. The action of the sub-parser is defined in a
separate function `add()`, which becomes the value of `args['func']` by
calling the method `set_defaults()`.

Now please implement the `rm` sub-command. You should also read
[the argparse official document](https://docs.python.org/3/library/argparse.html#sub-commands).

After that, you can run `git commit -am <commit message>`.
One good message is this section's name.

## v0.0.2: enhance `add` sub-command

To make `add` and `rm` more meaningful, we will save the repo paths in
`~/.config/gita/repo_path` where `~` denotes user home directory (the Linux
system conventions).
In Python, this file location can be retrieved as

```python
import os

path_file = os.path.join(os.path.expanduser('~'),
                         '.config', 'gita', 'repo_path')
```

The desired behavior is
```
$ gita add /a/b/c d/e
> c is added
> e is added
```

Besides saving the paths to file, there are a few more requirements

- allow multiple paths input, which can be achieved using `nargs='+'` in
  `add_argument()`
- add path only if it exists, which can be checked using `os.path.isdir()`
- add path only if it hasn't been added before
- add absolute path even if the user input is a relative path

In the file `repo_path`, the paths can be separated with `:` (Linux convention).

If you are new to the Python `os` module, take a look at
[this link](https://automatetheboringstuff.com/chapter8/).

## v0.0.3: add `ls` sub-command

In application programming interface (API) design, there is a jargon "**CRUD**",
which stands for create, read, update, and deletion.
They form a complete set of actions on a persistent data. In this`gita` project,
`add` is the **C**, and `ls` is the **R**.
We will use the `ls` sub-command to list all repo names saved in `repo_path` file.
For example,

```
$ gita ls
> c e
```

Note that we are not showing the full paths but only the repo names, e.g., the
path `/a/b/c` has repo name `c`.
We can use `os.path.basename()` for this purpose.

To display the full path, we can implement the following behavior

```
$ gita ls c
> /a/b/c
```

This means the `ls` sub-command should take optional argument.
Check out `nargs='?'` in the `argparse` module.

A naive implementation could simply display the content in `repo_path`. But
what if the user moves / deletes the repo? It is thus better to check the paths
and only display the valid ones. We should further remove the invalid ones
since they are unlikely to become valid again.
This is the design choice to drop **U** in CRUD API.

## v0.0.4: enhance `rm` sub-command

This is the **D** in CRUD API design.
It deletes them from the `repo_path` file.

```
$ gita rm c
```

The Linux philosophy is "no news is good news". Thus we opt to have no feed
back here if `c` is deleted successfully.
But what if `c` doesn't exist in `repo_path`? For now, it doesn't really matter.
We will revisit this issue in milestone 2.

## v0.0.5: add tests

Any serious project needs tests with high test coverage (I am thinking of >90%).
To write Python unit test, we have two major choices.
the [`unittest` module](https://docs.python.org/3/library/unittest.html) in the
Python standard library and the [`pytest` module](https://docs.pytest.org/en/latest/).
I prefer `pytest` mostly because it's less verbose.
See this example from  the `unittest` front page

```python
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.is_upper())
        self.assertFalse('Foo'.is_upper())
```

The same tests in `pytest` is

```python
class TestStringMethods:

    def test_upper(self):
        assert 'foo'.upper() == 'FOO'

    def test_isupper(self):
        assert 'FOO'.is_upper()
        assert not 'Foo'.is_upper()
```

More high-level comparison between them can be found in
[this page](https://www.slant.co/versus/9148/9149/~unittest_vs_pytest)

As a bare minimum, we should test the behavior of `add`, `rm`, `ls` with valid
inputs. As for edge cases, check that

- invalid path cannot be added
- the same path cannot added multiple times in `repo_path`

In general, invalid inputs should be detected, and should not cause traceback.
Check the following situations for example,

- removing a non-existing repo
- `ls` a non-existing repo

This completes the first milestone. At this point, you can optionally tag the
code base using

```
git tag v0.1
```
