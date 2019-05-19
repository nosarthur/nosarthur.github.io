---
layout: post
title: "Milestone 3 of the gita project: git delegation"
date: 2019-05-26 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---


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


