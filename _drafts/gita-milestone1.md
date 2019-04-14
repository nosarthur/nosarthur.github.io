---
layout: post
title: "Milestone 1 of the gita project: basic CLI"
date: 2019-04-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

 command-line interface with subcommand

## 1. add `add` and `rm` subcommands

Use argparse to implement a CLI with the following behavior

```
$ gita add xxx
> xxx is added
$ gita rm xxx
> xxx is removed
```

## 2. enhance `add` subcommand

If the `add` argument is a valid directory, e.g., `/a/b/c`,
save it in the file `~/.gita/repo_path` where `~` denotes user home directory
(these are Linux system conventions).

```
```

Here the rationale is that `c` is the repo name.

With multiple input, save all valid paths and separate them with `:`.

```
$ gita add /a/b/c /d/e
> c is added
> e is added
```

If you are new to the Python `os` module, take a look at [this link](https://automatetheboringstuff.com/chapter8/).

## 3. add `ls` subcommand

List all repo names saved in `repo_path` file.

```
$ gita ls
> c e
```

## 4. enhance `rm` subcommand

If the folder names exist, delete them from the `repo_path` file.

## 5. add tests

Test the behavior of `add`, `rm`, `ls`, and any other utility function.
There are a few things to check

- adding invalid path should not succeed
- adding the same path multiple times should not result in redundant repos
- removing a non-existent repo should not cause traceback


