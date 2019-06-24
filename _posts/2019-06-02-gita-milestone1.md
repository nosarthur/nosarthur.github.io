---
layout: post
title: "Milestone 1 of the gita project: basic CLI"
date: 2019-06-02 00:00:01 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the first milestone where we implement command-line interface (CLI)
with sub-commands. Other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- **milestone 1: basic CLI**
- milestone 2: git integration
- milestone 3: git delegation
- milestone 4: speedup

In general, I won't provide complete code for each commit, but only hints,
references, and snippets.
This mimics the working situation where only requirements and partial instructions
are given.
You can also install gita to see the expected behavior, but try not to read the
[source code][gita] unless you are really stuck.

[gita]: https://github.com/nosarthur/gita
[pytest]: https://docs.pytest.org/en/latest/

Before diving into the nitty-gritty of coding, let's first review project
organization.
A typical python project has the following structure

```
gita
├── gita
│   ├── __init__.py
│   └── ...
├── tests
│   └── ...
├── requirements.txt
├── setup.py
└── ...
```

Here I follow the convention of identical name for the project, the project
root folder, and the source code folder. This is not a requirement, but rather
a convenience. The source code folder has an `__init__.py` to make it
importable. The `tests` folder contains test files.
The `requirements.txt` specifies the project's dependency on other third-party
Python packages. And the `setup.py` defines the packaging details.

In addition, a project may contain

