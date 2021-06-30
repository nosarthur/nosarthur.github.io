---
layout: post
title: How to setup bare repo for dotfiles using gita
date: 2021-06-07 17:00:00 -0500
categories: [productivity]
comments: true
tags: [dotfiles]
---

I wrote a commandline tool to manage multiple git repos called [gita](https://github.com/nosarthur/gita)
and there have been many interesting feature requests.
Recently several people requested the support for bare repos and it turns out
to be a popular way to manage dotfiles. See for example

- [The best way to store your dotfiles: A bare Git repository](https://www.atlassian.com/git/tutorials/dotfiles)

In this post, I will show how `gita` helps to achieve it.

## the rationale

I used to have a regular git repo for my dotfiles which is basically the `.vim`
folder contaminated with bash scripts.
When cloned to a new computer, it requires some copying/moving/symbolic linking.
In the new approach, `$HOME` is the worktree folder thus every file is placed
in the correct place automatically.

In case you are not familiar with [worktree](https://git-scm.com/docs/git-worktree),
it basically allows different copies/branches/commits to exist in different
`worktree` folders. It is more straightforward than stashing and switching
between branches, and is less expensive than cloning another copy of the repo.
See this stackoverflow page for more information

- [What would I use git worktree for?](https://stackoverflow.com/questions/31935776/what-would-i-use-git-worktree-for)

On the other hand, a bare repo is exactly the `.git` folder of a regular repo.
Roughly speaking, it only consists of all the commits' diff files without a
real copy of the content.
As a result, one cannot work on it directly, and only pushing and cloning are
allowed. Its prototypical use is the remote repo.

To summarize, a regular git repo with an extra worktree has the following
structure

```
├── another worktree folder
│   └── content, say a different branch
└── regular repo (standard worktree folder)
    ├── content
    └── .git (equivalent to a bare repo)
```

There is actually no restriction on the worktree folder location. In the bare
dotfiles approach, `$HOME` is the worktree since that's where the dotfiles
reside in. In other words, the `git` command will be fired as

```
git --work-tree=$HOME --git-dir=<bare-dotfiles-repo-path> <whatever-command>
```

## the procedures

Here I will create the bare dotfiles repo from scratch instead of converting a
regular dotfiles repo into a bare one.

```
git init --bare $HOME/.config/dotfiles
echo dotfiles >> $HOME/.config/dotfiles/.gitignore
```

The folder doesn't have to be in `$HOME/.config/`. In case it is, the
`.gitignore` ensures that the bare repo won't include itself.
At this point, also set up a remote repo say on Github.

Then run the following commands, given `gita` has already been installed, say
via `pip3 install -U gita`,

```
gita add -b $HOME/.config/dotfiles
gita flags set dotfiles --work-tree=$HOME
gita super dotfiles config --local status.showUntrackedFiles no
gita super dotfiles add ~/.vimrc ~/.bashrc ~/.inputrc ~/.git-completion.bash ~/.git-prompt.sh ~/.gitconfig ~/.vim ~/.fzf.bash
gita push dotfiles
```

```
gita super dotfiles ci -am 'modify history'
```


On a different machine,

```

git clone --bare <repo-URL>
```
