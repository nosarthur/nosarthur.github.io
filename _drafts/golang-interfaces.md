---
layout: post
title: Golang interfaces
date:   2018-08-11 13:00:00 -0500
categories: [coding]
comments: true
tags: [golang]
---



```go
type error interface {
	Error() string
}
```
To create an error

```go
package main

import (
	"fmt"
	"errors"
)

func main() {
	fmt.Println("Hello, playground")
	err := fmt.Errorf("something went wrong.")
	fmt.Println(err)
	err = errors.New("something else went wrong.")
	fmt.Println(err)
}
```

```go
type Stringer interface {
    String() string
}
```

## network


```go
type Addr interface {
	Network() string
	String() string
}

type Conn interface {
    Read(b []byte) (n int, err error)
    Write(b []byte) (n int, err error)
    Close() error
    LocalAddr() Addr
    RemoteAddr() Addr
    SetDeadline(t time.Time) error
    SetReadDeadline(t time.Time) error
    SetWriteDeadline(t time.Time) error
}

type Listener interface {
	Accept() (Conn, error)
	Close() error
	Addr() Addr
}
```
    
```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}

type ResponseWriter interface {
    Header() Header
    Write([]byte) (int, error)
    WriteHeader(int)
}
```

## io

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

type Seeker interface {
	Seek(offset int64, whence int) (int64, error)
}

type ReadWriter interface {
    Reader
    Writer
}

type ReadCloser interface {
	Reader
	Closer
}

type WriteCloser interface {
    Writer
    Closer
}

type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}

type ReadSeeker interface {
	Reader
	Seeker
}

type WriteSeeker interface {
	Writer
	Seeker
}

type ReadWriteSeeker interface {
	Reader
	Writer
	Seeker
}
```


```go
type ByteReader interface {
	ReadByte() (byte, error)
}

type ByteScanner interface {
	ByteReader
	UnreadByte() error
}

type ByteWriter interface {
	WriteByte(c byte) error
}

type RuneReader interface {
	ReadRune() (r rune, size int, err error)
}

type RuneScanner interface {
	RuneReader
	UnreadRune() error
}
```