- `README.md`: General information.
- `LICENSE`: A must-have for any serious open-source project.
- `Makefile`: Although Python code don't need compilation, it's convenient to define shortcuts.
- `MANIFEST.in`: A list of non-Python files for packaging.
- `conftest.py`: This file is specific to [pytest][pytest]. It defines
  [test fixtures](https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection)
  and [per-directory plugins](https://docs.pytest.org/en/latest/writing_plugins.html#conftest-py-plugins).

As for the git repo setup, I recommend [creating a repo on Github](https://help.github.com/en/articles/create-a-repo) first.
This remote repo serves as an online backup, as well as the 'official' copy for
continuous integration (CI).
Make sure to set your project public. Otherwise the CI tools used later in this
milestone are not free.

After that, run `git clone <remote address>` locally to create a copy.
And we are now ready to code.

## v0.0.1: implement `add` and `rm` subcommands

In the first commit, we will implement the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm yyy
> yyy is removed
```

Nothing is added or removed from anywhere. We only print out some text for
visual inspection.
The command-line interface (CLI) is like the project's skeleton.
The 'meat' will be added in later commits.

To get you started, I give a simple implementation of `add` here.
You can put it in `main.py` inside the source code folder.

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

You can run it using

```
python3 main.py add hello
```
assuming you are in the source code folder.

In this snippet, we attach sub-parsers to the root parser `p`.
The `parse_args()` method retrieves all the user input in a dictionary-like
object `args`. The sub-parser's action is defined in the function `add()`,
which becomes the value of `args['func']` by calling the method `set_defaults()`.

Now please implement the `rm` sub-command. You should also read
[the official document of argparse module](https://docs.python.org/3/library/argparse.html#sub-commands)
if you are new to it.

When it's all working, run `git commit -am <commit message>` to commit
the code change. A good commit message starts with an action verb.
See the section title for example.

In general, it's good practice to keep each commit small and self-contained.
For example, a commit may

- add a feature
- fix a bug
- refactor some logic for better performance

But not a complicated combination of them.

## v0.0.2: enhance `add` sub-command

To make `add` and `rm` more meaningful, we will save the repo paths in
`~/.config/gita/repo_path`, where `~` is the user's home directory.

This location can be retrieved as

```python
import os

path_file = os.path.join(os.path.expanduser('~'),
                         '.config', 'gita', 'repo_path')
```

Another improvement is to allow the addition of multiple paths, i.e,

```
$ gita add /a/b/c d/e
> c is added
> e is added
```

Check out`nargs='+'` in the `argparse` module for this feature.

In addition, make sure you get the following details right

- add path only if it's a directory and it exists, see `os.path.isdir()`
- add path only if it hasn't been added before
- add absolute path even if the user input is a relative path

As for the file format, each path can be on its own line in `repo_path`.

If you are new to the `os` module, take a look at
[this link](https://automatetheboringstuff.com/chapter8/).

## v0.0.3: add `ls` sub-command

In application programming interface (API) design, there is a jargon called
"**CRUD**". It stands for create, read, update, and deletion, which form the
complete set of actions on persistent data. In this `gita` project,
`add` is the **C**, `rm` is the **D**, `ls` and `ll` (see next milestone)
are the **R**. I also made the design choice to drop **U**.

An example output from `ls` sub-command is

```
$ gita ls
> c e
```

Here the repo names are displayed instead of the repo paths, e.g., the path
`/a/b/c` has repo name `c`.
Check out `os.path.basename()` for this purpose.

To display the full path, we can implement the following behavior

```
$ gita ls c
> /a/b/c
```

This means the `ls` sub-command takes optional argument.
Check out `nargs='?'` in the `argparse` module.

A naive implementation would simply display the content in `repo_path`. What if
the user moves or deletes a folder? It is better to show only the valid ones.
We should also remove the invalid ones since they are unlikely to become valid
again. Think about where it should be done. Probably not here since `ls` is the
**R**, which should not have side effects.

## v0.0.4: implement `rm` sub-command

This is the **D** in CRUD API design.
It deletes repo(s) from the `repo_path` file. For example,

```
$ gita rm c
```

One of the Unix philosophy is "no news is good news". Thus we won't give
feedback if `c` is deleted successfully. (Previously we printed some text just
for debugging purposes.)

But what if `c` doesn't exist in `repo_path`? At the bare minimum, the program
should exit with a non-zero error code without any traceback.
Optionally you can print out some error messages to explain the situation.

## v0.0.5: refactor repo parsing logic

Note that two sub-commands share a common argument

```
gita ls <repo-name>
gita rm [repo-name]
```

Here the angular brackets denote mandatory argument, and the square brackets
optional argument.

Both cases need validity check, i.e., whether the user input is a registered
repo in `repo_path`. Hopefully you don't have two pieces of code doing this.
Redundant code cause either extra work or bugs when requirement changes.
This is the "don't repeat yourself" (DRY) principle of software design.

To kill the redundancy, we can define a helper function to parse the `repo_path` file.

```python
def get_repos() -> Dict[str, str]:
```
Here I use [type hints](https://docs.python.org/3/library/typing.html) to
annotate the return value.
The returned dictionary has repo names as keys and repo paths as values.
Any user input that's not in it is invalid.

There is another `argparse` trick to apply here. The `add_argument` method
has a [`choices` keyword argument](https://docs.python.org/3/library/argparse.html#choices).
It takes care of the membership check.

## v0.0.6: add tests

Any serious project needs tests with high test coverage (I am thinking of >90%).
To write Python tests, we have two choices: the
[`unittest` module](https://docs.python.org/3/library/unittest.html) in the
standard library and the [`pytest` module][pytest].
I prefer the latter for its concision.

See this example from the [`unittest` documentation](https://docs.python.org/3/library/unittest.html)

```python
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.is_upper())
        self.assertFalse('Foo'.is_upper())
```

The equivalent test in `pytest` is

```python
class TestStringMethods:

    def test_upper(self):
        assert 'foo'.upper() == 'FOO'

    def test_isupper(self):
        assert 'FOO'.is_upper()
        assert not 'Foo'.is_upper()
```

More high-level comparison between them is in
[this page](https://www.slant.co/versus/9148/9149/~unittest_vs_pytest)
Since `pytest` is not in the Python standard library, we need to put it in
the `requirement.txt` with the version information so that other programmers
can easily install it using

```
pip3 install -r requirement.txt
```

There are many types of tests. The most common ones are

- unit test: check a single function
- integration test: check a business logic

For the gita project, an integration test checks the behavior of a sub-command.
We can refactor `main.py` to facilitate that

```python
def main(argv=None):
    p = argparse.ArgumentParser(prog='gita')
    ...

if __name__ == '__main__':
    main()
```

This change allows us to pass command-line arguments to the `main()` function.
Then in the test we can check the output using `pytest`'s `capfd` fixture.

At a bare minimum, you should test the behavior of `add`, `rm`, `ls` with valid
inputs. As for edge cases, make sure that

- invalid path cannot be added
- the same path cannot be added multiple times in `repo_path`
- the CLI does not generate traceback when
    - `rm` a non-existing repo
    - `ls` a non-existing repo

To collect test coverage data, check out the [`pytest-cov` package](https://pytest-cov.readthedocs.io/en/latest/).

## v0.0.7: add continuous integration

A software project can have many components, possibly many repos too.
Making sure that all the components can work together is called integration.
Usually it takes the form of building the full software,
performing unit tests, integration tests, performance tests, etc.
All these processes should be automated of course.

Continuous integration (CI) means integrating as often as possible.
It helps to catch bugs early and prevent catastrophes. For a small project like
gita, we can afford to integrate for every commit. For us, CI only includes
automated test.

There are many CI tools on Github. The one I use is [Travis CI](https://travis-ci.org/).
Another popular one is [Circle CI](https://circleci.com/).
Both of them are free for open source projects.

To it setup, register with your Github account and grant it access to your repo.
Then you need to include a `.travis.yml` file in the project root folder. It
specifies the commands to set up, run, and clean up the test.
These commands will be triggered after every commit into the remote master
branch, as well as the pull requests.

## v0.0.8: package and release

So far we have been accessing the CLI via `python3 main.py`.
If you are not inside the source code folder, explicit path of `main.py` is
also needed.

To eliminate this inconvenience, we can install our gita module. Installation
copies the source code to system folder so that `python3` can find it.
You will also be able to execute the CLI as `gita` too. For example, my
gita command points to `/usr/local/bin/gita`, which has the following content

```python
#!/usr/local/bin/python3.6
# EASY-INSTALL-ENTRY-SCRIPT: 'gita==0.10.2','console_scripts','gita'
__requires__ = 'gita==0.10.2'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('gita==0.9.7', 'console_scripts', 'gita')()
    )
