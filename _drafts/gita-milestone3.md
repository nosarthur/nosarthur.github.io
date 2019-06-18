---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-05-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- milestone 1: basic CLI
- milestone 2: git integration
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


