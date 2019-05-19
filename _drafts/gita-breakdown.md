---
layout: post
title: How to make a Python command line tool running git commands
date: 2019-05-16 01:00:00 -0500
categories: [coding]
comments: true
tags: [python, git]
---

**TL;DR: This is a step-by-step guide to reproduce [this Python project][gita].**

[gita]: https://github.com/nosarthur/gita

This series of posts are written for Python beginners who already know the
grammar and are seeking ideas for small practice projects.
By following this guide, you will learn the following
[Python standard library](https://docs.python.org/3/library/) modules.

- [argparse](https://docs.python.org/3/library/argparse.html):
  define command line interface (CLI) with subcommands
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate shell commands
- [os](https://docs.python.org/3/library/os.html):
  path name manipulations, file checks, etc
- [yaml](): parse configuration files
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)):
  speedup execution of multiple tasks

This [side project][gita] is a command line tool to manage multiple git repos.
It has two functionalities:

1. display information of all the registered repos side by side;
1. delegate git commands for variable number of repos from any directory.

It comes out of my daily work where I need to compile
multiple git repos together thus it is vital to have them on the right branch.

![gita](https://github.com/nosarthur/gita/raw/master/doc/screenshot.png)

It is about 200 lines of code and has over 600 stars on [Github][gita].

 And the 
Milestones
1. basic CLI
2. git integration
3. git delegation
4. speedup

This post is only an introduction.

## milestone 1: basic CLI

In this milestone, we implement a CLI with three subcommands `add`, `rm`,
and `ls`, which allows us to

- add, remove repos
- display path of registered repo



In the terminal examples, I will denote command line input using `$` and output
using `>`.

Concretely,

```
$ gita add /a/b/repo1 /a/d/repo2
> 2 repos are added:
> /a/b/repo1
> /a/d/repo2
$ gita ls
> repo1 repo2
$ gita ls repo1
> /a/b/repo1
$ gita rm repo1
$ gita ls
> repo2
```

The library of focus   is argparse.

## milestone 2: git integration

Concretely,

```
$ gita ll
> repo1 master *_    A nice new feature
> repo2 hot-fix *   Fix some bug
```

The main library is subprocess.

## milestone 3: git delegation

The features in this milestone are

- delegate various git commands for repos
- use yaml file for custom git command delegation
- add a `super` subcommand that delegate any git command

The purpose of delegation is that git command can be executed from any directory.
For example, run `git fetch` for all repos.

The focus 
`subprocess` and `yaml`.

## milestone 4: miscellaneous improvements


## references

The documents of the python standard library can sometimes be scarce.

python3 module of the week

which is full of examples.
