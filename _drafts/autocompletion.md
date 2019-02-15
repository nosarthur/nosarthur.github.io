---
layout: post
title: Write bash auto completion script for python program
date:   2019-02-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [bash, python]
---


Tab auto completion is a great time saver for terminal users.

Recently I learned how to write bash script auto completion for my custom
python script.
In this post, I will give examples about the process.

The command line tool I wrote manages multiple git repos, called [gita]()
delegates git commands/aliases from any working directories.
Its typical usage is

```bash
gita <sub-command> <repo-name(s)>
```

It is written in python.

There are two ways to get bash auto completion

* py
* bash script

## get command line options

## 
