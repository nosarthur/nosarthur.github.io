---
layout: post
title: How to make a Python command line tool to run git commands
date: 2019-05-27 09:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

> TL;DR: This is the first post of a step-by-step guide to reproduce [this Python project called gita][gita].

[gita]: https://github.com/nosarthur/gita

This series of posts are written for Python beginners who are seeking ideas
for small practice project.
By following this guide, you will build a command line tool to manage multiple
git repos, and learn the following modules:

- [argparse](https://docs.python.org/3/library/argparse.html):
  define command line interface (CLI) with subcommands
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate terminal commands
- [os](https://docs.python.org/3/library/os.html):
  manipulate path names, check files, etc
- [yaml](https://github.com/yaml/pyyaml/): parse configuration files
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)):
  speedup execution of multiple tasks

[This command line tool][gita] has two functionalities:

1. display information of all the registered repos side by side;
1. delegate git commands for any number of repos from any working directory.

![gita](https://github.com/nosarthur/gita/raw/master/doc/screenshot.png)

It comes out of my daily work where I need to compile
multiple git repos together thus it is vital to have them on the right branch.
It has about 200 lines of code and over 600 stars on [Github][gita].

In this post I will give an overview of the milestones.
Detailed instructions will be published in later posts.

- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- milestone 2: git integration
- milestone 3: git delegation
- milestone 4: speedup

## milestone 1: basic CLI

Here the goal is to build a CLI using the `argparse` module. Specifically, we
will implement three subcommands `add`, `rm`, and `ls`, which allows us to

- add / remove repos
- display path of registered repo

In the following terminal example, I denote command line input with `$` and
output with `>`.

```bash
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

## milestone 2: git integration

Here the main goal is to add a sub-command `ll`, which displays information
such as repo name, branch name, edit status, commit message for all the repos.
For example,

```bash
$ gita ll
> repo1 master *_    A nice new feature
> repo2 hot-fix *   Fix some bug
```

Under the hood, each piece of information is retrieved from executing a git
command using the `subprocess` module.

## milestone 3: git delegation

In this milestone, we are going to

- delegate various git commands for repos
- use yaml file to define custom git command delegation
- add a `super` subcommand that delegate any git command

The purpose of delegation is to run git commands from any working directory,
as well as to run them in batch.
For example, `gita fetch` will run `git fetch` for all repos.

This is the most fun milestone where we integrate the knowledge from the
previous two milestones to make powerful features.

## milestone 4: speedup

Here we will use `asyncio` library to speedup the git command delegation for
multiple repos.
You are free to use the alternative libraries to achieve the same goal.

To make it more accessible to beginners, I will also include the basics of
parallel / asynchronous execution there.

## references

Two general references are

- [python standard library](https://docs.python.org/3/library/)
- [python3 module of the week](https://pymotw.com/3/)

I particularly like the second one since it is full of examples.

Another useful document to read is the [Google engineering practices](https://arxiv.org/abs/1702.01715).
