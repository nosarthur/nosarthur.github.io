---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-05-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

0. [overview]({% post_url 2019-05-19-gita-breakdown %})
1. milestone 1: basic CLI
2. milestone 2: git integration
3. **milestone 3: git delegation**
4. milestone 4: speedup


The `yaml` library is not in the Python standard library, and needs to be
installed using

```
pip3 install pyyaml
```


The subcommand formats are

```
gita <sub-command> [repo-name(s)]
gita <sub-command> <repo-name(s)>
```

```
gita super [repo-names(s)] <any-git-command-with-or-without-options>
```




1. delegate `fetch`, `pull`, `push`

2. use yaml file

3. add `super` subcommand


