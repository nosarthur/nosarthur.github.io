---
layout: post
title: Crouton on Chromebook
date:   2018-07-15 17:00:00 -0500
categories: [coding]
comments: true
tags: [chroot]
---

After six months with the Linux terminal emulator Termux (see [my post here]({% post_url 2018-01-15-termux %})),
I switched to [Crouton](https://github.com/dnschneid/crouton).
My biggest complain with Termux is that from time to time things break after package upgrade
```bash
pkg upgrade
```

Crouton uses [chroot](https://en.wikipedia.org/wiki/Chroot) to install
full-blown Linux OS (almost), making it much easier to maintain.

For installation, I followed Miguel Grinberg's post

* [Using a Chromebook for Web Development](https://blog.miguelgrinberg.com/post/using-a-chromebook-for-web-development)

One minor difference is that I installed Ubuntu 18.04LTS instead of the default 16.04LTS.
To see the available Linux releases, use (assuming crouton script is downloaded)

```bash
sh ~/Downloads/crouton -r list
```

The output on my shell is

```bash
chronos@localhost / $ sh ~/Downloads/crouton -r list
Recognized debian releases:
    potato! woody! sarge! etch! lenny! squeeze! wheezy jessie stretch buster sid
Recognized kali releases:
    moto! kali! sana! kali-rolling
Recognized ubuntu releases:
    warty! hoary! breezy! dapper! edgy! feisty! gutsy! hardy! intrepid! jaunty!
    karmic! lucid! maverick! natty! oneiric! precise! quantal! raring! saucy!
    trusty utopic! vivid! wily! xenial yakkety! zesty! artful* bionic*
Releases marked with ! are upstream end-of-life, and should be avoided.
Releases marked with * are unsupported, but may work with some effort.
```

Although Ubuntu 18.04LTS (Bionic Beaver) is listed as unsupported,
it runs fine on my Samsung Chromebook Pro so far.
Overall, my installation command was

```bash
sudo sh ~/Downloads/crouton -r bionic -t xiwi,xfce
```
`xfce` is a light-weight desk manager.
I find it slightly more appealing than Gnome or KDE.

`xiwi` is a must-have to integrate the Linux OS better into the Chrome OS.
To make `xiwi` work, one needs to install [crouton extension to Chrome](https://goo.gl/OVQOEt) as well.
More tips on `xiwi` can be found [here](https://github.com/dnschneid/crouton/wiki/crouton-in-a-Chromium-OS-window-(xiwi)).

Without `xiwi`, the X11 rending is done by the `xorg` method
(if you use the installation command above, `xorg` is not installed).
In this case, one can switch between Chrome OS and Linux OS using
`ctrl+alt+<forward/backward (the keys next to escape)>`.
On my Chromebook, everything looks extremely small with the default `xfce4` desktop setting.
It also seems to freeze very briefly every now and then.

With `xiwi` installed, the Linux OS becomes an app (similar to the Android apps in Chrome OS),
making it much easier to switch OS.
One can even run a Linux GUI inside the Chrome browser tab.
The visual quality is worse than the `xorg` rendering or the native Chromebook look,
but enough for my need.
The brief freeze also goes away in this case.
To get high resolution rendering back, click on the Crouton extention and check HiDPI.


## basic usage

If you just need a Linux terminal, run

```bash
sudo enter-chroot
```

If you need a desktop environment, use

```bash
sudo startxfce4 -b
```

Here `-b` means "run in the background" so that there is no unusable tab in the Chrome browser.

## tips and tricks

In case you want to get rid of an installed release, run

```bash
sudo delete-chroot <name>
```

For vim users, one annoying thing is that `ctrl+w` is captured by Chrome as closing the tab.
The workaround is to expand the tab in full screen mode.
