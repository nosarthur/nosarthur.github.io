---
layout: post
title: Step by step break down of the gita project
date: 2019-04-06 01:00:00 -0500
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

- command-line interface with subcommand

### 1. add `add` and `rm` subcommands

Use argparse to implement a CLI with the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm xxx
> xxx is removed
```

### 2. enhance `add` subcommand

If the `add` argument is a valid directory, e.g., `/a/b/c`,
save it in the file `~/.gita/repo_path` where `~` denotes user home directory.

```
$ gita add /a/b/c
> c is added
```

Here the rationale is that `c` is the repo name.

With multiple input, save all valid paths and separate them with `:`.

```
$ gita add /a/b/c /d/e
> c is added
> e is added
```

### 3. add `ls` subcommand

List all repo names saved in `repo_path` file.

```
$ gita ls
> c e
```

### 4. enhance `rm` subcommand

If the folder names exist, delete them from the `repo_path` file.

### 5. add tests

Test the behavior of `add`, `rm`, `ls`, and any other utility function.
There are a few things to check

- adding invalid path should not succeed
- adding the same path multiple times should not result in redundant repos
- removing a non-existent repo should not cause traceback

## milestone 2: add git functionalities

1. modify `add` such that only git repo paths are considered as valid path

2. refactor subcommands

3.

## milestone 3: minor tunings

2. If environment variable `XDG_CONFIG_HOME` exists, save `repo_path` in `$XDG_CONFIG_HOME/gita/`

## version 0.3

## version 0.4

## version 0.5

## version 0.6.5

## version 0.7

## version 0.8
