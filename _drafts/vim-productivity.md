---
layout: post
title: How to be productive with keyboard (and avoid mouse)
date: 2019-05-05 17:00:00 -0500
categories: [coding]
comments: true
tags: [vim]
---

I started using Linux in 2002. Thanks to my geeky roommate, I soon learned to
compile Linux kernels (for no good reasons, only to break the hardware
supports, and to learn the latest fix for various drivers).

I somehow stumbled upon vim and latex, and then never felt the need to install
windows anymore.

I probably only used less than 10% of the vim's capacity.

## vim


navigation keys | meaning
--- | ---
`j`, `k`, `h`, and `l` | move cursor up/down/left/right
`gg` and `G` | go to the first/last line of the file
`g,` and `g;` | go to the last/previous change
`%` | go to first matching parenthesis/bracket
`+` | go to first non-blank character in the next line
`0` and `$` | go to beginning/end of line
`H`, `L`, and `M`  | go to the top/bottom/middle of screen
`gd` | go to the local definition of the word under cursor
`ctrl + y` and `ctrl + e` | move the screen upward/downward one line while keeping the cursor location
`ctrl + f` and `ctrl + b`| move the cursor forward/backward one screen
`ctrl + u` and `ctrl + d` | move the cursor upward/downward half screen
`ctrl + p` | auto completion (I use a plugin called [supertab](https://github.com/ervandew/supertab) so I seldom use this combo)
`ctrl + o` | go to the previous cursor position in jump list (I use it mostly for go to the previous file)
`zt`, `zb`, and `zz` | move the screen such that the cursor is at the top/bottom/middle of the screen
`]m` and  `[m` | next/previous method
`]c` and `[c` | next/previous change
`*` and `#`| search forward/backward for the word under cursor
`/` and `?` | search forward/backward


text edit keys | meaning
--- | ---
`esc`, `v`, and `i`, `a`, `o` | enter normal/visual/edit mode
`c`, `d`, `y` | change, delete, yank
`x` | delete
`~` | switch upper/lower case
`gu` | change to lower case
`gU` | change to upper case
`u` | undo
`ctrl+r` | redo

file keys | meaning
--- | ---
`:e <fname>` | edit <fname>
`vim -O <fname1> <fname2>` | open two files in vertical split windows
`ctrl+g` | display some basic information of the file (I use a plugin called [lightline](https://github.com/itchyny/lightline.vim) which displays such information by default)

window keys | meaning
--- | ---
`ctrl+w+v` | split window vertically
`ctrl+w+ctrl+w` | cycle through the windows
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

## bash

By default, the bash input mode is Emacs. So in order to modify the current
command using vim

`ctrl+x ctrl+e`

`fc` command can bring up the default editor (say vim) to edit the previous command.


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
caplock | esc
esc | `/~
left alt | ctrl
left ctrl | fn2
fn2 | ctrl
right ctrl | caplock

so that changing tty is easier: ctrl + fn + alt + <number>

