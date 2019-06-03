
[kbdfans niu mini 40% keyboard](https://kbdfans.cn/collections/fully-assembled-keyboard/products/fully-assembled-niu40-mechanical-keyboard)


https://github.com/qmk/qmk_firmware/tree/master/keyboards/niu_mini

```
make niu_mini:default:avrdude
```

`abhixec`


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
