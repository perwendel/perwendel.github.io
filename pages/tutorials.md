---
layout: default
title: Tutorials
rightmenu: true
permalink: /tutorials/
---

{% include tutorialNav.html %}
{% assign tutorials = (site.posts | where: "layout" , "tutorial") %}
{% for tutorial in tutorials %}
<div class="tutorial-summary">
  <h2><a href="{{ tutorial.url }}">{{ tutorial.title }}</a></h2>
  <p>{{ tutorial.summary }}</p>
  <div class="tutorial-summary__meta">
      {{ tutorial.date | date: "%b %-d, %Y" }}
      {% if tutorial.author %} • Written by {{ tutorial.author }} {% endif %}
   </div>
</div>
{% endfor %}
