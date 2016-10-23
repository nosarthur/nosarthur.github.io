---
layout: post
title: A partial guide for data scientist jobs
date:   2016-10-22 13:43:08 -0500
categories: [side project]
comments: true
tags: [data science]
---

## The motive

I left my postdoc job in May 2016 and started preparing for data scientist jobs. Since the best way to learn is to teach, I started to organize learning materials.
Unfortunately (fortunately?), I landed in a non-data-scientist job before all materials are finished.
In this post I will share them anyways.

You can also read [my transition to industry job]({% post_url 2016-10-16-job-transition %}) if interested.

## The job

According to [the O'Reilly's 2015 survey](https://www.oreilly.com/ideas/2015-data-science-salary-survey/), data scientist jobs pay a median base salary $104k in US (add 13k if you have a PhD). Of course there are other perks such as stocks and bonus.

It is also a relatively easy transition for STEM PhDs. 
Many of my former classmates and colleagues (math, physics, CS, biology PhDs)
work as data scientists in industry.
Two of them even wrote a book on data science interviews

<a href="https://www.amazon.com/gp/product/1511977485/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1511977485&linkCode=as2&tag=nosarthur2016-20&linkId=7b8242100ed91c5b3a911ae10fba1494" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1511977485&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1511977485" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />


The work responsibility of data scientist varies significantly from company to company.
According to my friends in industry, there are two prototypes of data scientists

* Business analyst: report-oriented
    * statistics
    * SQL
* Machine learning software development engineer: product-oriented
    * machine learning
    * software development

A mixture of the two prototypes is also likely.
The book above provides overview of the positions and guidance on 
interpreting the job advertisement.

## The guiding principle

For the job hunter, the guiding principle is to **add data science credentials**.
Specifically, you can 

* compete on [kaggle][k] and [drivendata](https://www.drivendata.org/competitions/) and get top ranking
* write a blog to show-case your data science knowledge and projects
* make web apps and mobile apps to show-case your software development skills
* maintain a github account to show that you know git
* get a data science degree

You can also take online courses and get certificates.
But they may be weak in terms of credentials.

## The ideal reader

When planning out the learning materials, 
I see the reader as someone with quantitative background, for example
a STEM PhD. Specifically, you should be familiar with the following concepts. 

* linear algebra
    * e.g., matrix inverse, eigen values and vectors, SVD
* multi-variable calculus
    * e.g., Jacobian matrix, inverse function theorem
* probability and statistics 
    * e.g., Bayes rule, chain rule, hypothesis test
* programming 
    * e.g., C, C++, Python, Matlab

## The learning materials

### overview 

* coding
    * Python
        * [basics]({% post_url 2016-09-18-python-course %})
        * packages: pandas, sklearn, numpy, scipy
            * Python Machine Learning by Sebastian Raschka
            * Python for Data Analysis by Wes McKinney
    * SQL
        * [Stanford database course](https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about)
    * github
    * interview problems
        * [LeetCode](https://leetcode.com) and [LeetCode solutions](https://lefttree.gitbooks.io/leetcode-categories/content/index.html)
        * [codewars](http://codewars.com) 
* statistics
    * hypothesis test
    * bias-variance trade-off
* machine learning
    * [naive Bayes]({% post_url 2016-08-01-naive-Bayes %})
    * [logistic regression]({% post_url 2016-06-08-classification %})
    * [support vector machine]({% post_url 2016-06-22-svm %})
    * [tree-based classifiers]({% post_url 2016-10-22-tree %})
* portfolio projects
    * [kaggle][k] and [drivendata](https://www.drivendata.org/competitions/)

<a href="https://www.amazon.com/gp/product/1783555130/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1783555130&linkCode=as2&tag=nosarthur2016-20&linkId=2ee4b687ce82f8951c5da8c79ec58e9d" target='_blank'><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1783555130&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1783555130" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a href="https://www.amazon.com/gp/product/1449319793/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1449319793&linkCode=as2&tag=nosarthur2016-20&linkId=f5078360e619a6aee93ebedfa23f71a5" target='_blank'><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1449319793&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=1449319793" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

### notes

* The best way to learn data science is to do projects. You can take a look at the public data sets and think of some projects to test out your newly-learned machine learning algorithms
    * [rs.io](http://rs.io/100-interesting-data-sets-for-statistics/)
    * [data.gov](http://catalog.data.gov/dataset)
    * [google data](https://cloud.google.com/bigquery/public-data/#usa-names)
    * [fivethirtyeight](https://github.com/fivethirtyeight/data)
    * [awesome datasets](https://github.com/caesar0301/awesome-public-datasets)
* The best way to learn pandas is via project. Wes McKinney's pandas book is nicely written but will be too dry if you only read.  Here is a tutorial by Wes McKinney's in 2012 as well
{% include youtubePlayer.html id="w26x-z-BdWQ" %}
* data science programs

    There are many short-term programs (say 7 weeks) to help people break ice into the data scientist jobs, 
    e.g., [insight](http://insightdatascience.com), [data incubator](https://www.thedataincubator.com/). I have interviews with insight but didn't get in. Here are the demos that didn't get me into the insight data science program.

    * [youtube project]({% post_url 2016-04-21-youtube %})
    * [NYC restaurant project]({% post_url 2016-07-21-restaurant %})

    According to the insight program managers, the program 
    enables the trainee to have an overview of the whole data science industry.
    I think it will be helpful to go. 

* [dataQuest](https://www.dataquest.io)
    
    I discovered this site in late July and wished I could have found it earlier. 
    It is an online learning platform for data analyst, data scientist and data engineer jobs. The premium subscription is $49/month. 
    The nice thing is that you can video chat with the founder [Vik Paruchuri](http://www.vikparuchuri.com) for 10 min every week as office hour, and you can ask him anything.
* [git](https://en.wikipedia.org/wiki/Git) is a must-learn

## Some after thoughts

* Do let people know that you are looking for job
* Do participate in [kaggle][k] competitions ASAP
* Don't waste time on deep learning (even though it's fun)

Finally, there is the question of how much preparation is needed.
I have been thinking about this question quite often along my way of preparation and finally figured it out:
when you consider joining the company as doing them a favor instead of the company doing you a favor, you are ready.

## Other guides of data science transitions

* [Preparing for Insight][1]
* [Preparing for DataIncubator][4]
* [Preparing for the Transition to Data Science][2]
* [The Definitive Guide to Do Data Science for Good][3]
* [resume secrets from data incubator](http://blog.thedataincubator.com/2016/07/5-secrets-for-writing-the-perfect-data-scientist-resume/)
* [NYC coding bootcamps](https://www.coursereport.com/cities/new-york-city)
* [indeedoor](https://jcp1016.shinyapps.io/indeedoor/)


[1]: http://insightdatascience.com/blog/preparing_for_insight.html
[2]: http://www.insightdatascience.com/blog/transition_to_ds.html
[3]: http://blog.datalook.io/definitive-guide-data-science-good/
[4]: http://blog.thedataincubator.com/2014/09/how-to-prepare-for-the-data-incubator/

[k]: http://www.kaggle.com

