---
layout: post
title: GNU Make Cheat Sheet
date:   2022-01-18 03:43:08 -0500
categories: [coding]
comments: true
tags: [Makefile]
---

[Managing Projects with GNU Make, Third Edition By Robert Mecklenburg](https://www.oreilly.com/openbook/make3/book/)


- dependence management
- macro expansion

```
target: prerequisites
        recipe
```
- rules
    - explicit
    - implicit
    - pattern

## variables

- simple
- recursive

## automatic variables

symbol|meaning
---|---
`$@` | target
`$*` | stem of target
`$<` | first prerequisite
`$^` | all prerequisites without duplicates
`$+` | all prerequisites with duplicates
`$?` | all prerequisites that are newer than the target
`$%` | member in archive
`D` | the directory portion, e.g., `$(<D)`
`F` | the file portion, e.g., `$(@F)`

## built-in functions

## user-defined functions

User-defined functions are variables holding texts.

- parameters passed in using `call`
- global variables
- automatic variables
- target-specific variables

## flow control

- `$(if condition,then-part,else-part)`
- `$(foreach variable,list,body)`

##

symbol|meaning
---|---
`-n` | dry run
`-C` | run in specified folder
`-p`| print database
`-t` | touch targets


## `eval`
The argument to `eval` is expanded twice: once when `make` prepares the
argument list for `eval`, and once again by `eval`.


