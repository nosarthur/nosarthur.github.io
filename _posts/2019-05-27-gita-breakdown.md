---
layout: post
title: How to make a Python command-line tool to run git commands
date: 2019-05-27 09:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

> TL;DR: This is the first post of a step-by-step guide to reproduce [this Python project called gita][gita].

[gita]: https://github.com/nosarthur/gita

This series of posts are written for Python beginners who are seeking
small practice project.
By following this guide, you will build a command-line tool to manage multiple
git repos, and learn modules such as

- [argparse](https://docs.python.org/3/library/argparse.html):
  define command line interface (CLI) with sub-commands
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate terminal commands
- [os](https://docs.python.org/3/library/os.html):
  manipulate path names, check file existence, etc
- [yaml](https://github.com/yaml/pyyaml/): parse configuration files
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)):
  speedup execution of multiple tasks
- [pytest](https://docs.pytest.org/en/latest/): write tests

In addition, I will cover engineering practices such as packaging, continuous
integration, etc.

The [command-line tool][gita] to be built has two functionalities:

1. display information of all the registered repos side by side;
1. delegate git commands for any number of repos from any working directory.

![gita](https://github.com/nosarthur/gita/raw/master/doc/screenshot.png)

It has about **200 lines of code and over 600 stars** on [Github][gita].

I break up the project into 4 milestones

- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- milestone 4: speedup
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

In the rest of this post, I will describe the expected behaviors for them.

## milestone 1: basic CLI

Here the goal is to build a command-line interface (CLI) using the `argparse`
module. Specifically, we will implement three sub-commands `add`, `rm`, and `ls`, to

- add / remove repos
- display path of registered repo

The intended behavior is shown in the following example, where
I denote command-line input with `$` and output with `>`.

```bash
$ gita add /a/b/repo1 /a/d/repo2
> 2 repos are added.
$ gita ls
> repo1 repo2
$ gita ls repo1
> /a/b/repo1
$ gita rm repo1
$ gita ls
> repo2
```

## milestone 2: git integration

Here we will add a sub-command `ll`, which displays information
such as repo name, branch name, edit status, commit message for all repos.
For example,

```bash
$ gita ll
> repo1 master *_    A nice new feature
> repo2 hot-fix *   Fix some bug
```

Under the hood, each piece of information comes from executing a git
command using the `subprocess` module.

## milestone 3: git delegation

In this milestone, we are going to

- delegate git commands for repos
- define custom git command delegation with a YAML file
- add a `super` sub-command to delegate any git commands

The purpose of delegation is to run git commands

1. from any working directory,
2. in batch.

For example, `gita fetch` will run `git fetch` for all repos.

This is the most fun milestone where we make powerful features using
the infrastructure built in the previous two milestones.

## milestone 4: speedup

Here we will use `asyncio` library to speedup the git command delegation for
multiple repos.
You are free to use the alternative libraries to achieve the same goal.

To make it more accessible to beginners, I will also include the basics of
parallel / asynchronous execution.

## milestone 5: miscellaneous topics

Here the topics include writing shell script for command auto-completion,
marketing an open source project, etc.

## references

Two general Python references are

- [python3 module of the week](https://pymotw.com/3/)
- [python standard library](https://docs.python.org/3/library/)

The first one is full of nice examples.

Another fun reading material is the
[Google engineering practices](https://arxiv.org/abs/1702.01715).
