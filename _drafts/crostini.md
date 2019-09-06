---
layout: post
title: Run Linux programs on ChromeBook with Crostini
date:   2019-09-01 13:00:00 -0500
categories: [coding]
comments: true
tags: [chromeOS, development environment]
---

I bought a Samsung ChromeBook Pro about two years ago as my coding laptop.
To set up the development environment, I tried Termux, Crouton, and
Chromebrew (aka `crew`), and finally settled on crew.
You can find more details in the following posts.

- [Termux article]({% post_url 2018-01-15-termux %})
- [Crouton and Chromebrew article]({% post_url 2018-07-16-crouton %})

Overall I am very satisfied with ChromeOS and this Samsung device. One missing
piece, however, is Docker. (I heard it's possible to run Docker inside Crouton
with compromised performance, but I never tried.)
The good news is that Google started a project called [Crostini](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md)
a few years ago to enable Linux container inside ChromeOS.
It can do what Termux, Crouton, and Crew can do. In addition,

- There is no need to switch to developer mode.
- We get easy installation and fast execution of Docker.

The bad news is that not all Chromebooks are supported. For example, my
Samsung ChromeBook Pro is not supported. (However, the cheaper version of this
device, i.e., Samsung Chromebook Plus and Samsung Chromebook Plus V2, are both supported.)

In late August, I got a deal for HP Chromebook x360 (14-da0021nr), which has
Crostini supported. Compared to the Samsung device, its pro and cons are

- pro
    - Good price (I paid $349, the Samsung Chromebook Pro costed me $520 in 2017.)
    - Intel 8th gen i3 processor + 8G memory + 64 GB storage
    - The 14 inch display is wide enough for 160 columns.
    - The keyboard has backlit and good travel.
    - The speaker is slightly louder, but still not as loud as I want.
    - Besides two USB-C ports, there is also a USB-A port.
- con
    - It's quite heavy: 3.7 pounds.
    - The hinge of the screen is loose. As I move the laptop, the screen dangles.

If you are interested in buying a Chromebook to run  Crostini, the following
links will be useful

- [A list of Crostini enabled devices here](https://www.reddit.com/r/Crostini/wiki/getstarted/crostini-enabled-devices)
- [Auto Update policy for all Chromebooks](https://support.google.com/chrome/a/answer/6220366):
  Google provides support for each Chromebook for a limited years. After that
  time span, the device won't be able to get ChromeOS upgrade.
- [Chrome Unboxed](https://www.youtube.com/channel/UCkHgegL2XiXSlwY5zeCKKyg):
  This is a Youtube channel with Chromebook reviews.

In the rest of the post, I will go over the setup for the development environment.

## my setup procedure

To enable Crostini, go to Settings, and search for `Linux (Beta)` and enable it.
(It can be accessed with this address too `chrome://settings/?search=linux`).

Debian stretch

```
cat /etc/issue
Debian GNU/Linux 9
```
add the following line in `/etc/apt/sources.list`

```
deb http://ftp.de.debian.org/debian testing main
```

Then run

```
echo 'APT::Default-Release "stable";' | sudo tee -a /etc/apt/apt.conf.d/00local
sudo apt-get update
sudo apt-get -t testing install python3
sudo apt-get -t testing install python3-pip
sudo apt-get -t testing install vim
sudo apt-get -t testing install golang
sudo apt-get -t testing install texlive
```

It installs python3.7, vim8.1, go1.12, and latex.
For me, it's important to have vim8.1 because it supports embedded terminal
(try `vert ter` command).

### docker

[official guild for Debian](https://docs.docker.com/install/linux/docker-ce/debian/)

```
sudo usermod -aG docker $USER
sudo chmod 666 /var/run/docker.sock
```


* [docker-curriculum](https://docker-curriculum.com/)
* [docker cheatsheet](https://github.com/eon01/DockerCheatSheet)
* [Intro Guide to Dockerfile Best Practices](https://blog.docker.com/2019/07/intro-guide-to-dockerfile-best-practices/)

### vscode

Installing vscode is simple. After downloading the installable for Debian,
move it from `Downloads` to `Linux files`. Then run
```
sudo dpkg -i code_1.37.1-1565886362_amd64.deb
```

### github blog

I also installed jekyll

```
jekyll serve --draft -P 8000
```

```
// TCP ports to statically forward to the container over SSH.
const uint16_t kStaticForwardPorts[] = {
  3000,  // Rails
  4200,  // Angular
  5000,  // Flask
  8000,  // Django
  8008,  // HTTP alternative port
  8080,  // HTTP alternative port
  8085,  // Cloud SDK
  8888,  // ipython/jupyter
  9005,  // Firebase login
};
```
- ["Well-known" ports are now auto-forwarded to the default penguin container on 70.0.3524.2](https://www.reddit.com/r/Crostini/comments/99s3t9/wellknown_ports_are_now_autoforwarded_to_the/)


## Tips

- Access ChromeOS folders from Crostini terminal
  Right click the folder and choose `share with Linux`. It then shows up in
  `/mnt/chromeos/`.
- Stay on the stable channel. I am usually on the dev channel, and often
  times the bluetooth, ear phone break. Sometimes the Chrome browser crashes
  every few minutes.
- Do not use USB-A / USB-C converter.


## Wish list

- Multiple tab for Linux terminal
- Embed the Linux app inside Chrome tab
