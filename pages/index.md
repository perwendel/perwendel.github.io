---
layout: default
rightmenu: false
permalink: /
---

<h2 class="no-margin-top">Quick start</h2>
~~~java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World");
    }
}
~~~

### Run and view
~~~bash
http://localhost:4567/hello
~~~

## Built for productivity
Spark Framework is a simple and lightweight Java web framework built for rapid development. Spark was originally inspired by the web framework Sinatra, but it's intention isn't to compete with Sinatra, or other similar web frameworks in different languages. Sparks intention is to provide a pure Java alternative for developers that want to (or are required to), develop their web application in Java. Spark is built around Java 8's lambda philosophy, which makes a typical Spark application a lot less verbose than most application written in other Java web frameworks.

Spark focuses on being as simple and straight-forward as possible, without the need for cumbersome (XML) configuration, to enable very fast web application development in pure Java with minimal effort. It’s a totally different paradigm when compared to the overuse of annotations for accomplishing pretty trivial stuff seen in other web frameworks.

## Lets you take full advantage of the JVM
The JVM offers one of the biggest programming ecosystems in the world. It has a lot of Java web frameworks, but pure Java web development has traditionally been very cumbersome. If you love the JVM, but hate verbose code and frameworks, Spark is the web framework for you. It will have you up and running in minutes, and you can even use it with Groovy or Kotlin or whatever you want. Spark is a simple, lightweight and unopinionated pure Java web framework that doesn't get in your way, unlike in other Java web frameworks, you can structure your application as you want.

## Microservices, microservices everywhere!
2015 was the year of microservice hype, and now that you're getting around to looking into it you're about to realize that Spark is great for microservices. Microservices work best with micro frameworks, and Spark has your REST API ready to serve JSON in less than ten lines of code. Spark is mainly used for creating REST API's, but it also supports a multitude of template engines. Why not create one Spark application for your backend and one for your frontend?

### Some companies using Spark:
<img src="/img/using-spark.png" alt="Companies using Spark">

## NodeJS developer? Using TypeScript? Try Spark instead!
Lately, a lot of server-side web development has been taken over by NodeJS, but a growing number of NodeJS developers are using TypeScript and other statically typed languages that compile to JavaScript. Why not go all the way and use a language that was actually designed with types, and intended to run on the server-side? You also get all the benefits of running your application on the JVM, where libraries aren't deprecated every day. If you're coming from ExpressJS, then Spark's syntax will feel very familiar, and unlike a lot of JavaScript web frameworks, Spark won't be deprecated tomorrow.

## Typical usage
Our [2015 survey](/news#sparksurvey) tells us that over 50% of Spark users use Spark to create REST APIs, while about 25% use Spark to create websites. About 15% of deployed Spark applications each serve more than 10.000 users a day. Click [here](/news#sparksurvey) to read the full survey.