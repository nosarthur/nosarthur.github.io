---
layout: post
title: Makefile
date:   2021-09-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [python]
---




[Managing Projects with GNU Make, Third Edition By Robert Mecklenburg](https://www.oreilly.com/openbook/make3/book/)


- dependence management
- macro expansion

```
target: prerequisites
        command
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
`-p`| print database
`-t` | touch targets


## `eval`
The argument to `eval` is expanded twice: once when `make` prepares the
argument list for `eval`, and once again by `eval`.


