---
layout: post
title: Todo list with Slack 
date:   2017-01-21 13:43:08 -0500
categories: [side project]
comments: true
tags: [go, polymer, postgres, slack]
---
## introduction

This side project is a web application of todo list.
It has the following components

* Go backend
* Polymer frontend
* Postgres database 
* [Slack slash command](https://api.slack.com/slash-commands)

A working example can be seen [here](http://todoslacker.herokuapp.com/).

The basic data types are Ticket and Todo, and each Ticket may contain multiple Todos.
The frontend only displays the data retrieved from visiting the URL `/data`.
To modify the database, one envolk commands in Slack chatroom, for example, 

```
/ticket/add id:grocery, detail:
/todo/add ticket_id:grocery, item:apples
/todo/add ticket_id:grocery, item:oranges
```
In this post, I will review a few tricks I learned from this project

## HTTP error handling and authentication 


## deployment on heroku

* [deployment](https://devcenter.heroku.com/articles/git)
* [config var](https://devcenter.heroku.com/articles/config-vars)



[sqlite3](https://godoc.org/github.com/mattn/go-sqlite3)
