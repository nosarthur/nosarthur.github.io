---
layout: post
title: Amazon web services
date:   2017-10-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---

## introduction

[Amazon web services (AWS)](https://en.wikipedia.org/wiki/Amazon_Web_Services) provides on-demand cloud computing resources to users.
It alleviates the pain of maintaining hardwares.
Currently AWS provides 1 year free trial to new users. Details can be found  from the [AWS free tier page](https://aws.amazon.com/free/).

So far I find the official AWS documentations quite horrible: it is pretty much an encyclopedia.
In practice, what I really need are recipes for individual tasks.
And this post is my note to do the following tasks, using [python boto3 library](http://boto3.readthedocs.io/en/latest/) for automation:

* [basics](#basics)
* [basic account configurations](#config)
* [spin up and down an on-demand instance](#demand)
* [spin up and down a spot instance](#spot)
* [ssh to EC2 instance](#ssh)
* [access S3 from EC2 instance without credentials](#s3)

## <a name='basics'></a> basic resources

The main components of AWS include

* compute
* storage
* networking
* database

For a web application, the most essential resources are [Elastic Compute Cloud (EC2)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html),
[Simple Storage Service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html),
and [Relational Database Service (RDS)](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

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

## <a name='config'></a>basic account configuration

After signing up for AWS (free tier account for example),
the first thing to do is to [set up a user account](http://docs.aws.amazon.com/lambda/latest/dg/setting-up.html).
There are two steps to this process:

* create individual IAM user, e.g., dev
* create user group to assign permissions, e.g., dev-group

To start with, we can attach the following permission to the user group

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

security group


{% include youtubePlayer.html id="Cb2czfCV4Dg" %}

* on-demand instances
* [spot instances](https://aws.amazon.com/ec2/spot/)

## <a name='ssh'></a>ssh to the instance

In order to ssh into EC2 instance, you need to assign to the instance

* an [aws key-pair](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) when launching the instance
* a [security group with ssh permission](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)

To check whether these two conditions are met for your instance, you can go to the aws EC2 Management console, click on your instance at the instance tab, and check if there is a Key pair name associated with it, and whether the Security groups inbound rule contains port 22 tcp protocol.

```python
rc = ec2.create_instances(ImageId=ubuntu_64bit,                            
			  InstanceType='t2.nano',                          
			  MinCount=1,                                      
			  MaxCount=n_workers,                              
			  KeyName='my-key',                               
			  )  
```

chmod 400 /path/my-key-pair.pem

```
ssh -i /path/my-key-pair.pem ec2-user@ec2-198-51-100-1.compute-1.amazonaws.com
```

Depending on the image you load, the user name could vary. Possible ones include ec2-user, centos, ubuntu, root.

## <a name='s3'></a> access S3 from EC2

* create IAM policy
* create [IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
*

## learning resources

* [Boto3 quick hands-on](https://gist.github.com/iMilnb/0ff71b44026cfd7894f8)
* [Automating AWS With Python and Boto3](https://linuxacademy.com/howtoguides/posts/show/topic/14209-automating-aws-with-python-and-boto3)
* [Introduction to aws and boto3](http://2017.compciv.org/guide/topics/aws/intro-to-aws-boto3.html)
* [How to access S3 buckets without access credentials](http://parthicloud.com/how-to-access-s3-bucket-from-application-on-amazon-ec2-without-access-credentials/)
