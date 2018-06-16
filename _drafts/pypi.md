---
layout: post
title: Publish package on PyPI
date: 2018-06-16 10:00:00 -0500
categories: [coding]
comments: true
tags: [python, PyPI]
---

## introduction

[The Python Package Index (PyPI)](https://pypi.org/) is the repository that hosts the python software packages.
By registering your package with PyPI,
other users can download it using `pip install <your-awesome-package>`.
I recently published a package there (see [its PyPI page here](https://pypi.org/project/gita/)).
In that the process, I noticed that some online tutorials were outdated due to the following changes

* [On July 3, 2017, uploads through pypi.python.org were switched off](https://packaging.python.org/guides/migrating-to-pypi-org/).
* [As of April 2018 PyPI supports GitHub-flavored Markdown](http://blog.jonparrott.com/github-flavored-markdown-on-pypi/).

In this post I will share the latest procedures.

## preliminaries


`~/.pypirc` file

```
[distutils]
index-servers =
    pypi

[pypi]
username=yourusername
```
You can also put your password there as `password=yourpassword` and change its permission `chmod 600 ~/.pypirc`.



```
pip install twine, setuptools, wheel
```

You can see [my setup.py example here](https://github.com/nosarthur/gita/blob/master/setup.py)

```
twine upload dist/*
```

## using README.md as PyPI project description

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
