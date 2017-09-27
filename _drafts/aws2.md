---
layout: post
title: Amazon web services with boto3 library, part 2
date:   2017-11-26 13:43:08 -0500
categories: [coding]
comments: true
tags: [aws]
---


## bootscripts

[user-data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)

```
/var/log/cloud-init-output.log
```

## awscli

```
aws ec2 describe-instances --instance-ids <id> --query Reservations[].Instances[].PrivateIpAddress
aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=<id> Name=attachment.device,Values=/dev/sdf --query Volumes[*].VolumeId
```
