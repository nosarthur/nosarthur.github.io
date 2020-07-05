---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-07-11 10:00:00 -0500
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
gita super [repo-names(s)] <any-git-command-with-or-without-arguments>
```
where one can really execute any command.

There are not many new Python tricks in this milestone. We will use the
infrastructure built in the previous milestones to implement the new features.

The other posts in this series are linked below

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- **milestone 3: git delegation**
- milestone 4: speedup
- [milestone 5: miscellaneous topics]({% post_url 2020-07-04-gita-milestone5 %})

## v0.2.1: delegate `fetch`, `pull`, `push`

The delegated sub-commands are basically the same as the bookkeeping
sub-commands such as `gita add` or `gita rm`. But obviously we don't want to
add one function for each sub-command.
One trick is to pass the git command to the sub-parser and have a function
`git_cmd` to process all the commands. For example, suppose the sub-parser for
the `pull` command is called `p_pull`. Then we can call

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

## v0.2.2: improve the output from multiple repos

When running delegated git commands for multiple repos, it could be hard to
identify which message belongs to which repo. The goal of this session is to
improve the output. Specifically,

- every line of message should begin with the repo name
- output from different repos should be separated by a blank line

For example,

```
$ gita pull
> repo-abc: ars tarstarstarst
> repo-abc: arstarstarstarst
> repo-abc: 1 file changed, 6 insertions(+), 6 deletions(-)
>
> another-repo: tasra arstarst astars assss aoo
> another-repo:    8298023..d33b002  master     -> origin/master
>
> repo21: Already up to date.
```

## v0.2.3: use yaml file for sub-commands

The approach in the previous session still has its caveat.
To add many delegated sub-commands, we have a lot of tedious work.
Fortunately such repetitive effort is easy to automate.
We can build a sub-parser generation process and put the git command information
in text format.

I will use `yaml` files for the text representation, and the parsing is not
provided in the Python standard library.
Alternatively, you can use `json` files, which is supported by the standard
library. But they are slightly more verbose.

To install `yaml` parser, run
```
pip3 install pyyaml
```
Remember to add it in `requirements.txt` too.

With the yaml file, we can load all the commands and create sub-parsers within
a loop.
I call this file `cmds.yml` and its content looks like

```yaml
pull:
  help: pull remote updates
push:
  help: push the local updates
```
Here the entry names are the delegated git commands.
I also included help messages for the sub-parsers.

After your code works, there is one more deployment issue. By default, only
source code files are packaged into the installation files. To include
`cmds.yml` for distribution, we need to have a `MANIFEST.IN` in the project
root folder with the following content

```
include gita/cmds.yml
```
It simply tells the packager where the files are.

In the `setup.py`, we need to add a line of

```python
include_package_data=True,
```
to enable the inclusion of non-source-code files.

## v0.2.4: enhance yaml file

One minor enhancement for our yaml representation is to include git commands
with arguments. For example, `git remote` is not as useful as `git remote -v`,
and we can define `gita remote [repo-name(s)]` to have the latter behavior.
To implement it, we can use an extra field for the full command, say, `cmd`, as
seen below
```yaml
remote:
  cmd: remote -v
  help: show remote settings
```

Then in the Python code, we can execute this `cmd` instead of the entry/sub-command name.

I also have other shortcut defined such as
```yaml
br:
  cmd: branch -vv
  help: show local branches
stat:
  cmd: diff --stat
  help: show edit statistics
```

This feature is analogous to shortening long commands with git alias.

## v0.2.5: add sub-command customization

So far we have made the generation of delegated sub-commands really cheap. One
low-hanging fruit is to allow users to define their own sub-commands in an
additional yaml file, say inside `~/.config/gita/`.
The code change is to have the sub-parser generation code process this file.

## v0.2.6: add `super` sub-command

This `super` sub-command will allow us to execute any git commands with any
arguments. It works even with any git aliases on user's computer. For example,

```
gita super co prev-release
```
will checkout the `prev-release` branch for all repos, given the git alias `co`
for `checkout` exists.

The implementation is not too different from the other sub-commands.
You may want to checkout `argparse.REMAINDER` for the `nargs`.

## v0.3: clean up and tag

This completes milestone 3. At this point, you can optionally tag the
code base using

```
git tag v0.3
```

