---
layout: post
title: "Milestone 5 of the gita project: miscellaneous topics"
date: 2020-07-04 01:00:00 -0500
categories: [side project]
comments: true
tags: [python, git]
---

This is the fifth and last milestone where we make further enhancements such
as repo groups and bash shell auto completion.
I will also talk about marketing an open source project.

The other posts in this series are

- [overview]({% post_url 2019-05-27-gita-breakdown %})
- [milestone 1: basic CLI]({% post_url 2019-06-02-gita-milestone1 %})
- [milestone 2: git integration]({% post_url 2019-07-10-gita-milestone2 %})
- [milestone 3: git delegation]({% post_url 2019-07-11-gita-milestone3 %})
- [milestone 4: speedup]({% post_url 2020-07-08-gita-milestone4 %})
- **milestone 5: miscellaneous topics**

## v0.4.1: repo groups

Often times a project consists of several repos and it's important to keep them
on the same branch and timeline.
It is then helpful to define a repo group, which syntactically behaves
like a repo but semantically delegates to the group members.
For example, instead of calling

```
gita pull repo1 repo2 repo3
```
we can call
```
gita pull my-group
```
where the group `my-group` consists of the three repos.

Another useful call is
```
gita super my-group co 20-3-release
```
which checks out the branch `20-3-release` for all repos in `my-group`.

If you have followed the previous milestones, you will find its implementation
straightforward.

## v0.4.2: bash auto completion

