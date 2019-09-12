---
layout: post
title: A crash course on Golang
date:   2018-11-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [golang]
---

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

The [Go programming language](https://en.wikipedia.org/wiki/Go_(programming_language))
is created by Google in 2009.
Its syntax is similar to C/C++ and Python.
To me, it feels like C with enhancements in native data types (dynamic array and hashmap),
interface-based programming, and concurrency programming.

* It does not have class and inheritance.
* It does not have implicit type conversion, with the exception of `interface`,
  unidirectional channel, and untyped `constant`.
* It does not have exceptions.
* It does not have asserts.
* It does not have default parameters.
* It does not have macros.
* It supports `struct` with data and methods.
* It supports polymorphism from composition.
* It supports concurrency programming based on the [communicating sequential processes (CSP)](https://en.wikipedia.org/wiki/Communicating_sequential_processes) model.
* It supports implicit `interface` matching.
* It supports call-by-value but not call-by-reference (with the exception of reference types such as slice and `map`).
* It has lightweight threads with variable-size stack called *goroutines*.
* It has garbage collection.
* Its function arguments are passed by value.
* Its `import` is like Python and unlike C/C++.

This is a quick-and-dirty tutorial with the goal to get the programmer
into Golang coding.
All code snippets here run with go verion 1.10.1.

A useful place to try snippet out is [Go playground](https://play.golang.org/).

[yaegi](https://github.com/containous/yaegi)

https://gophercises.com

## data types

There are four kinds of data types in golang:

* basic types
    * number
        * `int` and variants
        * `float` and variants
        * `complex` and variants
        * `byte`: alias for `uint8`
        * `rune`: alias for `int32`
    * `string`
    * `bool`
* aggregate types
    * array
    * `struct`
* reference types
    * pointer
    * slice
    * `map`
    * channel `chan`
    * function `func`
    * `interface`
* `reflect.Invalid`


`reflect.Kind()`

The data types can also be categorized by comparability.
Comparable types can be used as hash keys, e.g., keys of the `map` type.

* comparable
    * basic types
    * channel
    * composite types (if its type is comparable)?
        * interface
* not comparable
    * slice
    * `map`
    * functions

Note that the incomparable data types can be compared to `nil`.

There are only 25 keywords and 15 built-in funcitons.
Many of them are the same as C/C++, or Python.
The keywords are

```go
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```

There are kinds of declarations

* `package`
* `var`
* `const`
* `type`
* `func`

there are built-in functions are

```go
append      cap     close   complex     copy    delete
imag        len     make    new         panic   print
println     real    recover
```

`new` is not commonly used because one can initialize with literal

`make` is only for slice, `chan`, and `map`.

### custom types

* type aliasing
* embedding

Aliasing only inherits the data fields whereas embedding inherits both data and
methods.

## data structures

struct

empty `struct` do not cost any memory and can be used as a cheap label for
`map` and `channel`.

array

It is unlike C/C++ where it's a pointer in disguise, more like a structure with indexing capability


Any comparable type can be `map` key.

Somewhat peculiar situations include channel, and composite types such as
`interface`, `struct` and array.

### slice

Three useful operations

- `append`
- `copy`
- slice

```go
a := []int{1, 2}
b := []int{3, 4}
check := a
copy(a, b)
fmt.Println(a, b, check)
// Output: [3 4] [3 4] [3 4]
```

```
var a [10]int
acopy := a
a[0] = 10
fmt.Println("a", a)
fmt.Println("acopy", acopy)

s := make([]int, 10)
s[0] = 10
scopy := s
fmt.Println("s", s)
fmt.Println("scopy", scopy)
```

copy a `map`, one has to copy all the content
```go
a := map[string]bool{"A": true, "B": true}
b := make(map[string]bool)
for key, value := range a {
	b[key] = value
}
```

https://blog.golang.org/go-slices-usage-and-internals

`append` may return a different slice

```go
package main

import (
	"fmt"
)

func main() {
	s := []int{1, 2, 3}
	ss := s[1:]

	ss = append(ss, 4)
	ss[0] += 10
	fmt.Println(s)
}
```
`s` remains as `[1, 2, 3]`, whereas `ss` becomes `10, 3, 4`.

slice a slice does not make copy


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


Fibonacci number

```go
func fib(n int) int {
	a, b := 1, 1
	for ; n > 2; n-- {
		a, b = b, a+b
	}
	return b
}

```

```go
for key, value := range iterable{
    // do something
}
```

```go
s := []int{1, 2, 3}
for _, v := range s {
    v += 10
}
```

The value of `v` is copied.

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

```
package main

import "fmt"

func main() {
	// add a sample
	defer func() { fmt.Println("1") }()
	defer func() { fmt.Println("2") }()
	defer func() { fmt.Println("3") }()
	panic("4")
}
```
* The execution order of `defer` is first-in-last-out

## access control

capitalized variables and functions are public, whereas uncapitalized ones
are private.

This rule applies to both `struct` and packages.

## zero values

At variable declaration, if no explicit initialization is provided, a default
value is set.
According to the [language spec](https://golang.org/ref/spec#The_zero_value),
this zero value is

* `0` for all numeric types
* `false` for booleans
* `""` for strings
* `nil` for reference types, i.e., pointers, functions, interfaces, slices, channels, and maps

For composite types, the initialization is recursive.

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

2 KB

8MB

> When we cannot confidently say that one event happens before the other, then
  the events x and y are concurrent.

> Don't communicate by sharing memory, share memory by communicating.

channel

* communication
* synchronization

three operations

* send
* receive
* close

There are three types of channels: `nil`, unbuffered, and buffered.

For unbuffered channel, both sending and receiving blocks until the other operation happens.

> A data race occurs whenever two goroutines access the same variable
  concurrently and at least one of the accesses is a write.

add an example of using `sync.WaitGroup` for goroutines

quick sort concurrent implementation

(map lookup, type assertion) The third operator that supports an `ok` is channel receive

```go
v, ok = <- ch
```

## principles

- Accept interfaces, return concrete structs.
- composition over inheritance
- communicate to, 
- convention over configuration

## references

<a target="_blank"  href="https://www.amazon.com/gp/product/0134190440/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0134190440&linkCode=as2&tag=nosarthur2016-20&linkId=877bc40d43e96f29e88a72fce2b42d1c"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0134190440&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0134190440" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

<a target="_blank"  href="https://www.amazon.com/gp/product/0131103628/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0131103628&linkCode=as2&tag=nosarthur2016-20&linkId=10408d97f586150cb5e2b22c09b3e8ff"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0131103628&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0131103628" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

* [Go books](https://github.com/dariubs/GoBooks)
* [Official Go wiki](https://github.com/golang/go/wiki)
* [Practical Go](https://dave.cheney.net/practical-go/presentations/qcon-china.html)
* Rob Pike - 'Concurrency Is Not Parallelism'

  {% include youtubePlayer.html id="cN_DpYBzKso" %}

  {% include youtubePlayer.html id="2h_NFBFrciI" %}

* [learning golang from zero to hero](https://milapneupane.com.np/2019/07/06/learning-golang-from-zero-to-hero/)
- [golang FAQ](https://golang.org/doc/faq)
- [Scheduling In Go](https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html)
- [curious channels](https://dave.cheney.net/2013/04/30/curious-channels)
