---
layout: post
title: Publishing package to PyPI
date: 2018-05-16 10:00:00 -0500
categories: [coding]
comments: true
tags: [python, PyPI]
---

## introduction

[The Python Package Index (PyPI)](https://pypi.org/) is the repository that hosts the python software packages.
By registering your package with PyPI,
other users can download your package using `pip install <your-awesome-package>`.
I recently published one of my Github projects there (see [its PyPI page here](https://pypi.org/project/gita/)).
Along the process, I notice that some online helps are out of date due to the following changes

* [As of April 2018 PyPI supports Github-flavored Markdown](http://blog.jonparrott.com/github-flavored-markdown-on-pypi/).
* [On July 3, 2017, uploads through pypi.python.org were switched off](https://packaging.python.org/guides/migrating-to-pypi-org/).

In this post I will share the latest procedures.

## preliminaries

```
pip install twine, setuptools, wheel
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


You can see [my setup.py example here](https://github.com/nosarthur/gita/blob/master/setup.py)

```
twine upload dist/*
```

## using README.md as PyPI project description

in `setup.py`
```
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
