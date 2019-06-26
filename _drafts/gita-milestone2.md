---
layout: post
title: "Milestone 2 of the gita project: git integration"
date: 2019-07-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the second milestone where we list detailed information of the repos.
The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- **milestone 2: git integration**
- milestone 3: git delegation
- milestone 4: speedup


## v0.1.1: add only git repo paths

In milestone 1, we add any existing folder to `repo_path`.
In reality, we only want to add git repo folders.



One way to detect git repos is to look for `.git` in the repo root folder.
A regular repo has `.git` as a folder whereas repos generated with `git worktree`
or `git submocule` has it as a file. Thus we can simply check its existence.

The more formal way is to use the `git xx` command. Unlike the simple method
where one has to pass the project root path, this command is able to detect
git repo in the sub-folders too. But obviously it will be slower, and there is
the extra work of looking for the root path.

## v0.1.2: add `ll` sub-command

The main feature of milestone 2 is the `gita ll` sub-command for displaying
detailed information of all repos, such as branch name, relationship between
local and remote branches, edit status, commit message, etc.

All such information comes from executing some git commands. For example

- branch name: `git`
- edit status
    - unstaged changes: `git`
    - staged changes: `git`
    - untracked files: `git`
- commit message: `git`

This is the second part of the **R** of our CRUD API.

## v0.1.3: enhance `ll` sub-command with edit status symbols

