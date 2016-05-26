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
          <li><a href="mailto:{{ site.email }}">email</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col-3">
        <p>{{ site.description }}</p>
      </div>

    </div>
  </div>

* [Google Scholar][scholar]
* [LinkedIn][linkedin]
* [CV][CV]



[scholar]: http://scholar.google.com/citations?hl=en&user=9RcAQTUAAAAJ
[linkedin]: https://www.linkedin.com/in/dong-zhou-84252914
[CV]: {{ site.url }}/assets/DongZHOU.pdf
