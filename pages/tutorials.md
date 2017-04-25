---
layout: default
title: Tutorials
rightmenu: true
permalink: /tutorials/
---

{% assign tutorials = (site.posts | where: "layout" , "tutorial") %}
{% for tutorial in tutorials %}
<div class="tutorial-summary">
  <h2><a href="{{ tutorial.url }}">{{ tutorial.summarytitle }}</a></h2>
  <p>{{ tutorial.summary }}</p>
</div>
{% endfor %}
