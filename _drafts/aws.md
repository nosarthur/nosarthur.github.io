---
layout: post
title: Amazon web services
date:   2017-05-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---

## introduction

Amazon web services (AWS) is a cool product that provides infrastructure as a service (IaaS).

* compute
* storage
* networking
* database

virtualization

lego 

[simple storage service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)

[elastic compute cloud (EC2)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)

[Databases in Relational Database Service (RDS)](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)

* S3
    * buckets
    * objects: 5TB data limit
        * object data
        * metadata: name/value pairs
    * permission
    * keys
    * regions
        * US East (N. Virginia)
        * US East (Ohio)
        * US West (N. California)
        * US West (Oregon)


## configuration

User group

* AmazonS3FullAccess
* AmazonEC2FullAccess
* AmazonRDSFullAccess


```
pip install boto3, awscli
```

To make sure the installation is successful, run 

```
aws ec2 describe-instances
```

To set up the user profile, run

```
aws configure
```

It creates two files. The AWS Access Key ID and AWS Secret Access Key are stored in `~/.aws/credentials`, which looks like 

```
[default]
aws_access_key_id = your_id
aws_secret_access_key = your_key
```

Other preferences are stored in `~/.aws/config`, which looks like

```
[default]
output = json
region = us-east-1
```

To use multiple profiles, you can edit this credential and config files directly. For example, it may be like this

```
[default]
aws_access_key_id = your_id
aws_secret_access_key = your_key

[admin]
aws_access_key_id = admin_id
aws_secret_access_key = admin_key
aws_secret_access_key = your_key
```



## usage



[boto3](https://boto3.readthedocs.io/en/latest/)

* boto3
    * session
    * config
    * resources: high-level object-oriented API
        * identifiers and attributes
        * actions
        * references
        * subresources
        * collections
    * clients: low-level access to Botocore

low-level responses are python dictionaries. 

```
import boto3

boto3.connect('us-east-1', profile='admin')
key_name='myKey',
    instance_type='c1.xlarge',
        security_groups=['your-security-group-here']
```

{% include youtubePlayer.html id="Cb2czfCV4Dg" %}

## learning resources

* [boto3 quick hands-on](https://gist.github.com/iMilnb/0ff71b44026cfd7894f8)
* [introduction to aws and boto3](http://2017.compciv.org/guide/topics/aws/intro-to-aws-boto3.html)
