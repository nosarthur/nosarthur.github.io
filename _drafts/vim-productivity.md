---
layout: post
title: How to be productive with vim environment (and stay mouseless)
date: 2019-05-05 17:00:00 -0500
categories: [coding]
comments: true
tags: [vim]
---

I started using Linux in 2002 and soon got fascinated by the terminal environment.
The command-line tools have clean interfaces and are incredibly powerful and robust.
In comparison, the graphical tools in either Windows or Linux are too
complicated and inefficient to use.

Thus I try to stay away any graphical programs, except the web browser (I have
tried a few terminal based web browsers and they are of no comparison).
As a result, I use chromebook.

One major task in Linux terminal is to edit files. I somehow picked the vim.



- vim usage
- bash in vim mode
- browser with vim key bindings
- programmable keyboard


## vim

Here I only list the most common ones I use daily.
I probably only used less than 10% of the vim's capacity.

navigation keys | meaning
--- | ---
`j`, `k`, `h`, and `l` | move cursor up/down/left/right
`gg` and `G` | go to the first/last line of the file
`nG` or `:n` | go to line `n` where `n` is a number
`g,` and `g;` | go to the last/previous change
`%` | go to first matching parenthesis/bracket
`+`, `-`, and `^` (or `_`) | go to first non-blank character in the next/previous/current line
`0` and `$` | go to beginning/end of line
`gd` | go to the local definition of the word under cursor
`ctrl + y` and `ctrl + e` | move the screen upward/downward one line while keeping the cursor location
`ctrl + f` and `ctrl + b`| move the cursor forward/backward one screen
`ctrl + u` and `ctrl + d` | move the cursor upward/downward half screen
`ctrl + o` | go to the previous cursor position in jump list (I use it mostly for go to the previous file)
`ctrl + ^` | go to the alternative file (mostly likely the previous file)
`zt`, `zb`, and `zz` | move the screen such that the cursor is at the top/bottom/middle of the screen
`H`, `L`, and `M`  | go to the top/bottom/middle of screen
`]m` and  `[m` | next/previous method
`]c` and `[c` | next/previous change
`*` and `#`| search forward/backward for the current word
`/` and `?` | search forward/backward
`fx` | find the next occurrence of `x`

Another useful key combo is `ctrl + p` for auto completion. But I use a plugin called
[supertab](https://github.com/ervandew/supertab) so I seldom it.

text edit keys | meaning
--- | ---
`esc`, `v`, and `i`, `a`, `o` | enter normal/visual/edit mode
`c`, `d`, `y` | change, delete, yank
`x` | delete
`~` | switch upper/lower case for the current letter
`gu` | change to lower case
`gU` | change to upper case
`u` | undo
`ctrl+r` | redo
`.` | repeat the previous edit
`@:` | repeat the previous vim command, `@@` works if it has been repeated at least once

file keys | meaning
--- | ---
`:e <fname>` | edit <fname>
`vim -O <fname1> <fname2>` | open two files in vertical split windows
`ctrl+g` | display some basic information of the file (I use a plugin called [lightline](https://github.com/itchyny/lightline.vim) which displays such information by default)

window keys | meaning
--- | ---
`ctrl+w+v` | split window vertically
`ctrl+w+ctrl+w` | cycle through the windows
`ctrl+w` then `H` or `J` or `K` or `L` | move the current window to other locations (I only use this to turn horizontally split windows to vertically split windows)
`:vert sf <fname>` and `:vert new` | open <fname>/a new buffer in a new vertical split window
`on` | close all other windows
`:wincmd` | equivalent of `ctrl+w`

other keys | meaning
--- | ---
`:term`| create a terminal buffer (requires vim 8.1)
`:h <keywords>` | get help on <keywords>, for example, `:h navigation`

To manage vim plugins, I use [vim-plug](https://github.com/junegunn/vim-plug).
It is a newer tool than vundle and pathogen.

in `.vimrc` .

`:PlugInstall`

This automated plugin installation is similar to vundle, but vim-plug allows
finer control on the installation and plugin loading.

## bash command-line editing

In my `.bashrc` file, I have

```
export EDITOR=vim
```
which sets `vim` as the default editor for shell.

Often times one needs to fix a mis-typed command in terminal. This can be done
using the `fc` command (fix command), which triggers the shell's default editor.


Bash has two edit modes for command editing, the emacs mode and vi` mode.

By default, the bash input mode is Emacs. So in order to modify the current
command using vim

`ctrl+x ctrl+e`

The `fc` command can bring up the default editor (say vim) to edit the previous command.


`.bashrc`

```
set -o vi
```

key combo | meaning
--- | ---
`ctrl+u` | clear the command
`ctrl+r` | search command in history

## iTerm2

[](https://www.iterm2.com/)

different colors for  

mouseless copy

`apple + shift + c`

key combo | meaning
--- | ---
`apple + tab` | switch app
``apple + ` `` | switch window for the same app

## browser

I used [vimium](https://vimium.github.io/) for a while and then found out
[surfingkeys](https://brookhong.github.io/#).

Many of their key bindings are the same.
Both of them are somewhat buggy. I notice both of them have problems with `/`,
which is search.

- [surfingkeys for chrome](https://chrome.google.com/webstore/detail/surfingkeys/gfbliohnnapiefjpjlpjnehglfpaknnc)
- [surfingkeys for firefox](https://addons.mozilla.org/en-US/firefox/addon/surfingkeys_ff/)

key combo | meaning
--- | ---
`x` | close the tab
`X` | reopen the recently closed tab
`r` | reload tab
`j`, `k`, `h`, and `l` | move page up/down/left/right
`f` | display key combo for links
`/` | search

## mechanical keyboard

anne pro2 red switch

smart tap

old | new
--- | ---
caplock | `/~
left alt | ctrl
left ctrl | fn2
fn2 | ctrl
right ctrl | caplock

so that changing tty is easier: ctrl + fn + alt + <number>

