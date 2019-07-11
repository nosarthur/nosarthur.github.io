---
layout: post
title: Kbdfans 40% ortholinear Niu mini keyboard
date:   2019-10-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [keyboard]
---



ordered my first 40% ortholinear keyboard from

[kbdfans niu mini 40% keyboard](https://kbdfans.cn/collections/fully-assembled-keyboard/products/fully-assembled-niu40-mechanical-keyboard)

The keyboard (without key caps) costs $115 and it took 11 days to arrive.

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
make niu_mini:default:avrdude
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
