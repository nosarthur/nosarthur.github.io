---
layout: post
title: How to discover, contribute, and promote an open source project
date: 2019-03-05 13:00:00 -0500
categories: [coding]
comments: true
tags: [open-source, newbie programmer]
---

When I was looking for industry jobs a few years ago, it occurred to me that
contributing to an open source project might add to my credentials.
Who wouldn't want to hire a contributor of numpy (or any other famous project), right?
In fact it's a bad idea:
the return on investment is too low.
Popular projects like numpy or pandas have hundreds or even thousands of contributors.
Resolving a few issues does not make one stand out. And the effort to grasp
the inner workings of such projects can be tremendous.
Moreover, your future employer may not care.

So what is useful for breaking into programming jobs?
**For a novice programmer, the most urgent is to acquire the engineering
practice for the intended industry.**
It makes one hirable.
For example, a typical software project requires version control (git, github ecosystem),
code review, automated testing, continuous integration, etc.
**Next, one should cultivate vision, i.e., see values.**
Both of them can be learned from solo projects.
In my opinion it makes sense to attend coding or data science boot camps.

- [Software Engineering at Google](https://arxiv.org/abs/1702.01715)

Ideally, one can acquire both engineering practice and vision from observing
and participating in an open source projects.
In practice it's difficult because **most open source projects are invisible**.
In each specialized field, only few projects are well known.
And it often takes years for them to get traction.

So how can a novice programmer find a newbie-friendly open source project with
good engineering practice? I think this is largely an open problem
(please let me know if such a platform exists.)
There is probably a market for short-term open source projects in fields like
data science and web development.

Many successful open source projects are release by for-profit companies.
They enjoy an ecosystem of developers, users, and marketing team,
which is often lacked for projects initiated by individuals.

In this post, I will share my experience with discovering, contributing,
and promoting open source projects.

## discover

Nowadays I discover trendy projects using

- [hacker news show](https://news.ycombinator.com/show)
- [github explore](https://github.com/explore)
- [github trending](https://github.com/trending)
- [github topics](https://github.com/topics)

All of them are voting based, thus are useful to get some vision.
But they are not useful for novice programmers to find projects to work on.

## contribute

The scope of contribution is much broader than modifying the source code.
For example, two very important contributions,

- bug report
- feature suggestion

do not even require reading the source code.

Project promotion is also a very useful non-technical contribution.
It can be as simple as starring the project on github,
or increasing the project exposure, such as recommending to others,
writing an article, forwarding a tweet, etc.

To make source code contributions, it helps to read a few pull reqeusts first,
which are more localized and self contained.

## promote

Recently I had a first-hand experience promoting one of my side projects.
This project [gita](https://github.com/nosarthur/gita) is a command-line tool to manage multiple git repos.
Its main features were implemented about a year ago (see [original blog post here]({% post_url 2018-02-16-gita %})).
Before promotion, it had 5 stars on github: 3 from my coworkers,
1 from myself, and one from a genuine person (I wonder how he found the project).

> What gets measured gets done. -- Lord Kelvin

For a medium to lesser known project on github, the following numbers may give a good reflection on its popularity

- stars
- forks
- clones
- visits

The first 3 are more about the project quality and value to its users.
The last one is more about marketing.

To improve the project, I try to

- solve a real problem
- write great `README.md`
- add other credentials
  - test coverage
  - stars
  - issues/pull requests
  - contributors

To promote it, I posted the project to many platforms.
Here is an incomplete list of them, and
they are roughly ranked by the effectiveness in bringing in traffic.

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

This is what happened with
[Hacker News Show](https://news.ycombinator.com/show).

- @1am posted on HN Show
- @6:30am got up with 115 stars and 3 issues
- @1am second day: 274 stars, 1 more issue, and 3 pull requests

![two blobs](/assets/gita_spike.png){:width="400px"}

It went on the HN front page and also the github trending page for that week.
The star/visit ratio is about 1:10, which holds to this day.
And the star/download ratio is about 1:2.
So I still need to increase the exposure of it.

over 300 views in one day, due to [Ruan Yifeng's blog](ruanyifeng.com)

[](https://github.com/ruanyf/weekly)

[GitHubDaily](https://github.com/GitHubDaily/GitHubDaily)

## further readings

- [Open Source Guides](https://opensource.guide/)
- [How to promote your open source project](https://linux-audit.com/how-to-promote-your-open-source-project/)
- [How to promote your Github project](https://hackernoon.com/how-to-promote-your-github-project-1b39a7eee841)
- [How to get up to 3500+ GitHub stars in one week — and why that’s important](https://medium.freecodecamp.org/how-to-get-up-to-3500-github-stars-in-one-week-339102b62a8f)
- [How to Spread The Word About Your Code](https://hacks.mozilla.org/2013/05/how-to-spread-the-word-about-your-code/)
- [Stackoverflow open source advertising 2019](https://meta.stackoverflow.com/questions/379273/open-source-advertising-1h-2019)
