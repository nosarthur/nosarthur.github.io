---
layout: post
title: A crash course on golang
date:   2017-10-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [go]
---


## data types

* basic types
    * number
    * string
    * boolean
* aggregate types
    * array
    * struct
* reference types
    * pointer
    * slice
    * map
    * function
    * channel
* interface types

* comparable 
    * basic types
    * channel
    * composite types (if its type is comparable)?
        * interface 
* not comparable 
    * slice
    * map
    * functions


## control flow

```
for initialization; condition; post {
    // do something
}
```

```
for key, value := range xx{
}
```

## function

call-by-value

```
func name (parameter-list) (result-list) {
    body
}
```

## polymorphism (method and interface)

implicit type matching 

interface 

* method (subtype polymorphism)
* union (ad hoc polymorphism)


different data structures can have the same method

``` go
t := i.(T)
t, ok := i.(T)
```
If i does not hold a T, the statement will trigger a panic.
with `ok`, no panic and zero value of `T` is assigned
