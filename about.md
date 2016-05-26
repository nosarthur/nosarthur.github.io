---
layout: page
title: About
permalink: /about/
---
  <div class="wrapper">
    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-2">
        <ul class="social-media-list">
          {% if site.github_username %}
          <li>
            {% include icon-github.html username=site.github_username %}
          </li>
          {% endif %}

          {% if site.twitter_username %}
          <li>
            {% include icon-twitter.html username=site.twitter_username %}
          </li>
          {% endif %}
        </ul>
      </div>

      <div class="footer-col footer-col-3">
        <p>{{ site.description }}</p>
      </div>

    </div>
  </div>

<ul class="social-media-list"> 
<li><a href="mailto:{{ site.email }}">email</a></li>
<li> <a href="http://scholar.google.com/citations?hl=en&user=9RcAQTUAAAAJ">Google Scholar</a></li>
<li><a href="https://www.linkedin.com/in/dong-zhou-84252914">LinkedIn</a></li>
<li><a href="{{ site.url }}/assets/DongZHOU.pdf">CV</a> </li>
</ul>


