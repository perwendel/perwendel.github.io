---
layout: default
title: Tutorials
permalink: /tutorials/
---

{% assign tutorials = (site.posts | where: "layout" , "tutorial") %}
{% assign simpleTuts = (tutorials | where: "category" , "simple") %}
{% assign intermediateTuts = (tutorials | where: "category" , "intermediate") %}

<div class="tutorial-overview">
<ul class="tutorial-list">
    <h2>Simple/short</h2>
    {% for tutorial in simpleTuts %}
    <li class="tutorial-summary">
      <h2><a href="{{ tutorial.url }}">{{ tutorial.summarytitle }}</a></h2>
      <p>{{ tutorial.summary }}</p>
    </li>
    {% endfor %}
</ul>
<ul class="tutorial-list">
    <h2>Intermediate/long</h2>
    {% for tutorial in intermediateTuts %}
    <li class="tutorial-summary">
      <h2><a href="{{ tutorial.url }}">{{ tutorial.summarytitle }}</a></h2>
      <p>{{ tutorial.summary }}</p>
    </li>
    {% endfor %}
</ul>
</div>