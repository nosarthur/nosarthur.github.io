---
layout: post
title: How to be productive with Vim environment and stay mouseless
date: 2020-06-27 17:00:00 -0500
categories: [productivity]
comments: true
tags: [Vim]
---

I started to use Linux back in 2002 and since then Vim has been my main editor.
In this post, I will introduce the basic usage of Vim,
as well as extending Vim experience to bash and browsers.

- [basic Vim usage](#basic)
- [bash in Vim mode](#bash)
- [Vim-like browser plugins](#browser)
- [Miscellaneous improvements](#misc)


## <a name='basic'> </a>basic Vim usage

The key concept of Vim is editing mode. The main ones are

mode | purpose | triggering key
---|---|---
normal | text navigation & manipulation | `escape`
insert | text input | `i`, `I`, `a`, `A`, `o`, `O`, `s`, `S`, `c`, `C`
command | more advanced manipulation | `:`
visual | manual text selection | `v`, `V`

Most other text editors have only one mode, which corresponds to the insert mode in Vim.
In this mode, whatever one types becomes the text content.
To navigate to a different location, one needs to use mouse, trackpad, or arrow keys.
In contrast, Vim users would use the normal mode, where certain keys have special
meaning for navigation. Thus one's fingers are on alphanumeric keys almost all time.

Here I list the most common keyboard shortcuts and commands I use.
My `.vimrc` setting is [here](https://github.com/nosarthur/dotfiles/blob/master/vimrc).

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
`*` and `#`| search forward/backward for the current word, exact match
`g*` and `g#`| search forward/backward for the current word, superstring match
`/` and `?` | search forward/backward
`fx` and `Fx`| find the next occurrence of `x` (replace `x` to any letter you want) forward/backward
`(` and `)` | go to the beginning of current/next sentence
`{` and `}` | go to the beginning of current/next paragraph

text manipulation keys | meaning
--- | ---
`c`, `d`, `y` | change, delete, yank
`x` | delete
`~` | switch upper/lower case for the current letter
`gu` | change to lower case
`gU` | change to upper case
`u` | undo
`ctrl+r` | redo
`.` | repeat the previous edit
`@:` | repeat the previous Vim command, `@@` works if it has been repeated at least once
`ctrl+a` and `ctrl+x` | increase/decrease the number under cursor (or right to cursor)

Another useful key combo is `ctrl + p` for auto completion.
But I have some plugins installed for more advanced code completion,
and completion is triggered by `tab`.

file keys | meaning
--- | ---
`:e <fname>` | edit <fname>
`Vim -O <fname1> <fname2>` | open two files in vertical split windows
`ctrl+g` | display some basic information of the file (I use a plugin called [lightline](https://github.com/itchyny/lightline.Vim) which displays such information by default)

window keys | meaning
--- | ---
`ctrl+w+v` | split window vertically
`ctrl+w+=` | resize the split windows equally
`ctrl+w+ctrl+w` | cycle through the windows
`ctrl+w` then `H` or `J` or `K` or `L` | move the current window to other locations (I only use this to turn horizontally split windows to vertically split windows)
`:vert sf <fname>` and `:vert new` | open <fname>/a new buffer in a new vertical split window
`:on` | close all other windows
`:wincmd` | equivalent of `ctrl+w`

other keys | meaning
--- | ---
`:term`| create a terminal buffer (requires Vim 8.1)
`:h <keywords>` | get help on <keywords>, for example, `:h navigation`
`zm` and `zr` | fold and unfold one level
`zM` and `zR` | fold and unfold all

To manage Vim plugins, I use [Vim-plug](https://github.com/junegunn/Vim-plug).
It is a newer tool than [Vundle](https://github.com/VundleVim/Vundle.vim) and [Pathogen](https://github.com/tpope/vim-pathogen).
Overall Vim-plug is similar to Vundle, but allows finer control on the
installation and plugin loading (which I don't use).

## <a name='bash'> </a> bash in Vim mode

Often times one needs to fix a mistyped command in terminal. This can be done
using the `fc` command (fix command), which triggers the Shell's default editor.

In my `.bashrc` file, I have
```
export EDITOR=Vim
```
which sets `Vim` as the default editor for Shell.

Bash has two edit modes for command editing, the Emacs mode and vi mode.
By default, Emacs mode is used. To switch to the vi mode, I put
```
set -o vi
```
in `.bashrc`.
This will allow you to enter normal mode using `escape`.

One drawback is that `ctrl+l` doesn't clear screen anymore. Thus I have this
line in `.bashrc`.
```
bind -m vi-insert 'Control-l: clear-screen'
```

The following combos still work.

key combo | meaning
--- | ---
`ctrl+u` | clear the command
`ctrl+r` | search command in history

## <a name='browser'> </a> Vim-like browser plugins

There are quite a few browser plugins that enable Vim-like navigations (think
about moving the page using `h`, `j`, `k`, `l`).
I tried both [Vimium](https://Vimium.github.io/) and
[Surfingkeys](https://brookhong.github.io/) and settled with Vimium.

Many of their key bindings are the same.
Both of them are somewhat buggy. For example, they both have problems with `/`
occasionally.
Surfingkeys has many more keyboard shortcuts than Vimium, which are not
useful to me. But when it fails, it can
completely mess up the webpage's rendering.

Here is a list of the shortcuts that I use often.

key combo | meaning
--- | ---
`x` | close the tab
`X` | reopen the recently closed tab
`r` | reload tab
`j`, `k`, `h`, and `l` | move page up/down/left/right
`gg` | go to top of page
`G` | go to bottom of page
`f` | display key combo for links
`/` | search text
`yy` | copy URL
`t` | open a new tab
`o` | open a URL in current tab
`O` | open a URL in a new tab
`H` | go back in history
`L` | go forward in history

I also disable it on Youtube and Github.

## <a name='misc'> </a> Miscellaneous improvements

Finally I would like to talk about several minor points.

For a Vim user, escape key is frequently used. Thus I place it to the left of
`a`, i.e., where cap lock key (or search key on Chromebook) is.

As for terminal programs, I use [iterm2](https://www.iterm2.com/) on Mac and
[extraterm](https://extraterm.org/) on Chromebook. Iterm2 has many nice features.
For example, mouseless copy can be triggered by `apple + shift + c`.
I am still new to extraterm and only use its capability for tabs and nice themes.
Let me know if you know any other good ones on Chrome OS.

## Epilogue

I just switched to the beta channel and noticed that the default Crostini
terminal supports tabs. You can also customize keyboard shortcuts for tabs
using (ctrl+shift+p).
Also the themes got a lot better. Thus there is no need for ExtraTerm.
