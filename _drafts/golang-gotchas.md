---
layout: post
title: Golang gotchas
date:   2019-01-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [golang]
---


## loop variable scope

## retrieve undefined elements from reference types

undefined key in `map`

closed `chan`

## slice of empty interfaces

```go
func (db *DB) Query(query string, args ...interface{}) (*Rows, error)
```

```go
ints := int[]{1, 2, 3}
rows, err := db.Query(`select name from foo where id in ($1, $2, $3)`, ints)
```

Type conversion doesn't work
```go
ints.([]interface{})
```

## panic inside goroutine


## loop through unicode string

`range`

## declared pointer type cannot be receiver
