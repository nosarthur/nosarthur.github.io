---
layout: post
title: Amazon web services with boto3 library
date:   2017-10-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---

## introduction

[Amazon web services (AWS)](https://en.wikipedia.org/wiki/Amazon_Web_Services)
provides cloud computing resources to users.
Its main components are 

* computing
* storage
* networking
* database

AWS alleviates the pain of maintaining infrastructure and is widely used nowadays especially by startups.
Take a web application for example, the most essential resources would be [Elastic Compute Cloud (EC2)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html),
[Simple Storage Service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html),
and [Relational Database Service (RDS)](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

Currently AWS provides 1 year free trial to new users. See the [AWS free tier page](https://aws.amazon.com/free/) for details.

So far I find the official AWS documentations not user friendly:
it is an encyclopedia that includes all kinds of topics but gets sketchy when it comes to specific details.
In this post I will share my notes to do the following tasks, using [python boto3 library](http://boto3.readthedocs.io/en/latest/) for automation:

* [basic account configurations](#config)
* [spin up and down an on-demand or spot EC2 instance](#instances)
* [ssh to EC2 instance](#ssh)
* [access S3 from EC2 instance without credentials](#s3)

To install the boto3 library, run 

```
pip install boto3, awscli
```

To make sure the installation is successful, run 

```
aws ec2 describe-instances
```

You should not see errors.
And if there is no instance running, you will get some feedback like

```
{
        "Reservations": []
}
```

## <a name='config'></a>basic account configuration

After signing up for AWS (free tier account for example),
the first thing to do is to [set up a user account](http://docs.aws.amazon.com/lambda/latest/dg/setting-up.html).
There are three steps to this process:

* create individual IAM user, e.g., dev
* create user group to assign permissions, e.g., dev-group
* create local credential files

The first two steps can be done via the aws web console.
To start with, we can attach the following permission to the user group

* AmazonS3FullAccess
* AmazonEC2FullAccess
* AmazonRDSFullAccess

To set up the local credential file, you can use the awscli command line tool.
Simply run from your terminal 

```
aws configure
```

It will ask user input for AWS Access Key ID, AWS Secret Access Key, and other preferences.
After execution, two files are created. The AWS Access Key ID and AWS Secret Access Key are stored in `~/.aws/credentials`, which looks like 

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

To use multiple user profiles,
you can edit the credential and config files directly.
For example, it may look like 

```
[default]
aws_access_key_id = your_id
aws_secret_access_key = your_key

[admin]
aws_access_key_id = admin_id
aws_secret_access_key = admin_key
```

## <a name='instances'></a> spin up and down an EC2 instance

There are two types of EC2 instances one can request

* on-demand instances
* [spot instances](https://aws.amazon.com/ec2/spot/)


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

security group


{% include youtubePlayer.html id="Cb2czfCV4Dg" %}

## <a name='ssh'></a>ssh to the instance

In order to ssh into EC2 instance, you need to assign to the instance

* an [aws key-pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) when launching the instance
* a [security group with ssh permission](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)

To check whether these two conditions are met for your instance,
go to the aws EC2 Management console, click on your instance at the instance tab, and check if there is a Key pair name associated with it,
and whether the Security groups inbound rule contains port 22 tcp protocol.

When both conditions are met, simply run

```python
rc = ec2.create_instances(ImageId=ubuntu_64bit,                            
			  InstanceType='t2.nano',                          
			  MinCount=1,                                      
			  MaxCount=n_workers,                              
			  KeyName='my-key',                               
			  )  
```

to create the instance.

To ssh to the instance, first you shoul download the credential file and run

```
chmod 400 /path/my-key-pair.pem
```

Then run

```
ssh -i /path/my-key-pair.pem ec2-user@ec2-198-51-100-1.compute-1.amazonaws.com
```

Depending on the image you load, the user name could vary.
Possible ones include ec2-user, centos, ubuntu, root, etc.

## <a name='s3'></a> access S3 from EC2

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

```
aws --profile=dev s3 ls s3://harness-bucket
```

* create IAM policy
* grant [permission to pass IAM role to instances](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#permission-to-pass-iam-roles)

[bucket permission](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/set-bucket-permissions.html)


## learning resources

* [Boto3 quick hands-on](https://gist.github.com/iMilnb/0ff71b44026cfd7894f8)
* [Automating AWS With Python and Boto3](https://linuxacademy.com/howtoguides/posts/show/topic/14209-automating-aws-with-python-and-boto3)
* [Introduction to aws and boto3](http://2017.compciv.org/guide/topics/aws/intro-to-aws-boto3.html)
* [How to access S3 buckets without access credentials](http://parthicloud.com/how-to-access-s3-bucket-from-application-on-amazon-ec2-without-access-credentials/)
