---
layout: post
title: A crash course on Golang
date:   2018-08-11 13:00:00 -0500
categories: [coding]
comments: true
tags: [golang]
---

The [Go programming language](https://en.wikipedia.org/wiki/Go_(programming_language))
is a modern language create in Google in 2009.
It is close to C/C++ and Python and to me, it is like C with enhancements.

* It does not have class and inheritance.
* It does not have implicit type conversion.
* It supports `struct` with data and methods.
* It supports polymorphism from composition.
* It supports concurrency.
* It has pointer but not reference.
* It has garbage collection.
* Its function arguments are passed by value.
* Its `import` is like Python and there is no implicit lookup.

This is a quick-and-dirty tutorial with the goal to get the programmer
into Golang coding.
All code snippets here can run in [Go playground](https://play.golang.org/).

## data types

* basic types
    * number
        * `int` and variants
        * `float` and variants
        * `complex` and variants
        * `byte`: alias for `uint8`
        * `rune`: alias for `int32`
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

There are only 25 keywords and many of them are the same as C/C++, or Python.

```go
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```

## function

call-by-value

```
func name (parameter-list) (result-list) {
    body
}
```


## control flow

```go
for initialization; condition; post {
    // do something
}
```

```go
for key, value := range iterable{
    // do something
}
```



## examples

```go
a := map[int]bool{3: false}
a[1] = true
fmt.Println(a[1], a[2], a[3])
for k, v := range a {
    fmt.Println("key", k, "value", v)
}
if x, ok := a[2]; ok {
    fmt.Println("a[2] exists", x)
} else {
    fmt.Println("a[2] doesn't exist")
}
if x, ok := a[3]; ok {
    fmt.Println("a[3] exists", x)
}
```
* Instantiation can be done via `Type{}`. Initialization values can be put in
  `{}` as well.
* For `map`, accessing an undefined key returns the null value of the corresponding type.
* `for` loop only loops through defined keys and values.
* `x, ok := a[i]` is able to detect the existence of keys.

```go
s := "Hi, 世界"
fmt.Println(len(s))
for i, c := range s{
    fmt.Println(i, string(c))
fmt.Println(s[4], reflect.TypeOf(s[4]))
}
```
* The `len` of `s` is 10.
* The `for` loop outputs
  ```
  0 H
  1 i
  2 ,
  3
  4 世
  7 界
  ```

## encapsulation and polymorphism 

(method and interface)

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

## concurrency


## references

* [Go books](https://github.com/dariubs/GoBooks)

* Rob Pike - 'Concurrency Is Not Parallelism'

  {% include youtubePlayer.html id="cN_DpYBzKso" %}
