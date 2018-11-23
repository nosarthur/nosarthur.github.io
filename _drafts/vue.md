---
layout: post
title: Vue.js
date:   2018-12-21 13:00:00 -0500
categories: [coding]
comments: true
tags: [javascript]
---

* [vue-router](https://router.vuejs.org/)
* [vuex](https://vuex.vuejs.org/)

## data binding

### one-way and two-way binding

```javascript
<tag> {{ myStr }} </tag>
```

```javascript
<input-tag v-model="myStr"> </input-tag>
```

https://vuejs.org/v2/guide/forms.html

### class and style binding

```javascript
<tag v-bind:x="myStr> </tag>
```

Shortcut
```javascript
<tag :x="myStr> </tag>
```

### more complicated situation

```javascript
<b-tab :title="`Search: ${name}`" active>
```

## reactivity detection caveats

[detection caveats](https://vuejs.org/v2/guide/list.html#Caveats)

will be [fixed in vue 2](https://github.com/vuejs/roadmap/blob/master/README.md)

## vue-router caveats

Remember that params or query changes won't trigger enter/leave navigation guards.

https://router.vuejs.org/guide/advanced/navigation-guards.htm

`beforeRouteUpdate` in-component guard.

`beforeEnter` Per-Route Guard is not triggered

