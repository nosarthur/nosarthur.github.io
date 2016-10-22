---
layout: post
title: Review of Statistical mechanics and thermodynamics
date:   2016-11-12 13:43:08 -0500
categories: [math and physics]
comments: true
tags: [statistical mechanics, thermodynamics]
---

Recently I joined a company where close to 50% of the employees are PhDs with 
computational chemistry degree.

$$ dU = PdV $$



$$ F = U - TS \\ H=U+PV \\ G=U-TS +PV $$

As you can see, it's quite a mess. Fortunately, I learned a trick from [Kerson Huang](https://en.wikipedia.org/wiki/Kerson_Huang)'s book

<a href="https://www.amazon.com/gp/product/0471815187/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0471815187&linkCode=as2&tag=nosarthur2016-20&linkId=01a45bc6b594cf81108b98b687543082" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0471815187&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0471815187" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

There are many tricky equalities in thermodynamics. Here is a few particularly important ones

$$U = -T^2\frac{\partial(F/T)}{\partial T} $$

The probability that a given "microstate" $$\mu$$ occurs is

$$p_\mu = e^{\beta [F-H(\mu) ]} = e^{-S/k_B} $$

<a href="https://www.amazon.com/gp/product/0201360764/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0201360764&linkCode=as2&tag=nosarthur2016-20&linkId=36441850561212a488b7ff2ed6871a7b" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=0201360764&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=0201360764" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
