---
layout: post
title: My 4-step guide to better typing experience
date:   2020-06-10 13:00:00 -0500
categories: [coding]
comments: true
tags: [keyboard]
---

I made several changes to my keyboard setups last year for better typing experience.
In this post, I will introduce the changes and my afterthoughts.
The changes and my ratings are

* [go mechanical](#mecha): &#11088; &#11088; &#11088; &#11088; &#11088;
* [leave QWERTY](#colemak): &#11088; &#11088;
* [program layers](#ortho): &#11088; &#11088; &#11088; &#11088;
* [split keyboard](#split): &#11088;

## <a name='mecha'></a> go mechanical

Switching to a mechanical keyboard probably makes the biggest difference in
improving typing experience.

TODO: add amazon affiliate links for ann pro2, and early cheap one

key travel

Common ones are the brown, red, and blue switches.
It's best to try them out before making purchases.
You can also buy a tester to try

<a target="_blank"  href="https://www.amazon.com/gp/product/B01G3BJOHO/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01G3BJOHO&linkCode=as2&tag=nosarthur2016-20&linkId=7cd4d1b2e5038d71f6cf9a961e1acde2"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01G3BJOHO&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=B01G3BJOHO" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

I started with a cheap brown switch mechanical keyboard by Qisan.
It's about $40 and the build quality is good. However I am bothered by the fact
that I seldom use the Del, Insert, page up, page down, and arrow keys.

<a target="_blank"  href="https://www.amazon.com/gp/product/B01E8KO2B0/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01E8KO2B0&linkCode=as2&tag=nosarthur2016-20&linkId=9f14d04d65b54c3935c8bc3bb3e094c0"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01E8KO2B0&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=nosarthur2016-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=nosarthur2016-20&l=am2&o=1&a=B01E8KO2B0" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

Later I bought a black [Anne Pro 2](https://amzn.to/3dL815M).

- the keyboard is programmable using a software.
- it has a nice concept of overriding as arrow keys

[![ap2](/assets/ann_pro.jpg)](https://amzn.to/3dL815M)


## <a name='colemak'></a> leave QWERTY

The general ideas of these alternative layouts include

- move the high frequency keys to more easily accessible locations, for
  example, move the vowels to the home row
- put bigrams on adjacent keys

[Tarmak method](https://forum.colemak.com/topic/1858-learn-colemak-in-steps-with-the-tarmak-layouts/)

[colemak mode-dh](https://colemakmods.github.io/mod-dh/)

name | year | number of key difference from QWERTY
--- | ---|---
QWERTY |~ 1878 | 0
Dvorak | 1936 | 33
Colemak | 2006 | 17
Workman ||
Carpalx ||


## <a name='ortho'></a> program layers

## <a name='split'></a> split keyboard


ordered my first 40% ortholinear keyboard from

[kbdfans niu mini 40% keyboard](https://kbdfans.cn/collections/fully-assembled-keyboard/products/fully-assembled-niu40-mechanical-keyboard)

The keyboard (without key caps) costs $115 and it took 11 days to arrive.


Kbdfans 40% ortholinear Niu mini keyboard

## rationale

4 x 12 layout

8 fingers are on the keyboard by default

Each hand is in charge of 6 keys on the horizontal direction

## custom keymap

- work for Mac, Linux, and ChromeOS
- Python and Golang
- Vim


## flash firmware

In order to change the key mapping, we need to flash the keyboard firmware.
There are two steps


- generate the keymap .hex file
- flash it

Both step can be done either using command line or GUI / web interface.

For beginners, it's easier to use the [qmk configurator]()
But it also has its cons

- The waiting could be long if many people are using it.
- It cannot enable features like mouse keys if the board doesn't have it on by default.

[How to flash firmware]()

There are two ways to flash firmware onto the keyboard.
[](https://github.com/qmk/qmk_firmware/tree/master/keyboards/niu_mini)

```
make niu_mini:default:dfu
```


`atmega32u4`

```
*** DFU device connected
*** Attempting to flash, please don't remove device
>>> dfu-programmer atmega32u4 erase --force
    Erasing flash...  Success
    Checking memory from 0x0 to 0x6FFF...  Empty.
>>> dfu-programmer atmega32u4 flash /Users/dzhou/Downloads/111.hex
    Checking memory from 0x0 to 0x5A7F...  Empty.
    0%                            100%  Programming 0x5A80 bytes...
    [>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>]  Success
    0%                            100%  Reading 0x7000 bytes...
    [>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>]  Success
    Validating...  Success
    0x5A80 bytes written into 0x7000 bytes memory (80.80%).
>>> dfu-programmer atmega32u4 reset

*** DFU device disconnected
```


## rationale

The resting state
```
............
.xxxx..xxxx.
............
x...x..x...x
```


I thought about the principles

- The most commonly used keys should be at the easily accessible keys

For me, the easy-to-get-to locations are
```
o..........o
.xxxx..xxxx.
............
x..oxooxo..x
```

[extend](https://forum.colemak.com/topic/2014-extend-extra-extreme/)
[typing test](https://www.speedtypingonline.com/typing-test)
[partial optimization](http://mkweb.bcgsc.ca/carpalx/?partial_optimization)
