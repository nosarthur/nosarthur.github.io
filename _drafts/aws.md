---
layout: post
title: Amazon web services with boto3 library
date:   2017-10-26 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---

## introduction

[Amazon web services (AWS)](https://en.wikipedia.org/wiki/Amazon_Web_Services)
is a useful tool to alleviates the pain of maintaining infrastructure.
It makes requesting cloud computing resources as easy as either clicking a few buttons or making an API call.
The price is quite affordable even for individuals, and you can estimate the monthly cost based on approximate usage with [this page](http://calculator.s3.amazonaws.com/index.html).

The main components of AWS include 

* computing
* storage
* networking
* database

Take a web application for example, the most relevant resources would be [Elastic Compute Cloud (EC2)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html),
[Simple Storage Service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html),
and [Relational Database Service (RDS)](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

Currently AWS provides 1 year free trial to new users. 
See the [AWS free tier page](https://aws.amazon.com/free/) for details.

So far I find the official AWS documentations not so user friendly:
it is like an encyclopedia that includes all kinds of topics but gets sketchy on details.
In this post I will share my notes for the following tasks:

* [basic account configurations](#config)
* [spin up and down an on-demand or spot EC2 instance](#instances)
* [ssh to EC2 instance](#ssh)
* [access S3 from EC2 instance without credentials](#s3)

Both [AWS web console](https://aws.amazon.com/console/) and [python boto3 library](http://boto3.readthedocs.io/en/latest/) are used for these tasks. The web console is convenient for configurations and the boto3 API is good for automation. 
For the web console part, I will only jot down what needs to be done and possibly include a link to the documentation.

## <a name='config'></a>basic account configurations

After signing up for AWS (free tier account for example),
the first thing to do is to [set up a user account](http://docs.aws.amazon.com/lambda/latest/dg/setting-up.html).
It enables you to access the AWS resources from your own computer either with the command line interface [awscli](https://aws.amazon.com/cli/) or API calls.
Without it, the only way to access AWS is to log into the [AWS web console](https://aws.amazon.com/console/) page.

There are three steps to set it up:

1. create individual IAM user, e.g., `dev`
1. create user group to manage permissions, e.g., `dev-group`
1. create local credential files

The first two steps can be done via the aws web console.
To start with, we can attach the following permissions to the user group

* AmazonS3FullAccess
* AmazonEC2FullAccess
* AmazonRDSFullAccess

To set up the local credential file, you can use the awscli command line tool.
To install it and the boto3 library, run 

```
pip install boto3, awscli
```

After installation, run from your terminal 

```
aws configure
```

It will ask user input for AWS Access Key ID, AWS Secret Access Key, and other preferences.
The access keys can be found on the aws web console as you create the account.
After execution, two files will be created locally. 
The AWS Access Key ID and AWS Secret Access Key are stored in `~/.aws/credentials`, which looks like 

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

The main difference is the [pricing model](https://aws.amazon.com/ec2/pricing/).
For on-demand instances, you pay a fixed price up front with fixed rate.
On the other hand, you provide a bid price for spot instances, and the usage is charged at the market price as long as it is lower than your bid price.
When the market price exceeds the bid price, the running instance will be killed with [a two-minute courtesy window](https://aws.amazon.com/blogs/aws/new-ec2-spot-instance-termination-notices/).

The spot instance market price is usually much cheaper than the on-demand price.
For example, I just took a peak at the US-East (N. Viginia) m4.large price. 
The on-demand price is $0.1 per hour and the spot market price is $0.0274 per hour.

The easiest way to spin up or down an EC2 instances is via the web console.
However, automation is needed and in these cases
[boto3](https://boto3.readthedocs.io/en/latest/) API is more useful.

* boto3
    * session
    * config
    * resource: high-level object-oriented API
        * identifiers and attributes
        * actions
        * references
        * subresources
        * collections
    * client: low-level access to Botocore

There are two sets of APIs in boto3, the so-called resource and client.
Client API provides more functionalities than the slightly more user-friendly resource API. 
Low-level responses are python dictionaries. 

```
import boto3

s = boto3.Session(profile_name='dev', region_name='us-east-1')
ec2 = s.resource('ec2')
	
        rc = ec2.create_instances(ImageId='ami-4fffc834',
                                  InstanceType='t2.nano',
                                  MinCount=1,
                                  MaxCount=n_workers,
                                  UserData=startup,
                                  KeyName='harness',
                                  IamInstanceProfile={'Name': 'harness-worker'},
                                  )	
```




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
