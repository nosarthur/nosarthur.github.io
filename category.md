---
layout: page 
title: Categories
permalink: /category/
---
<ul>
{% assign tags_list = site.categories %}  
  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %} 
      <li><a href="#{{ tag }}">{{ tag | capitalize }} <span>{{ site.tags[tag].size }}</span></a></li>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %} 
      <li><a href="#{{ tag[0] }}">{{ tag[0] | capitalize }} <span>({{ tag[1].size }})</span></a></li>
    {% endfor %}
  {% endif %}
{% assign tags_list = nil %}
</ul>
<hr>
{% for tag in site.categories %} 
  <h3 id="{{ tag[0] }}">{{ tag[0] | capitalize }}</h3>
  <ul class="social-media-list">
    {% assign pages_list = tag[1] %}  
    {% for post in pages_list %}
      {% if post.title != null %}
      {% if group == null or group == post.group %}
      <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }} --
            <span class="entry-date">
              <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished"> {{ post.date | date: "%b %d, %Y" }}
              </time>
            </span>
          </a>
      </li>
      {% endif %}
      {% endif %}
    {% endfor %}
    {% assign pages_list = nil %}
    {% assign group = nil %}
  </ul>
{% endfor %}

