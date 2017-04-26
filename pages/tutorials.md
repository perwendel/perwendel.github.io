---
layout: default
title: Tutorials
permalink: /tutorials/
---

{% assign tutorials = (site.posts | where: "layout" , "tutorial") %}
{% assign simpleTuts = (tutorials | where: "category" , "simple") %}
{% assign intermediateTuts = (tutorials | where: "category" , "intermediate") %}

<h1 class="no-margin-top">Tutorials</h1>
<div class="tutorials-header" markdown="1">
We recommend starting with either the [Maven setup](maven-setup) or [Gradle setup](gradle-setup) tutorial, then going through the [Basic webapp structure](application-structure) tutorial.

</div>

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
<div class="tutorials-footer" markdown="1">
The tutorials here are written by Spark users and reposted with their permission.
If you have have a tutorial you want to submit, please create a pull request on [GitHub](https://github.com/perwendel/perwendel.github.io/tree/master/_posts/tutorials), or send us an email.
</div>
