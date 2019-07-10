---
layout: post
title: "Milestone 4 of the gita project: speedup"
date: 2019-06-16 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the second milestone where we speedup the sub-command execution.
The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- milestone 3: git delegation
- **milestone 4: speedup**


2. If environment variable `XDG_CONFIG_HOME` exists, save `repo_path` in `$XDG_CONFIG_HOME/gita/`

4. use `asyncio`


