---
layout: post
title: Google cloud
date:   2019-07-15 17:00:00 -0500
categories: [coding]
comments: true
tags: [cloud]
---


https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu


Ubuntu 16.04LTS

```bash
# Create environment variable for correct distribution
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"

# Add the Cloud SDK distribution URI as a package source
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import the Google Cloud Platform public key
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# Update the package list and install the Cloud SDK
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

```bash
gcloud init
```

It will 

```bash
gcloud compute instances list
```

```bash
gcloud compute firewall-rules list
```

Make sure ssh at port 22 is allowed

```
ssh -i ~/.ssh/<your pub key>.pub <instance ip>
