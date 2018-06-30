---
layout: post
title: Crouton on Chromebook
date:   2018-07-15 17:00:00 -0500
categories: [coding]
comments: true
tags: [chroot]
---

After six months with the Linux terminal emulator Termux (see my post [here]({% post_url 2018-01-15-termux %})),
I switched to [Crouton](https://github.com/dnschneid/crouton).
My biggest complain with Termux is that from time to time things break after package upgrade
```bash
pkg upgrade
```

Crouton uses [chroot](https://en.wikipedia.org/wiki/Chroot) to install almost
full-blown Linux OS, making it much easier to maintain.

For installation, I followed Miguel Grinberg's post

* [Using a Chromebook for Web Development](https://blog.miguelgrinberg.com/post/using-a-chromebook-for-web-development)

One minor difference is that I installed Ubuntu 18.04LTS instead of the default 16.04LTS.
To see the available Linux releases, use `sh ~/Downloads/crouton -r list` (assuming crouton script is downloaded)

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
it seems to run fine on my Chromebook so far.
Overall, my installation command was

```bash
sudo sh ~/Downloads/crouton -r bionic -t xfce, xiwi
```

Without `xiwi`, one has to switch between ChromeOS and Linux using `ctrl+alt+<forward/backward (the keys next to escape)>`.
With `xiwi` installed, the Linux OS becomes an app (similar to the Android apps in ChromeOS),
or one can even run a GUI inside the Chrome browser directly.

## tips and tricks

[crouton extension to Chrome](https://goo.gl/OVQOEt)

```
sudo delete-chroot <name>
```

```
sudo enter-chroot
```


For vim users, one annoying thing is that `ctrl+w` is captured by Chrome as closing the tab.
The workaround is to expand the tab in full screen mode.
