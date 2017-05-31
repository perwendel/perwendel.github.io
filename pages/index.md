---
layout: default
rightmenu: false
permalink: /
---

<h2 class="no-margin-top">Quick start</h2>
<h3>Java</h3>
~~~java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World");
    }
}
~~~

<h3>Kotlin</h3>
~~~kotlin
import spark.kotlin.*

fun main(args: Array<String>) {
    val http: Http = ignite()

    http.get("/hello") {
        "Hello Spark Kotlin!"
    }
}
~~~

### Run and view
~~~bash
http://localhost:4567/hello
~~~

## Built for productivity
Spark Framework is a simple and expressive Java/Kotlin web framework DSL built for rapid development. Sparks intention is to provide an alternative for Kotlin/Java developers that want to develop their web applications as expressive as possible and with minimal boilerplate. With a clear philosophy Spark is designed not only to make you more productive, but also to make your code better under the influence of Spark’s sleek, declarative and expressive syntax.

## Lets you take full advantage of the JVM
The JVM offers one of the biggest programming ecosystems in the world. It has a lot of Java web frameworks, but pure Java web development has traditionally been very cumbersome. If you love the JVM, but hate verbose code and frameworks, Spark is the web framework for you. It will have you up and running in minutes, and you can even use it with Groovy or Kotlin or whatever you want. Spark is an expressive, lightweight and unopinionated pure Java (and Kotlin) web framework that doesn't get in your way, unlike in other web frameworks, you can structure your application as you want.

## Microservices, microservices everywhere!
2015 was the year of microservice hype, and now that you're getting around to looking into it you're about to realize that Spark is great for microservices. Microservices work best with micro frameworks, and Spark has your REST API ready to serve JSON in less than ten lines of code. Spark is mainly used for creating REST API's, but it also supports a multitude of template engines. Why not create one Spark application for your backend and one for your frontend?

### Some companies using Spark:
<img src="/img/using-spark.png" alt="Companies using Spark">

## NodeJS developer? Using TypeScript? Try Spark instead!
Lately, a lot of server-side web development has been taken over by NodeJS, but a growing number of NodeJS developers are using TypeScript and other statically typed languages that compile to JavaScript. Why not go all the way and use a language that was actually designed with types, and intended to run on the server-side? You also get all the benefits of running your application on the JVM, where libraries aren't deprecated every day. If you're coming from ExpressJS, then Spark's syntax will feel very familiar, and unlike a lot of JavaScript web frameworks, Spark won't be deprecated tomorrow.

## Typical usage
Our [2015 survey](/news#sparksurvey) tells us that over 50% of Spark users use Spark to create REST APIs, while about 25% use Spark to create websites. About 15% of deployed Spark applications each serve more than 10.000 users a day. Click [here](/news#sparksurvey) to read the full survey.