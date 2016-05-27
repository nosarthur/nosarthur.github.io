---
layout: default
title: Blog
permalink: /archives/
---

<ul class="archive-lists">
  {% for post in site.posts %}
    {% unless post.next %}
      <div class="by-year">
        <h3>{{ post.date | date: '%Y' }}</h3>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
      </div>
      <div class="by-year">
        <h3>{{ post.date | date: '%Y' }}</h3>
      {% endif %}
    {% endunless %}
    <li><span class="date">{{ post.date | date:"%b" }}</span> <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></li>
  {% endfor %}
</div></ul>
<span class="last-update">Site last generated: {{ site.time | date: "%b %-d, %Y"  }}</span>
