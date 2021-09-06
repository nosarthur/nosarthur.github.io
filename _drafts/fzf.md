---
layout: post
title: Using FZF for command line productivity boost
date: 2021-09-02 07:00:00 -0500
categories: [productivity]
comments: true
tags: [fzf]
---

I discovered [fzf](https://github.com/junegunn/fzf) a few years ago and it has
greatly improved my command line productivity.
In this post, I will explain how it works and my 3 everyday usage cases.

- basic concepts
- 3 usage cases
  - navigate directories combined with `z`
  - edit source file in a git repo
  - kill jobs



The author [Junegunn Choi](https://github.com/junegunn)
also created [vim-plug](https://github.com/junegunn/vim-plug) and many other
useful vim plugins.


## basic concepts

Fzf is a command-line fuzzy finder.

If you know the unix `pick` command, `fzf` is simply `pick` with fuzzy
filtering as you type keywords. Please feel free to skip to the usage case.

If you run `fzf` in shell directly, the default behavior is to show all files
in current directory recursively as choices, i.e., `find * -type f`.
Typing any words will further fuzzily limit the choices, and hitting the Enter
key makes the choice.

The default behavior is controlled by `FZF_DEFAULT_COMMAND`. For example
you can use [`fd`](https://github.com/sharkdp/fd) instead of `find` by adding
the following line in the `.bashrc`

```
export FZF_DEFAULT_COMMAND='fd --type f'
```

You can pass choices to `fzf too, for example

- `ps -ef | fzf`
- `ls *.txt | fzf`
- `qstat -u $USER | fzf`
- `cat data.csv | fzf`


I use a command line note taking program called [notes](https://github.com/pimterry/notes)
and I have this line in my `.bashrc`

```bash
alias vn='v `ls ~/notes |fzf`'
```

Here `v` is my alias to `vim`.


## edit source files in a git repo


[fzf.vim](https://github.com/junegunn/fzf.vim)

```
nmap <leader>f :GFiles!<CR>
nmap <leader>o :Files!<CR>
```

```bash
fe() {
  IFS=$'\n' files=($(fzf-tmux --query="$1" --multi --select-1 --exit-0))
  [[ -n "$files" ]] && ${EDITOR:-vim} "${files[@]}"
}
```


## directory navigation combined with `z`

[z](https://github.com/rupa/z)

```bash
z() {
  [ $# -gt 0 ] && _z "$*" && return
  cd "$(_z -l 2>&1 | fzf --height 40% --nth 2.. --reverse --inline-info +s --tac --query "${*##-* }" | sed 's/^[0-9,.]* *//')"
}
```

## kill jobs

I use `qstat` to view submitted jobs to a cluster and
`qdel` to delete unwanted jobs in my work.

```bash
export FZF_DEFAULT_OPTS='--height 40% --layout=reverse --border --multi'
```

```bash
alias qd='qdel `q | tail -n +3| fzf |c1`'
```

Here `c1` is another alias to extract the first column.

```bash
alias c1="awk '{print \$1}'"
```

And `q` is my tailored `qstat` command
```bash
alias q='qstat -u $USER| tee >(tail -n +3 |wc -l)'
```

The same idea works for local jobs with `ps` and `kill` too.
