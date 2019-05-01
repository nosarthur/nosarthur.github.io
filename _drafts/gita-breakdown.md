---
layout: post
title: Break down of the gita project
date: 2019-04-16 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This series of posts are written for beginner Python developers who are looking
for small practice projects.
Here I will break down a command line tool into incremental commits.

In this post, I will break down one of my python side project
[gita](https://github.com/nosarthur/gita) into incremental commits
The ideal audience is a beginner python developer who is not
familiar with the [Python standard libraries](https://docs.python.org/3/library/).

By following this guide, you will learn the following modules

- [argparse](https://docs.python.org/3/library/argparse.html):
  define command line interface (CLI) with subcommands
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate git commands
- [os](https://docs.python.org/3/library/os.html):
  path name manipulations, file checks, etc
- yaml: configure delegated git commands
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)):
  speed up execution on multiple repos

milestones

1. basic CLI
2. git integration
3. git delegation
4. miscelaneous enhancements

In the terminal examples, I will use `$` to denote command line input and `>`
to denote output.

## the end product

This [gita](https://github.com/nosarthur/gita) project is a command-line tool
to manage multiple git repos. Specifically, it delegates git commands for any
number of repos from any directory. It also displays all repos' information
side by side such as branch, edit status, commit messages, etc.
It is about 200 lines of code and has close to 600 stars on Github.

![gita](https://github.com/nosarthur/gita)

## milestone 1: basic CLI

In this milestone, we implement a CLI with three subcommands `add`, `rm`,
and `ls`, which allows us to

- add, remove repos
- display path of registered repo

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

## milestone 2: git integration

Concretely,

```
$ gita ll
> repo1 master *    A nice feature
> repo2 hot-fix *   Fix some bug
```


## milestone 3: git delegation

The features in this milestone are

- delegate various git commands for repos
- use yaml file for custom git command delegation
- add a `super` subcommand that delegate any git command

The purpose of delegation is that git command can be executed from any directory.
For example, run `git fetch` for all repos.

## milestone 4: miscelaneous enhancements


## references

The documents of the python standard library can sometimes be scarse.

python3 module of the week

which is full of examples.
