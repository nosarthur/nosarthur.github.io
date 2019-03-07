---
layout: post
title: Coding experience on Chromebook
date: 2019-01-25 17:00:00 -0500
categories: [coding]
comments: true
tags: [chromebook]
---

**TL;DR** To use the chromebook productively as a programmer

- enable developer mode
- install [chromebrew](https://github.com/skycocker/chromebrew)
- stay on the stable channel

in chronicle order

- ssh to gcloud to do coding
-

Redhat, Fedora,

The channel

Settings -> About Chrome OS -> Detailed build information

- Stable
- Beta
- Developer - unstable

There is an even more **Canary** channel. Type the following command in crosh:

```
live_in_a_coal_mine
```

chromebrew only supports stable channel

vs code has

https://github.com/Microsoft/vscode/issues/2647#issuecomment-269403183

/usr/local/share/code/resources/app/product.json

```
"extensionsGallery": {
  "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
  "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
  "itemUrl": "https://marketplace.visualstudio.com/items"
}
```

## golang

```
go get -v golang.org/x/tools/cmd/godoc
go get -v golang.org/x/tools/cmd/goimports
```
## complaints

- With developer mode, `ctrl+d` to proceed with the boot process.
- There is no way to show date on the task bar, only time.
