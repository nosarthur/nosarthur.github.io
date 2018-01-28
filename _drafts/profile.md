---
layout: post
title: Profiling
date:   2018-10-18 13:00:00 -0500
categories: [coding]
comments: true
tags: [go]
---




> We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. --- Donald Knuth



```
python -m cProfile -o profiling_results profile_test.py
```


```
import pstats
stats = pstats.Stats("profiling_results")
stats.sort_stats("tottime")
stats.print_stats(10)
```
