---
layout: post
title: Define extended keyboard layer on Mac using Karabina-elements and Goku
date:   2020-08-09 13:00:00 -0500
categories: [productivity]
comments: true
tags: [keyboard, vim]
---

As a Vim user,
I often find it annoying to switch between normal mode and insert mode
for minor edits. For example,

cursor location `|` | todo | escaping | single key
---|---|---|---
`abc|` | delete c | `<esc> + s` | `backspace`
`abc|d` | delete d | `<esc> + l + s` | `delete_forward`
`abc|` | go to beginning of line | `<esc> + I` | `home`
`{abc|}` | move cursor to the right of `}` | `<esc> + A` | `right_arrow`

You can see it's more key presses using the escaping approach.
On the other hand, these single keys are located far away.

The ideal solution is to define another keyboard layer with these useful keys mapped at some
easily accessible locations.
This is a common practice in the custom keyboard community.
Such a layer is called the **extended layer**,
and the mapping is almost standardized.

For example, the following layer comes from [the Ergonomic Keyboard Mods](https://colemakmods.github.io/ergonomic-mods/extend.html) site.
![extend-layer](https://colemakmods.github.io/ergonomic-mods/gfx/extend/extend_simple_ansi.png)

The main change is under the right hand

page_up | home | up_arrow | end
page_down | left_arrow | down_arrow | right_arrow | delete_forward

As shown in the image, the typical triggering key is either the `capslock`
or the key left to the `spacebar`.
For example, `<trigger> + k` gives rise to `down_arrow`, where `k` refers to
the key under the right middle finger at rest position.
Since my `capslock` key is already been used for` escape`, I use left `command` key for triggering.

The following layer comes from [DreymaR on the colemak forum](https://forum.colemak.com/topic/2014-extend-extra-extreme/).
You may also be interested in his [Big Bag of Keyboard Tricks](https://forum.colemak.com/topic/1467-dreymars-big-bag-of-keyboard-tricks-pklwindows-edition/).
![extend-layer-DreymaP](https://www.dropbox.com/s/111rz19f4va8jc2/Extend-ANSI-NoMod-Linux_96d.png?raw=1)


## set up on MacBook Pro

Such an extended layer is easy to set up on a programmable keyboard.
Recently I realized that it can be done on MacBook Pro (probably other Mac machines too)
using two software

- [Karabiner-Elements](https://karabiner-elements.pqrs.org/): it modifies keys
- [Goku](https://github.com/yqrashawn/GokuRakuJoudo): it is a
  [DSL (domain specific language)](https://en.wikipedia.org/wiki/Domain-specific_language)
  to help define key combos for Karabiner-Elements

Their installations are straight forward.
Just remember to allow `karabiner_grabber` and `karabiner_observer` in
**System Preferences** -> **Security & Privacy** -> **Input Monitoring**.
Also make sure there is a `Default` profile in **Karabiner-Elements** -> **Profiles**.

Then place the following content in `~/.config/karabiner.edn`.

```
{:main [{:des "extended layer with left command",
     :rules [
            [:!Cj :left_arrow]
            [:!Ck :down_arrow]
            [:!Ci :up_arrow]
            [:!Cl :right_arrow]
            [:!Cu :home]
            [:!Co :end]
            [:!Ch :page_down]
            [:!Cy :page_up]
            [:!Csemicolon :delete_or_backspace]
            [:!Cspacebar :delete_forward]
      ]}]
 }
```
Here `C` is the left command key. `!` means the command key press is mandatory.

Note that even if you use a different keyboard layout from qwerty (I use [colemak-dh](https://colemakmods.github.io/mod-dh/)),
this is still the correct content.

With this `karabiner.edn` in place, type in shell

```
goku
```

If all goes well, you will see

```
Done!
```

And `~/.config/karabiner/karabiner.json` will be updated.
Also **Karabiner-Elements** -> **Complex modifications** will show `extended layer with left command`.


