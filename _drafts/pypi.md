---
layout: post
title: Publish package on PyPI
date: 2018-07-01 10:00:00 -0500
categories: [coding]
comments: true
tags: [python, PyPI]
---

## introduction

[The Python Package Index (PyPI)](https://pypi.org/) is the official repository for python packages.
It is the magic behind `pip install <your-awesome-package>`.
Recently I published a package there (see [its PyPI page here](https://pypi.org/project/gita/))
and I will share the procedures in this post.

In that the process, I noticed that some online tutorials were outdated due to the following changes

* [On July 3, 2017, uploads through pypi.python.org were switched off](https://packaging.python.org/guides/migrating-to-pypi-org/).



## prerequisites

* create user account on [PyPI](https://pypi.org/account/register/)
* prepare distribution information for your repo 

To facilitate the packaging and distribution, we can install the following tools

```bash
pip3 install twine setuptools wheel
```

You can see [my setup.py example here](https://github.com/nosarthur/gita/blob/master/setup.py)

```bash
python3 setup.py sdist
```

It will create a folder called `dist` with the tarball file in it.

```
twine upload dist/*
```


`~/.pypirc` file

```
[distutils]
index-servers =
    pypi

[pypi]
username=yourusername
```
You can also put your password there as `password=yourpassword` and change its permission `chmod 600 ~/.pypirc`.



## using README.md as PyPI project description

* [As of April 2018 PyPI supports GitHub-flavored Markdown](http://blog.jonparrott.com/github-flavored-markdown-on-pypi/).

Since Apr 2018, GitHub style markdown file can be used directly as PyPI project
description page.
All one needs to do is to set the `long_description` in `setup.py`, as follows

```python
long_description = None
with open('README.md') as f:
    long_description = f.read()

setup(
    ...
    long_description=long_description,
    long_description_content_type='text/markdown',
    ...
)
```

## reference
* [Packaging and distributing python projects](https://packaging.python.org/tutorials/distributing-packages/]
