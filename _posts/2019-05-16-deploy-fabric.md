---
layout: post
title: "Automating deployment with Fabric and Airflow, Part I"
date: 2019-05-16 17:00:00 -0500
categories: [coding]
comments: true
tags: [fabric, airflow]
---

Part of my day job involves maintaining a cloud infrastructure for scientific
computing. The deployment process can get complicated as the number of repos
and the supported cloud platforms increase. There are Makefiles and bash
scripts here and there, and one needs to manually track the
order of tasks. As a result, it often takes a full day to do the deployment:
half day for the preparation and half day for the update.

One obvious improvement is to automate the whole process so that

- human time can be saved
- human error can be avoided
- maximal task parallelization can be achieved

After some googling, I decided to use Fabric and Airflow for the automation.
Fabric makes remote command execution easier, and Airflow handles workflow.
Some useful references are listed here:

- [Which is a better data pipeline scheduling platform: Airflow or Luigi?](https://www.quora.com/Which-is-a-better-data-pipeline-scheduling-platform-Airflow-or-Luigi)
- [Why Robinhood uses Airflow](https://robinhood.engineering/why-robinhood-uses-airflow-aed13a9a90c8)

## fabric

Fabric is written in Python and its installation is simply

```
pip3 install -U fabric3
```

The basic idea of Fabric is to wrap bash commands inside Python functions.
These Python functions are placed in a `fabfile.py`.
Its command-line API takes the form of

```
fab [setup] <command>[:args,kwargs] [options]
```

where both `setup` and `command` are Python functions in `fabfile.py`, `args`
and `kwargs` are parameters to the `command` functon, and `options` are Fabric
options.
Most of the `options` are related to authentication, server addresses, etc.
They are the parameters that shouldn't be hard coded in the `fabfile.py`.

By default, `fab` searches the current directory for `fabfile.py`. To use a
`fabfile.py` elsewhere, use the `-f` option.

The most useful Fabric APIs are

```
from fabric.api import env, sudo, run, local, lcd, cd
```

Here `env` is a global dictionary. All of the command-line `options` are saved
in it. You can also put custom content in it too.
`lcd` and `cd` specifies the local and remote location for the command execution.
`local` runs command locally, whereas `sudo` and `run` run command on remote server.
`run` runs the command as `env.user`. If not specified, the default user is used.
`sudo` runs the command as root.

That's basically the essence of Fabric. Here I will give two examples.

The first example runs all commands locally. It merges the remote updates to
two git repos and runs a `make` command in the second repo.
The `fabfile.py` is simply

```
def update_and_make():
    with lcd('path-to-first-repo'):
        local('git pull --rebase')
    with lcd('path-to-second-repo'):
        local('git pull --rebase')
        local('make all && make install')
```

To execute it, run

```
fab update_and_make
```

**Note if any step fails, the execution stops.** There is no need to check if
the execution succeeds inside the Python code.

The second example runs only remote commands and uses both `setup` and `command`
functions for the `fab` command. Here the `setup` fills in the information that
differs for AWS and gcloud, and `command` defines the common operations
for deployment.

```
def aws():
    env.user = 'ubuntu'
    env.key_filename = aws_key_fname
    env.hosts = config['aws']['hosts']
    env.cmd = config['aws']['cmd']

def gcloud():
    env.key_filename = gcloud_key_fname
    env.hosts = config['gcloud']['hosts']
    env.cmd = config['gcloud']['cmd']

def deploy():
    sudo('docker pull repo-name')
    sudo(f'docker run {env.cmd}')
```

To do the deployment, run

```
fab aws deploy
fab gcloud deploy
```

I prefer not to include `options` for `fab` command because it's too much
typing. All the configuration parameters are put in a YAML file and get loaded
into a dictionary `config`.

One slightly annoying thing is that Fabric passes all `args` and `kwargs` as
strings. So `fab my_func:is_apple=False` won't pass `is_apple=False`, but
`is_apple='False'`. To get around this issue, I set default value for boolean
argument to be `False`. When `True` is desirable, I pass `is_apple=1` from
the command-line.

Fabric is great in running sequential jobs. If parallel execution is desirable,
you can simply run several `fab` commands. To minimize human intervention,
extra tooling for workflow management is needed. That would be the topic for
Part II.
