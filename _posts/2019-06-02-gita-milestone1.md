---
layout: post
title: "Milestone 1 of the gita project: basic CLI"
date: 2019-06-02 00:00:01 -0500
categories: [side project]
comments: true
tags: [python, git]
---

[gita]: https://github.com/nosarthur/gita
[pytest]: https://docs.pytest.org/en/latest/
[argparse]: https://docs.python.org/3/library/argparse.html#sub-commands
[PyPI]: https://pypi.org/

This is the first milestone where we implement the command-line interface (CLI)
with sub-commands. Other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- **milestone 1: basic CLI**
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- [milestone 4: speedup]({% post_url 2020-07-08-gita-milestone4 %})
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

In general, I won't provide complete code for each commit, but only hints,
references, and snippets.
This mimics the office situation where only requirements and partial instructions are given.
If stuck, you can install [gita][gita] to see the expected behavior, and read the source code.

Before diving into the coding nitty-gritty, let's first review project
organization.
A typical Python project has the following structure

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

Here I use the same name for the project, the project root folder, and the source code folder.
This is not a requirement, but rather a convenience.
The source code folder has an `__init__.py` file to make it importable.
The `tests` folder contains test files.
The `requirements.txt` specifies the project's dependency on other third-party
Python packages. And the `setup.py` defines the packaging details.

In addition, a project may contain

