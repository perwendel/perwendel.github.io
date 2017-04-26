---
layout: tutorial
title: "Using WebSockets and Spark to create a real-time chat app"
author: <a href="https://www.linkedin.com/in/davidaase" target="_blank">David Åse</a>
date: 2015-11-08 22:22:22
comments: true
permalink: /tutorials/websocket-chat
github: https://github.com/tipsy/spark-websocket
category: simple
summarytitle: Websocket chat app
summary: Use WebSockets in Spark to create a real-time chat app.
---

## What You Will Learn
In this tutorial we will create a simple real-time chat application. It will feature a chat-panel that stores messages received after you join, a list of currently connected users, and an input field to send messages from. We will be using WebSockets for this, as WebSockets provides us with full-duplex communication channels over a single TCP connection, meaning we won't have to make additional HTTP requests to send and receive messages. A WebSocket connection stays open, greatly reducing latency (and complexity).

<h3>
    A live demo can be found 
    <a href="http://spark-heroku-example.herokuapp.com/" target="_blank">here</a>
    <small>(might load slowly first time)</small>
</h3>

## Create a Spark Maven Project
First, we need to create a Spark Maven project [(→ Tutorial)](/tutorials/maven-setup)

## Dependencies
Other than Spark, we are going to use a simple Java HTML Builder [(j2html)](http://j2html.com) to generate our chat messages. Our POM.xml should have the following dependencies:

~~~xml
{% include codeExamples/websocketChat/pom.xml %}
~~~

## Creating the Java Application
We need to keep track of all our users and assign them usernames. We create a map (userUsernameMap) that maps sessions to usernames, an int for the next username (nextUserNumber), and the Spark server code:

~~~java
{% include codeExamples/websocketChat/mainInit.java %}
~~~

We also need to create a few methods for sending messages to all our connected users. We will only send messages to users whose session has the status open (Session::isOpen). We use a stream and a filter to reduce our list (the keySet of our userUsernameMap), then send out a JSON structure containing a HTML message and a list of usernames (the values of our userUsernameMap):

~~~java
{% include codeExamples/websocketChat/broadcastMessage.java %}
~~~

To create the HTML, we will use [(j2html)](http://j2html.com). We will create an article-tag containing the name of the sender, the message itself, and a timestamp:

~~~java
{% include codeExamples/websocketChat/htmlMessage.java %}
~~~

## Setting up Our WebSocketHandler
The approach we will use is very straightforward: Add the user to our userUsernameMap when he connects, remove him when he disconnects, and send all his messages to all users. Since we want usernames, but don't want complexity, we will generate usernames based on when someone connects to the server:

~~~java
{% include codeExamples/websocketChat/ChatWebSocketHandler.java %}
~~~

That's it for the Java part, the rest is HTML and JavaScript.

## Building a JavaScript Client
In order to use demonstrate that our application works, we can build a JavaScript client. First we create our index.html:

~~~html
{% include codeExamples/websocketChat/index.html %}
~~~

As you can see, we reference a stylesheet called style.css, which can be found on [GitHub](https://github.com/tipsy/spark-websocket/blob/master/src/main/resources/public/style.css)

The final step needed for completing our chat application is creating websocketDemo.js:

~~~js
{% include codeExamples/websocketChat/websocketDemo.js %}
~~~

And that's it! Now try opening localhost:4567 in a couple of different browser windows (that you can see simultaneously) and talk to yourself.

## Conlusion
Well, that was fast! We have a working real-time chat application implemented without polling, written in a total of less than 100 lines of Java and JavaScript. The implementation is very basic though, and we should at least split up the sending of the userlist and the messages (so that we don't rebuild the user list every time anyone sends a message), but since the focus of this tutorial was supposed to be on WebSockets, I chose to do the implementation as minimal as I could be comfortable with.

<div class="notification" markdown="1">
The source code for this tutorial can be found on [GitHub](https://github.com/tipsy/spark-websocket)
</div>