If you use Linux terminal, you probably hit the tab key often to automatically
complete file paths, commands, environment variables, etc.
You may also notice that tab completion doesn't work for all commands.
(Indeed it doesn't work for our work-in-progress gita clone yet).
In this commit we will make it happen.
Specifically, we will auto complete for

1. gita sub-commands
1. registered repo names
1. file paths for `gita add`

For example, if we type `gita` and hit tab, all the sub-commands
will be displayed, something like this
```
$ gita
add          diff         group        ll           merge        pull         reflog       reset        show         stash        tag
br           difftool     info         log          mergetool    push         remote       rm           show-branch  stat         ungroup
clean        fetch        last         ls           patch        rebase       rename       shortlog     st           super        whatchanged
```

If we type `gita p` and hit tab, we will see all the sub-commands that start
with `p`, something like this
```
$ gita p
patch  pull   push
```
If we type `gita pus` and then hit tab, `push` will be completed since it is
already the only match.

As an example for the second auto-completion feature, if we type `gita pull `
 then hit tab, all registered repos will show up.

To make it work, we need to define the auto completion behaviors in a bash script,
say `.gita-completion.bash`.
Inside it, we will have a line

```
complete -F _gita_completions gita
```
Here `complete` is the magic word that registers the function `_gita_completions`
for auto-completing the `gita` command.
I won't show details of this `_gita_completions` here.
Hopefully you can figure it out using the pointers below.

You may want to read
[GNU doc: Programmable Completion Builtins](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion-Builtins.html)
for more options for `complete`. Besides `-F` for function, the other common ones
are

- `-W` for a list of fixed words
- `-A` for special actions

Typically you will source `.gita-completion.bash` in the `.bashrc` so that every
new terminal register the auto-completion behaviors for `gita`.

To get the lists of the sub-commands and repos, my current strategies are

- sub-commands: parse the `gita -h` output using `sed`
- repos: use the output of `gita ls`

The other building blocks for the `_gita_completions` function are

- `COMPREPLY`: an array variable for the return of `_gita_completions`
- `compgen`: a utility command that generates word list for auto completion
- `$COMP_WORDS`: the equivalent of `argv`, which contains a list of words in the
  current command line
- `$COMP_CWORD`: the word index in `$COMP_WORDS` where the cursor is at.
  For example, `COMP_WORDS[1]` is the word immediately after the command (say,
  after `gita`)

The following two blog articles give a good summary for bash auto completion.

* [Bash completion tutorial](https://iridakos.com/tutorials/2018/03/01/bash-programmable-completion-tutorial.html): this alone may be enough
* [Adding Bash Completion To a Python Script](https://www.endpoint.com/blog/2016/06/03/adding-bash-completion-to-python-script)

If you never write shell script before, try this book

<a target="_blank"  href="https://www.amazon.com/gp/product/0596009658/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596009658&linkCode=as2&tag=nosarthur2016-20&linkId=544bbc7e0f04c7ad7b1e6577c96f6dc9"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0596009658&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0596009658" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

## marketing an open source project

I am by no means an expert in marketing, and this section is more of my story
on promoting the `gita` project. Please let me know if you have any suggestions
for better results.

The main features of `gita` were finished in early 2018
(see [original blog post here]({% post_url 2018-02-16-gita %})), which roughly
amount to [milestone 3]({% post_url 2019-07-11-gita-milestone3 %}).
After one year's passing, it got 5 stars on GitHub: 3 from my coworkers,
1 from myself, and one from a stranger (I wonder how he found the project).

One day it suddenly occurred to me that I should post it on hacker news.
And this is what happened

- @1am posted on [Hacker News Show](https://news.ycombinator.com/show)
- @6:30am got up with 115 stars and 3 issues
- @1am second day: 274 stars, 1 more issue, and 3 pull requests

I also took a screenshot of the GitHub analytics on the second day.

![two blobs](/assets/gita_spike.png){:width="400px"}

It then went on the HN front page and also the GitHub trending page for that week.
The star/visit ratio is about 1:10, and the star/download ratio is about 1:2.

It tells me that other people find it useful too, and I should keep increasing
its exposure on other platforms.
Here is an incomplete list of them,
roughly ranked by the effectiveness in bringing in traffic.

- [hacker news](https://news.ycombinator.com/item?id=19074170)
- [gank.io](http://gank.io/)
- [Product Hunt](https://www.producthunt.com/posts/gita-2)
- [awesome cli apps](https://github.com/agarrharr/awesome-cli-apps)
- reddit
  - /programming
  - /python
  - /git
  - /commandline
- [open hub](https://www.openhub.net/p/gita0)
- mention gita in my stackoverflow answers about multiple repo management,
  and asyncio usage
- [Hello github](https://hellogithub.com/)
- [Terminals Are Sexy](https://github.com/k4m4/terminals-are-sexy)
- [awesome python applications](https://github.com/mahmoud/awesome-python-applications)
- [github daily](https://github.com/GitHubDaily/GitHubDaily)

Besides them, I also got traffic from other people's recommendations
such as [Ruan Yifeng's blog](https://github.com/ruanyf/weekly).

That's basically all I did for marketing, probably too preliminary.
If you are completely clueless like me, maybe the following articles will be useful.

- [Open Source Guides](https://opensource.guide/)
- [How to promote your open source project](https://linux-audit.com/how-to-promote-your-open-source-project/)
- [How to promote your GitHub project](https://hackernoon.com/how-to-promote-your-github-project-1b39a7eee841)
- [How to get up to 3500+ GitHub stars in one week — and why that’s important](https://medium.freecodecamp.org/how-to-get-up-to-3500-github-stars-in-one-week-339102b62a8f)
- [How to Spread The Word About Your Code](https://hacks.mozilla.org/2013/05/how-to-spread-the-word-about-your-code/)
- [Stackoverflow open source advertising 2019](https://meta.stackoverflow.com/questions/379273/open-source-advertising-1h-2019)

One annoying thing is that GitHub only saves analytics data for two weeks.
You may be interested in [repo-analytics](https://repo-analytics.github.io/)
written by [Tim Qian](https://timqian.com/).

## parting words

So this is the end. I hope you have learned something from these posts.
I also hope you will start to create something on GitHub soon. Remember to

- solve a real problem
- write great `README.md`
- add other credentials
  - test coverage
  - stars
  - issues/pull requests
  - contributors

And finally, make sure to promote it!
