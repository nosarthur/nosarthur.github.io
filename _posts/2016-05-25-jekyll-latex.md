---
layout: post
title:  Use latex in jekyll
date:   2016-05-25 13:19:08 -0500
categories: others
comments: true
tags: [latex, jekyll]
---

It turns out to be quite straightforward to add latex support in jekyll.
In my `_include/head.html`, I added the `MathJax` link as follows

``` html
<head>
  ....
  ....
  <script type="text/javascript"
      src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  </script>
</head>
```
Then inline latex formula can be rendered using `$$F=ma$$`. 
To get math formula in display mode, make sure there are blank 
lines before and after the formula. 

Sometimes the latex is not rendered correctly and it seems the 
problem is that the markdown interpreter tries to interpret 
the latex. In these cases, the solution is to put `<span> ... </span>`
or `<div> ... </div>` around the latex.
