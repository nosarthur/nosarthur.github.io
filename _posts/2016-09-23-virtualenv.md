---
layout: post
title: python virtualenv
date:   2016-09-23 10:00:08 -0500
categories: [coding]
comments: true
tags: [packages]
---

Do you have the unpleasant experience of upgrading one python package 
for one project breaks the package dependencies of other projects? This is where `virtualenv` shines.
As the name indicates, it creates a virtual environment for each project as if its dependences
start from a clean installation of python.

If you have `pip`, the installation of the `virtualenv` package is simply

```shell
pip install virtualenv
```
To create a virtual environment, use

```shell
virtualenv venv
```
I use python2 by default, the above code creates a folder called `venv`. 
It will be convenient to place this `venv` folder inside the corresponding project folder.
Of course you can call this folder whatever, but `venv` is somewhat popular.

To create a virtual environment with python3, use

```shell
virtualenv -p /usr/bin/python3 python3
```

To activate a virtual environment, use

```shell
source venv/bin/activate
```

You can tell the virtual environment is on since it changes the command line prompt.
For example, on my computer the prompt changes from `nos ~ $` to `(venv) nos ~ $` where `nos` is my user name.

After activating the virtual environment, you can install packages using `pip` as usual. 

To deactivate a virtual environment, simply type

```shell
deactivate
```

and the command line prompt changes accordingly.

To check the packages installed for the virtual environment, use

```shell
pip freeze
```

## further reading

* [python software foundation](https://packaging.python.org/installing/)
