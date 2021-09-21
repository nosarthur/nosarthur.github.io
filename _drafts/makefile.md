---
layout: post
title: Makefile
date:   2021-09-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [python]
---




[Managing Projects with GNU Make, Third Edition By Robert Mecklenburg](https://www.oreilly.com/openbook/make3/book/)

- rules
    - explicit
    - implicit
    - pattern


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
