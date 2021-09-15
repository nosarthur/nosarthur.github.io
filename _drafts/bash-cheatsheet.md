---
layout: post
title: Bash Scripting Cheatsheet
date:   2021-10-11 13:00:00 -0500
categories: [coding]
comments: true
tags: [bash]
---



## looping

- `for`: membership
- `while`:
- `until`

Loop through files in current directory:

```bash
for f in *; do
    echo $f
done
```

Loop through lines in a file:
```bash
while read p; do
    echo $p
done < file
```

Check if `jim` has logged in every minute
```bash
until who | grep jim; do
    sleep 60
done
```

## conditional


- `test`
- `[ ]`
- `[[ ]]`: support logical AND `&&` and OR `||`

pattern | meaning
---|---
`-r file` | exists and readable
`-d file` | exists and is a directory
`-z string` | zero length


## variable substitution

pattern | meaning
---|---

`${var-default}` | Use `var` if set; otherwise use `default`
`${var##pattern}` |
`${var%%pattern}` |
`${var//pattern/replacement}` |