```

The first line says that this file is to be run with a specific python command.
The main part of the script passes the user input to the entry point of the
installed gita package.

The third-party tools for package and release can be installed with

```bash
pip3 install twine setuptools wheel
```

Remember to add them to `requirements.txt`.

Setting up the packaging is as easy as adding a `setup.py` file in the project
root folder.
A minimum example is

```
from setuptools import setup

setup(
    name='gita',
    packages=['gita'],
    version='0.0.8',
    entry_points={'console_scripts': ['gita = gita.main:main']},
    python_requires='~=3.6',
)
```

You can check out [the documentation](https://setuptools.readthedocs.io/en/latest/index.html)
for more keywords.

To avoid name clashes, you should rename your project to something else,
say "gita1". Note that the entry point is the `main` function.

With `setup.py` in place, you can already install locally

```
pip3 install .
```

Here I assume you are at the project root folder.

If you want your code change to take effect immediately,
install with the developer mode

```
pip3 install -e .
```
It creates a symbolic link to the source code in the system folder.

To make your gita package installable via `pip3`, you need to create distribution
files and upload them to [the Python Package Index (PyPI)](https://pypi.org/),
which is the official repository for python packages.
Make sure to create an account on [PyPI](https://pypi.org/account/register/) first.

To make the distribution files, run

```bash
python3 setup.py sdist bdist_wheel
```

It will create a folder called `dist` with the source tarball file and wheel file in it.

Uploading to PyPI is simply one command

```bash
twine upload dist/*
```

If no error occurs, you will see the release at
`https://pypi.org/project/<your-package-name>/`.
Note that overwriting an existing release is disallowed on PyPI.
You need to bump up the version number in `setup.py` for each upload.

I also put all these commands in a `Makefile` so that I only need to remember
short aliases.

## v0.1: clean up and tag

This completes the first milestone. At this point, you can optionally tag the
code base using

```
git tag v0.1
```

