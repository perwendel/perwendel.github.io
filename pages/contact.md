---
layout: default
title: Contact
rightmenu: false
permalink: /contact
---

<h1 class="no-margin-top">Get involved</h1>
Do you have a passion for Java and web frameworks? Do you want to work on one of the most popular Java web frameworks in the world? We're always looking for people to join Spark Framework. If you're interested in contributing, click on the "Fork me on Github" banner in the top right corner and start coding, or contact one of the team members to learn how you can help out.

### Found a vulnerability?
Please try to email us. If this fails, follow [these steps](/news#best-practice-for-reporting-vulnerabilities).

### Technical questions?
Please use [stack overflow](http://stackoverflow.com/questions/tagged/spark-java) with the "spark-java" tag.

## The Team
If you have questions that can't be asked elsewhere, please contact the most appropriate team member.
We're usually pretty friendly, but questions like "How do I add Spark to Maven", should be asked on 
[stack overflow](http://stackoverflow.com/questions/tagged/spark-java) with the "spark-java" tag.

<div class="team">
{% include macros/teamMember.html
    firstName = "Per"
    lastName = "Wendel"
    role = "Founder and main maintainer"
    twitter = "perwendel"
    linkedin = "perwendel" 
    github = "perwendel" 
    email = "per.i.wendel@gmail.com"
    imgFile = "per.png"
%}
{% include macros/teamMember.html 
    firstName = "David"
    lastName = "Åse"
    role = "Webmaster and co-maintainer"
    linkedin = "davidase" 
    github = "tipsy" 
    email = "mail.davidase@gmail.com" 
    imgFile = "david.png"
%}
{% include macros/teamMember.html 
    firstName = "Love"
    lastName = "Löfdahl"
    role = "Co-founder spark-kotlin"
    twitter = "lallemupp"
    github = "lallemupp"
    email = "love.lofdahl@gmail.com" 
    imgFile = "love.jpg"
%}
</div>

### Top contributors

<ul class="contributors">
{% for c in site.data.contributors %}
  {%if c.login != "perwendel" and c.login != "tipsy" and c.login != "sonyperwendel" %}
  <li>
    <a href="{{c.html_url}}">
        <img src="{{ c.avatar_url }}" alt="{{ c.login }}">
        <span>{{ c.login }} ({{ c.contributions }})</span>
    </a>
  </li>
  {% endif %}
{% endfor %}
</ul>