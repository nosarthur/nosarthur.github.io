---
layout: post
title: Make a Python command-line tool to dispatch git commands
date: 2019-05-27 09:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

[gita]: https://github.com/nosarthur/gita

This is a step-by-step guide to build a command-line tool to manage multiple
git repos, and learn modules such as

- [argparse](https://docs.python.org/3/library/argparse.html):
  define command line interface (CLI) with sub-commands
- [os](https://docs.python.org/3/library/os.html):
  manipulate path names, check file existence, etc
- [yaml](https://github.com/yaml/pyyaml/): parse configuration files
- [subprocess](https://docs.python.org/3/library/subprocess.html): delegate terminal commands
- [pytest](https://docs.pytest.org/en/latest/): write tests
- [asyncio](https://docs.python.org/3/library/asyncio.html)
  (or [threading](https://docs.python.org/3/library/threading.html),
  [multiprocessing](https://docs.python.org/3/library/multiprocessing.html),
  [concurrent](https://docs.python.org/3/library/concurrent.html)):
  speedup execution of multiple tasks

In addition, I will cover engineering practices such as packaging and continuous integration.

This [command-line tool][gita] has two functionalities:

1. display information of all the registered repos side by side;
1. delegate git commands for any number of repos from any working directory.

The official version is called [gita][gita].
It has about **200 lines of code and over 900 stars** on [Github][gita].

![gita](https://github.com/nosarthur/gita/raw/master/doc/screenshot.png)

I break up the project into 5 milestones

- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- [milestone 4: speedup]({% post_url 2020-07-08-gita-milestone4 %})
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

The rest of this post is a brief overview.

## milestone 1: basic CLI

Here the goal is to build a command-line interface (CLI) using the `argparse`
module. Specifically, we will implement three sub-commands `add`, `rm`, and `ls`, to

- add / remove repos
- display names and file paths of registered repos

The intended behavior is shown in the following example, where
I denote the command-line input with `$` and the output with `>`.

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
> repo2 hot-fix *    Fix some bug
```

Under the hood, each piece of information comes from executing a git
command using the `subprocess` module.

## milestone 3: git delegation

In this milestone, we are going to

- delegate git commands for repos
- define custom git command delegation with a YAML file
- add a `super` sub-command to delegate arbitrary git commands

The purpose of delegation is to run git commands

1. from any working directory,
2. in batch.

For example, `gita pull some-repo` executes `git pull` for `some-repo`,
and `gita fetch` runs `git fetch` for all repos.

This is the most fun milestone where we build powerful features upon
the infrastructure laid out in the previous milestones.

## milestone 4: speedup

Here we will use `asyncio` library to speedup the git command delegation for
multiple repos.
You are free to use the alternative libraries to achieve the same goal.

## milestone 5: miscellaneous topics

Here the topics include writing shell script for command auto-completion,
and marketing an open source project.

## general references

- [Python3 module of the week](https://pymotw.com/3/): full of examples
- [Python standard library](https://docs.python.org/3/library/): it's official!
- [Google engineering practices](https://arxiv.org/abs/1702.01715): no need for intro
