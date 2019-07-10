---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-05-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the second milestone where we implement sub-commands to delegate git
commands for the repos.
The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- **milestone 3: git delegation**
- milestone 4: speedup


The `yaml` library is not in the Python standard library, and needs to be
installed using

```
pip3 install pyyaml
```


The sub-command formats are

```
gita <sub-command> [repo-name(s)]
gita <sub-command> <repo-name(s)>
```

```
gita super [repo-names(s)] <any-git-command-with-or-without-options>
```




## v0.2.1: delegate `fetch`, `pull`, `push`

## v0.2.2: use yaml file

## v0.2.3: add `super` sub-command


## v0.3: clean up and tag

This completes milestone 3. At this point, you can optionally tag the
code base using

```
git tag v0.3
```

