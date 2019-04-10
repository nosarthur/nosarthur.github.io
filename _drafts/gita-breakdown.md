---
layout: post
title: Break down of the gita project
date: 2019-04-16 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

In this post, I will break down a small python project into incremental commits.

The ideal audience is someone who already learned the Python basic, but is not
familiar with the [Python standard libraries](https://docs.python.org/3/library/).

This side project [gita](https://github.com/nosarthur/gita)
is about 200 lines
and has over 500 stars on Github.

- [argparse](https://docs.python.org/3/library/argparse.html): define CLI with subcommands
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate git commands
- yaml: configure delegated git commands
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)): speed up execution on multiple repos
- [os](https://docs.python.org/3/library/os.html): path name manipulations, file checks, etc

[releases](https://github.com/nosarthur/gita/releases)

I will use `$` to denote command line input and `>` as output.

## milestone 1: basic CLI

This milestone enables the following features

- add, remove repos
- display path of registered repo

```
$ gita add /a/b/c /a/d/f
> 2 repos are added
```

## milestone 2: git integration

1. modify `add` such that only git repo paths are considered as valid path

2. refactor subcommands

link argparse example

3. add `ll` subcommand

```
$ gita ll
> repo1 master     This is a commit message
> repo2 fix-a-bug  This is also a commit message
```

4. enhance `ll` subcommand with edit status symbols

## milestone 3: git delegation

1. delegate `fetch`, `pull`, `push`

2. use yaml file

3. add `super` subcommand


## milestone 4: miscelaneous enhancements

2. If environment variable `XDG_CONFIG_HOME` exists, save `repo_path` in `$XDG_CONFIG_HOME/gita/`

4. use `asyncio`

## version 0.3

## version 0.4

## version 0.5

## version 0.6.5

## version 0.7

## version 0.8
