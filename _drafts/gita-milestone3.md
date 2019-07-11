---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-05-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the third milestone where we implement sub-commands to delegate git
commands for repos.
Specifically, the sub-commands take the format of

```
gita <sub-command> [repo-name(s)]
```
If no repo name is provided, the sub-command applies to all repos. My mostly
used sub-commands are `gita fetch` and `gita pull`.

These sub-commands do not take additional arguments, which limits their usefulness.
We will implement two remedies.
One is sub-command customization, which works for fixed arguments.

The other is the `super` sub-command
```
gita super [repo-names(s)] <any-git-command-with-or-without-options>
```
where one can really execute any command.

There are not many new Python tricks in this milestone. We will use the
infrastructure built in milestone 2 to implement the new features.

The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- **milestone 3: git delegation**
- milestone 4: speedup

## v0.2.1: delegate `fetch`, `pull`, `push`

The delegated sub-commands are basically the same as the bookkeeping
sub-commands such as `gita add` or `gita rm`. But obviously we don't want to
add one function for each sub-command.
One trick is to pass the git command to the sub-parser. For example, suppose
the sub-parser for `pull` command is called `p_pull`. Then we can call

```python
p_pull.set_defaults(func=git_cmd, cmd='git pull')
```
which defines the `cmd` to be executed. And the `git_cmd` function may look like

```python
def git_cmd(args):
    """
    Delegate git command
    """
    repos = utils.get_repos()
    if args.repo:  # with user specified repo(s)
        repos = {k: repos[k] for k in args.repo}
    for path in repos.values():
        utils.exec_git(path, args.cmd)
```

If these snippets look unfamiliar to you, go back to milestone 1.

## v0.2.2: use yaml file for sub-commands

The approach in the previous session still has its caveat.
To add many delegated sub-commands, we have a lot of tedious work.
Fortunately such repetitive effort can be easily automated.
We can build a sub-parser generation process and put the git command information
in text format.

I will use `yaml` files for this purpose.
Alternatively, you can use the `json` files, which is slightly more verbose.

The `yaml` library is not in the Python standard library, and needs to be
installed using

```
pip3 install pyyaml
```
Remember to add it in `requirements.txt` too.

With the yaml file, we can load all the commands and create sub-parsers within
a loop.
I call this file `cmd.yml` and its content looks like

```yaml
pull:
  help: pull remote updates
push:
  help: push the local updates
```
Here I also included help information for the sub-parsers.

After your code works, there is one more deployment issue. By default, only
Python files are packaged into the installation files.

`MANIFEST.IN`

## v0.2.3: enhance yaml file

One minor enhancement for

```yaml
remote:
  cmd: remote -v
  help: show remote settings
```

## v0.2.4: add sub-command customization

Since sub-commands can be defined with yaml file,

## v0.2.5: add `super` sub-command


## v0.3: clean up and tag

This completes milestone 3. At this point, you can optionally tag the
code base using

```
git tag v0.3
```

