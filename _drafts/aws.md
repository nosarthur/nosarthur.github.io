---
layout: post
title: Amazon web services
date:   2017-05-18 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---

Amazon web services (AWS) is a cool product that provides infrastructure as a service (IaaS).

* compute
* storage
* networking
* database

virtualization

lego 

[simple storage service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)

[elastic compute cloud (EC2)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)


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

{% include youtubePlayer.html id="Cb2czfCV4Dg" %}