- `README.md`: General information.
- `LICENSE`: A must-have for any serious open-source project.
- `Makefile`: Although Python code don't need compilation, it's convenient to define shortcuts.
- `MANIFEST.in`: A list of non-Python files for packaging.
- `conftest.py`: This file is specific to [Pytest][pytest]. It defines
  [test fixtures](https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection)
  and [per-directory plugins](https://docs.pytest.org/en/latest/writing_plugins.html#conftest-py-plugins).

As for the git repo setup, I recommend [creating a repo on Github](https://help.github.com/en/articles/create-a-repo) first.
This remote repo is both an online backup and the 'official' copy for continuous integration (CI).
Make sure to set your project public. Otherwise the CI tools used later in this
milestone are not free.

After that, run `git clone <remote address>` locally.
And we are ready to code.

## v0.0.1: implement `add` and `rm` subcommands

In the first commit, we will implement the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm yyy
> yyy is removed
```

Here nothing is added or removed. We only print out some text for visual inspection.
The command-line interface (CLI) is like the project's skeleton,
and the 'meat' will be added later.

To get you started, here is a simple implementation of `add`.
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

You can run it in the source code folder with

```
python3 main.py add hello
```

In this snippet, we attach sub-parsers to the root parser `p`.
The `parse_args()` method collects all the user input in a dictionary-like
object `args`. The sub-parser's action is defined in the function `add()`,
which becomes the value of `args['func']` by calling the method `set_defaults()`.

Now it's your turn to implement the `rm` sub-command. Optionally you can skim through
[the official document of argparse][argparse].

When it's all working, run `git commit -am "<commit message>"` to commit
the code change. Good commit messages start with action verb.
See the section title for example.

In general, it's good practice to keep each commit small and self-contained.
For example, it may

- add a feature
- fix a bug
- refactor some logic

But not a complicated combination of them.

## v0.0.2: enhance `add` sub-command

To make `add` and `rm` more meaningful, we will save the repo paths in
`~/.config/gita/repo_path`, where `~` is the user home directory.
This location can be retrieved as

```python
import os

path_file = os.path.join(os.path.expanduser('~'),
                         '.config', 'gita', 'repo_path')
```

Another improvement is to allow the addition of multiple paths, i.e,

```
$ gita add /a/b/c/repo1 /d/e/repo2
> repo1 is added
> repo2 is added
```

Take a look at `nargs='+'` in the `argparse` [document][argparse] for this feature.

In addition, make sure you get the following details right

- add path only if it's an existing directory, see `os.path.isdir()`
- add path only if it hasn't been added before
- add absolute path even if the user input is relative

As for the file format, each path can be on its own line in `repo_path`.

If you are new to the `os` module, take a look at
[this article](https://automatetheboringstuff.com/chapter8/).

## v0.0.3: add `ls` sub-command

In application programming interface (API) design, there is a jargon called
"**CRUD**". It stands for create, read, update, and deletion, which form the
complete set of actions on persistent data. In this `gita` project,
`add` is the **C**, `rm` is the **D**, `ls` and `ll` (see next milestone)
are the **R**. I made the design choice to drop **U**.

An example output from `ls` sub-command is

```
$ gita ls
> repo1 repo2
```

Here the repo names are displayed instead of the repo paths, e.g., the path
`/a/b/repo1` has repo name `repo1`.
Check out `os.path.basename()` for this purpose.

To display the full path, we can implement the following behavior

```
$ gita ls repo1
> /a/b/repo1
```

This means the `ls` sub-command takes an optional argument.
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
$ gita rm repo2
```

The Unix philosophy says "no news is good news". Thus we won't give
feedback if `repo2` is deleted successfully. (Previously we printed some text just
for debugging purposes.)

But what if `repo2` doesn't exist in `repo_path`? At the bare minimum, the program
should exit with a non-zero error code without any traceback.
Optionally you can print out some error messages to explain the situation.

## v0.0.5: refactor repo parsing logic

So far we have two sub-commands sharing a common argument

```
gita ls <repo-name>
gita rm [repo-name]
```

Here the angular brackets denote mandatory argument, and the square brackets
optional argument.

Both cases need validity check, i.e., whether the user input is registered
in `repo_path`. Hopefully you don't have two pieces of code doing this.
Redundant code cause redundant work and bugs when requirement changes.
This is the "don't repeat yourself" (DRY) principle.

To kill the redundancy, we can define a helper function to parse the `repo_path` file.

```python
def get_repos() -> Dict[str, str]:
```
Here I use [type hints](https://docs.python.org/3/library/typing.html) to
annotate the return value.
The returned dictionary has repo names as keys and repo paths as values.
Any user input outside this dictionary is invalid.

There is another `argparse` trick to apply here. The `add_argument` method
has a [`choices` keyword argument](https://docs.python.org/3/library/argparse.html#choices),
which can help take care of the membership check.

## v0.0.6: add tests

Any serious project needs tests with high test coverage (I am thinking of >90%).
To write Python tests, we have two choices: the
[`unittest` module](https://docs.python.org/3/library/unittest.html) in the
standard library and the [`pytest` module][pytest].
I prefer the latter for its concision.

See this example from the [`unittest` document](https://docs.python.org/3/library/unittest.html)

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
[this page](https://www.slant.co/versus/9148/9149/~unittest_vs_pytest).
Since `pytest` is not in the Python standard library, we need to put it in
the `requirement.txt` with the version information so that other programmers
can install it using

```
pip3 install -r requirement.txt
```

There are many types of tests. The most common ones are

- unit test: check a single function
- integration test: check a business logic

For the `gita` project, an integration test checks the behavior of a sub-command.
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

- invalid paths cannot be added
- the same path cannot be added multiple times in `repo_path`
- the CLI does not generate traceback when
    - `rm` a non-existing repo
    - `ls` a non-existing repo

To collect test coverage data, check out the [`pytest-cov` package](https://pytest-cov.readthedocs.io/en/latest/).

## v0.0.7: add continuous integration

A software project can have many components (possibly many repos too).
Making sure that all the components work together is called integration.
It involves building the full software, performing unit tests, integration tests,
performance tests, etc. All these processes should be automated of course.

Continuous integration (CI) means integrating as often as possible.
It helps to catch bugs early and prevent catastrophe. For a small project like
`gita`, we can afford to integrate every commit. Specifically, we will perform
automated testing in CI.

There are many CI tools on Github. And the one I use is [Travis CI](https://travis-ci.org/).
Another popular choice is [Circle CI](https://circleci.com/).
Both are free for open source projects.
Recently Github also released its own CI tool called [Github Actions](https://docs.github.com/en/actions).

To set up Travis CI, register with your Github account and grant access to your repo.
Then include a `.travis.yml` file in the project root folder. It specifies the
commands to set up, run, and clean up the test. These commands will be
triggered by every commit to the remote branches, and by the pull requests.
You can find more details in their documentations.

## v0.0.8: package and release

A concept closely related to CI is continuous deployment (CD).
Deployment basically means making the software or service available to users.
And CD means deploying often so that user feedbacks can be collected quickly.

For a small Python project like `gita`, CD is probably an overkill. In this session,
we will implement manual deployment via [the Python Package Index (PyPI)][PyPI].
This will allow you to install your gita package using `pip3 install gita1`.
(Since I already took the name `gita`, you will have to pick a different name,
say `gita1`.)

There are two steps in deployment:

- make installation files
- upload to [PyPI][PyPI]

And we will install some third-party tools for package and release

```bash
pip3 install twine setuptools
```
Remember to add them to `requirements.txt` too.

The purpose of installation is to enable the system `python3` to find our source code.
It also allows us to execute the CLI as `gita` too, instead of running or
`python3 <path-to-source-folder>/main.py`. For example, my installed gita
command points to `/usr/local/bin/gita`, with the following content

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

The first line says that this file is to be run with a specific Python version.
The script passes the user input to the entry point of the
installed gita package.

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
install in the developer mode

```
pip3 install -e .
```
It creates a symbolic link to the source code in the system folder.

To make your gita package installable without source code, you need to
upload the installation files to [the Python Package Index (PyPI)][PyPI],
which is the official repository for Python packages.
Make sure to create an account on [PyPI](https://pypi.org/account/register/) first.

To make the distribution files, run

```bash
python3 setup.py sdist
```

It will create a folder called `dist` with the source tarball file in it.

Uploading to PyPI is simply one command

```bash
twine upload dist/*
```

If no error occurs, you will see the release at
`https://pypi.org/project/<your-package-name>/`.
Note that overwriting an existing release is forbidden on [PyPI][PyPI].
You need to bump up the version number in `setup.py` for each upload.

I put all these commands in a `Makefile` so I only need to remember
aliases for each step.

## v0.1: clean up and tag

This completes the first milestone. At this point, you can optionally tag the
code base using

```
git tag v0.1
```

