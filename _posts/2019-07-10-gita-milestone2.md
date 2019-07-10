---
layout: post
title: "Milestone 2 of the gita project: git integration"
date: 2019-07-10 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the second milestone where we extract and list detailed information for
repos. The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- **milestone 2: git integration**
- milestone 3: git delegation
- milestone 4: speedup

## v0.1.1: add only git repo paths

In milestone 1, we add any folder to `repo_path` as long as it exists.
In reality, we should only add git repo folders.

For identification, we can check the existence of `.git` in the repo root folder:
regular repos have a `.git` folder and repos generated with `git worktree` or
`git submodule` have a `.git` file.

Alternatively, we can use the `git rev-parse --is-inside-work-tree` command.
Unlike the simple method which requires the project root path as input, this
command can take sub-folders too. The down side is the speed.

Make sure to add tests as you code along, so that the test coverage doesn't drop
significantly over the commits. Strive for > 90% coverage if possible.

## v0.1.2: add `ll` sub-command

Milestone 2's main feature is the `gita ll` sub-command, which displays detailed
information of all repos, such as branch name, relationship between local and
remote branches, edit status, commit message, etc. This is part of **R** in the
CRUD API, and is more useful than `gita ls`.
All the information items come from executing git commands. For example

- branch name: `git rev-parse --abbrev-ref HEAD`
- commit message: `git show-branch --no-name HEAD`

We will implement these two items in this commit and the rest in later commits.
Make sure to try them in your terminal.
If your `git` version is really old, some of these commands may not work.

To execute terminal command inside Python code, we will use the
[subprocess module](https://docs.python.org/3/library/subprocess.html).
We can use the helper function `get_repos()` from milestone 1 to get the repo
names and their paths, and execute the git command with

```python
cmd = 'git show-branch --no-name HEAD'.split()
result = subprocess.run(cmd,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.DEVNULL,
                        universal_newlines=True,
                        cwd=path)
```
Here the standard output is redirected and saved in `result.stdout`,
and the standard error is thrown away.
The `cwd` keyword controls where the `cmd` is run.

In the end, the expected output looks something like

```
$ gita ll
> c       master fix some bug
> my-repo new-feature create some new feature here
> xxx     master refactor some code
```

For Python text formatting,
take a look at [this link](https://docs.python.org/3/library/string.html#format-specification-mini-language).

## v0.1.3: add edit status symbols

I use the [git auto-completion script](https://git-scm.com/book/en/v1/Git-Basics-Tips-and-Tricks)
in my shell environment, and my terminal looks like

```
chronos (master *+) _drafts $
```
Here `chronos` is my user name, `_draft` is the basename of my current path,
and the content in parentheses shows the git repo's branch name and edit status.
Specifically,

- `*`: unstaged change
- `+`: staged change

In this session, we will add these edit status symbols next to the branch names.
I also include a `_` symbol for untracked files.
The corresponding git commands are

- unstaged changes: `git diff --quiet`
- staged changes: `git diff --quiet --cached`
- untracked files: `git ls-files -zo --exclude-standard`

Note that the information is in the `returncode` for the first two commands.
For the third command, we need to check the existence of `stdout`.

## v0.1.4: add local and remote relationship color

Another useful information item is the relationship between the local and
remote branches. In this commit, we will encode it in the color of the branch
name. The colors and their represented situations are

- white: local has no remote
- green: local is the same as remote
- red: local has diverged from remote
- purple: local is ahead of remote (good for push)
- yellow: local is behind remote (good for merge)

The first two situations can be distinguished by command

```
git diff --quiet @{u} @{0}
```
where `@{u}` denotes remote (i.e., upstream) and `@{0}` denotes local head.
If there is no remote branch, the `returncode` is 128.
If local is identical to the remote, the `returncode` is 0.
If some difference exists, the `returncode` is 1.
Unfortunately the `returncode` doesn't tell apart the other three situations.

To distinguished them, we need to first find out the commit up to which the
local and remote are identical.
And then compare the local and remote heads to it.
The git command for this common commit is
```
git merge-base @{0} @{u}
```
Then you can use `git diff --quiet` two more times to tell apart the three situations.

## v0.2: clean up and tag

This completes milestone 2. At this point, you can optionally tag the
code base using

```
git tag v0.2
```

