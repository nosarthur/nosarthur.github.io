---
layout: post
title: "Milestone 2 of the gita project: git integration"
date: 2019-07-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the second milestone where we extract and list detailed information for
the repos. The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- **milestone 2: git integration**
- milestone 3: git delegation
- milestone 4: speedup

## v0.1.1: add only git repo paths

In milestone 1, we add folders to `repo_path` as long as they exist.
In reality, we should only add git repo folders.

For identification, we can check the existence of `.git` in the repo root folder:
regular repos have a `.git` folder and repos generated with `git worktree` or
`git submodule` have a `.git` file.

Alternatively, we can use the `git rev-parse --is-inside-work-tree` command.
Unlike the simple method where the project root path is required, this command
can be run in sub-folders too. But it is slower than the other method.

Make sure to add tests as you code along, so that the test coverage doesn't drop
significantly over the commits. Strive for > 90% coverage.

## v0.1.2: add `ll` sub-command

The main feature of milestone 2 is the `gita ll` sub-command. It is the second
part of **R** in the CRUD API, and is more useful than `gita ls`.
It displays detailed information of all repos, such as branch name, relationship
between local and remote branches, edit status, commit message, etc.
All such information comes from executing git commands. For example

- branch name: `git rev-parse --abbrev-ref HEAD`
- commit message: `git show-branch --no-name HEAD`

We will implement these two items in this commit and the rest in later commits.
Make sure to try these commands in your terminal.
If your `git` version is really old, some of these commands may not work.

In our Python code, we will use [subprocess module](https://docs.python.org/3/library/subprocess.html)
to execute terminal command. For example, we can use the helper function
`get_repos()` from milestone 1 to get the repo names and their paths.
And execute the git command with

```python
cmd = 'git show-branch --no-name HEAD'.split()
result = subprocess.run(cmd,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.DEVNULL,
                        universal_newlines=True,
                        cwd=path)
```
Here we redirect the standard output and throw away the standard error.
The redirected `stdout` is saved in the `result.stdout`.
The `cwd` keyword controls where the `cmd` is run.

In the end, the expected output for three repos looks like

```
$ gita ll
> c       master fix some bug
> my-repo new-feature create some new feature here
> xxx     master refactor some code
```

Take a look at [this link](https://docs.python.org/3/library/string.html#format-specification-mini-language)
for text formatting in Python.

## v0.1.3: add edit status symbols

If you have git auto-completion installed, the terminal will look like

```
chronos (master *+) _drafts $
```

If you haven't, I highly recommend you to install them.

- unstaged changes
- staged changes: `--cached`
- untracked files


## v0.1.4: add local and remote relationship color

