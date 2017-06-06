---
layout: default
title: Documentation
rightmenu: true
permalink: /documentation
---

<div id="spy-nav" class="right-menu" markdown="1">
* [Getting Started](#getting-started)
* [Stopping the Server](#stopping-the-server)
* [Routes](#routes)
* [Request](#request)
* [Response](#response)
* [Query Maps](#query-maps)
* [Cookies](#cookies)
* [Sessions](#sessions)
* [Halting](#halting)
* [Filters](#filters)
* [Redirects](#redirects)
* [Error Handling](#error-handling)
* [Exception Mapping](#exception-mapping)
* [Static Files](#static-files)
* [ResponseTransformer](#response-transformer)
* [Views and Templates](#views-and-templates)
* [Embedded Webserver](#embedded-web-server)
  * [- Port](#port)
  * [- Secure](#secure)
  * [- ThreadPool](#threadpool)
  * [- Await initialization](#awaitinit)
  * [- WebSockets](#websockets)
* [Other Webserver](#other-web-server)
* [GZIP](#gzip)
* [Javadoc](#javadoc)
* [Examples/FAQ](#examples-and-faq)
</div>

<h1 class="no-margin-top">Documentation</h1>
Documentation here is always for the latest version of Spark. We don't have the capacity to maintain separate docs for each version, but Spark is always backwards compatible.

Docs for [(spark-kotlin)](http://sparkjava.com/news#spark-kotlin-released) will arrive here ASAP.
You can follow the progress of spark-kotlin on [(GitHub)](https://github.com/perwendel/spark-kotlin)       

<div class="star-one star-two">
    <div>
        If you like spark-kotlin star us and help the community grow:
    </div>
    <iframe id="starFrame" class="githubStar"
            src="https://ghbtns.com/github-btn.html?user=perwendel&amp;repo=spark-kotlin&amp;type=star&amp;count=true&size=large"
            frameborder="0" scrolling="0" width="205px" height="30px">
    </iframe>
</div>

## Getting started

**1:** Create a new maven project and add the dependency to your [POM.xml](http://maven.apache.org/pom.html):
{% include macros/mavenDep.md %}

**2:** Start coding:
~~~java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World");
    }
}
~~~

**3:** Run and view:
~~~bash
http://localhost:4567/hello
~~~

To see more console output from Spark (debug info, etc), you have to [add a logger](#how-do-i-enable-logging) to your project.

## Stopping the Server
By calling the stop() method the server is stopped and all routes are cleared.

~~~java
stop();
~~~

### Wait, what about starting the server?
The server is automatically started when you do something that requires the server to be started (i.e. declaring a route or setting the port).  
You can also manually start the server by calling `init()`.

You can specify what should happen if initialization fails: 

~~~java
initExceptionHandler((e) -> System.out.println("Uh-oh"));
~~~

The default behaviour is to log and shut down: 
~~~java
private Consumer<Exception> initExceptionHandler = (e) -> {
    LOG.error("ignite failed", e);
    System.exit(100);
};
~~~

## Routes
The main building block of a Spark application is a set of routes. A route is made up of three simple pieces:

* A **verb** (get, post, put, delete, head, trace, connect, options)
* A **path** (/hello, /users/:name)
* A **callback** (request, response) -> { }

Routes are matched in the order they are defined. The first route that matches the request is invoked.  
Always statically import Spark methods to ensure good readability:

~~~java
get("/", (request, response) -> {
    // Show something
});

post("/", (request, response) -> {
    // Create something
});

put("/", (request, response) -> {
    // Update something
});

delete("/", (request, response) -> {
    // Annihilate something
});

options("/", (request, response) -> {
    // Appease something
});
~~~

Route patterns can include named parameters, accessible via the `params()` method on the request object:
~~~java
// matches "GET /hello/foo" and "GET /hello/bar"
// request.params(":name") is 'foo' or 'bar'
get("/hello/:name", (request, response) -> {
    return "Hello: " + request.params(":name");
});
~~~

Route patterns can also include splat (or wildcard) parameters. These parameters can be accessed by using the `splat()` method on the request object:

~~~java
// matches "GET /say/hello/to/world"
// request.splat()[0] is 'hello' and request.splat()[1] 'world'
get("/say/*/to/*", (request, response) -> {
    return "Number of splat parameters: " + request.splat().length;
});
~~~

### Path groups
If you have a lot of routes, it can be helpful to separate them into groups. This can be done by calling the `path()` method, which takes a `String prefix` and gives you a scope to declare routes and filters (or nested paths) in:

~~~java
path("/api", () -> {
    before("/*", (q, a) -> log.info("Received api call"));
    path("/email", () -> {
        post("/add",       EmailApi.addEmail);
        put("/change",     EmailApi.changeEmail);
        delete("/remove",  EmailApi.deleteEmail);
    });
    path("/username", () -> {
        post("/add",       UserApi.addUsername);
        put("/change",     UserApi.changeUsername);
        delete("/remove",  UserApi.deleteUsername);
    });
});
~~~

## Request
Request information and functionality is provided by the request parameter:
~~~java
request.attributes();             // the attributes list
request.attribute("foo");         // value of foo attribute
request.attribute("A", "V");      // sets value of attribute A to V
request.body();                   // request body sent by the client
request.bodyAsBytes();            // request body as bytes
request.contentLength();          // length of request body
request.contentType();            // content type of request.body
request.contextPath();            // the context path, e.g. "/hello"
request.cookies();                // request cookies sent by the client
request.headers();                // the HTTP header list
request.headers("BAR");           // value of BAR header
request.host();                   // the host, e.g. "example.com"
request.ip();                     // client IP address
request.params("foo");            // value of foo path parameter
request.params();                 // map with all parameters
request.pathInfo();               // the path info
request.port();                   // the server port
request.protocol();               // the protocol, e.g. HTTP/1.1
request.queryMap();               // the query map
request.queryMap("foo");          // query map for a certain parameter
request.queryParams();            // the query param list
request.queryParams("FOO");       // value of FOO query param
request.queryParamsValues("FOO")  // all values of FOO query param
request.raw();                    // raw request handed in by Jetty
request.requestMethod();          // The HTTP method (GET, ..etc)
request.scheme();                 // "http"
request.servletPath();            // the servlet path, e.g. /result.jsp
request.session();                // session management
request.splat();                  // splat (*) parameters
request.uri();                    // the uri, e.g. "http://example.com/foo"
request.url();                    // the url. e.g. "http://example.com/foo"
request.userAgent();              // user agent
~~~

## Response
Response information and functionality is provided by the response parameter:

~~~java
response.body();               // get response content
response.body("Hello");        // sets content to Hello
response.header("FOO", "bar"); // sets header FOO with value bar
response.raw();                // raw response handed in by Jetty
response.redirect("/example"); // browser redirect to /example
response.status();             // get the response status
response.status(401);          // set status code to 401
response.type();               // get the content type
response.type("text/xml");     // set content type to text/xml
~~~

## Query Maps
Query maps allows you to group parameters to a map by their prefix. This allows you to group two parameters like `user[name]` and `user[age]` to a user map.
~~~java
request.queryMap().get("user", "name").value();
request.queryMap().get("user").get("name").value();
request.queryMap("user").get("age").integerValue();
request.queryMap("user").toMap();
~~~

## Cookies
~~~java
request.cookies();                         // get map of all request cookies
request.cookie("foo");                     // access request cookie by name
response.cookie("foo", "bar");             // set cookie with a value
response.cookie("foo", "bar", 3600);       // set cookie with a max-age
response.cookie("foo", "bar", 3600, true); // secure cookie
response.removeCookie("foo");              // remove cookie
~~~

## Sessions
Every request has access to the session created on the server side, provided with the following methods:
~~~java
request.session(true);                     // create and return session
request.session().attribute("user");       // Get session attribute 'user'
request.session().attribute("user","foo"); // Set session attribute 'user'
request.session().removeAttribute("user"); // Remove session attribute 'user'
request.session().attributes();            // Get all session attributes
request.session().id();                    // Get session id
request.session().isNew();                 // Check if session is new
request.session().raw();                   // Return servlet object
~~~

## Halting
To immediately stop a request within a filter or route use `halt()`:
~~~java
halt();                // halt 
halt(401);             // halt with status
halt("Body Message");  // halt with message
halt(401, "Go away!"); // halt with status and message
~~~

`halt()` is not intended to be used inside exception-mappers.

## Filters
Before-filters are evaluated **before each request**, and can read the request and read/modify the response.  
To stop execution, use `halt()`:
~~~java
before((request, response) -> {
    boolean authenticated;
    // ... check if authenticated
    if (!authenticated) {
        halt(401, "You are not welcome here");
    }
});
~~~

After-filters are evaluated **after each request**, and can read the request and read/modify the response:
~~~java
after((request, response) -> {
    response.header("foo", "set by after filter");
});
~~~

After-after-filters are evaluated **after after-filters**. Think of it as a "finally" block.
~~~java
afterAfter((request, response) -> {
    response.header("foo", "set by afterAfter filter");
});
~~~

Filters optionally take a pattern, causing them to be evaluated only if the request path matches that pattern:
~~~java
before("/protected/*", (request, response) -> {
    // ... check if authenticated
    halt(401, "Go Away!");
});
~~~

## Redirects
You can trigger a browser redirect with the redirect method on the response:
~~~java
response.redirect("/bar");
~~~

You can also trigger a browser redirect with specific HTTP 3XX status code:
~~~java
response.redirect("/bar", 301); // moved permanently
~~~

### Redirect API
There is also a convenience API for redirects which can be used directly without the response:

~~~java
// redirect a GET to "/fromPath" to "/toPath"
redirect.get("/fromPath", "/toPath");

// redirect a POST to "/fromPath" to "/toPath", with status 303
redirect.post("/fromPath", "/toPath", Redirect.Status.SEE_OTHER);

// redirect any request to "/fromPath" to "/toPath" with status 301
redirect.any("/fromPath", "/toPath", Redirect.Status.MOVED_PERMANENTLY);
~~~

Remember to **import Spark statically** instead of prefixing it as Spark.redirect

## Custom error handling {#error-handling}

### Not found (code 404) handling

~~~java
// Using string/html
notFound("<html><body><h1>Custom 404 handling</h1></body></html>");
~~~

~~~java
// Using Route
notFound((req, res) -> {
    res.type("application/json");
    return "{\"message\":\"Custom 404\"}";
});
~~~

### Internal server error (code 500) handling
~~~java
// Using string/html
internalServerError("<html><body><h1>Custom 500 handling</h1></body></html>");
~~~

~~~java
// Using Route
internalServerError((req, res) -> {
    res.type("application/json");
    return "{\"message\":\"Custom 500 handling\"}";
});
~~~

## Exception Mapping
To handle exceptions of a configured type for all routes and filters:
~~~java
get("/throwexception", (request, response) -> {
    throw new YourCustomException();
});

exception(YourCustomException.class, (exception, request, response) -> {
    // Handle the exception here
});
~~~

## Static Files
You can assign a folder in the classpath serving static files with the `staticFiles.location()` method. Note that the public directory name is not included in the URL.  
A file `/public/css/style.css` is made available as `http://{host}:{port}/css/style.css`

~~~java
// root is 'src/main/resources', so put files in 'src/main/resources/public'
staticFiles.location("/public"); // Static files
~~~

You can also assign an external folder (a folder not in the classpath) to serve static files by using the `staticFiles.externalLocation()` method.\\

~~~java
staticFiles.externalLocation(System.getProperty("java.io.tmpdir"));
~~~

Static files location must be configured before route mapping. If your application has no routes, `init()` must be called manually after location is set.

### Cache/Expire time
You can specify the expire time (in seconds). By default there is no caching.

~~~java
staticFiles.expireTime(600); // ten minutes
~~~

### Setting custom headers
~~~java
staticFiles.header("Key-1", "Value-1");
staticFiles.header("Key-1", "New-Value-1"); // Using the same key will overwrite value
staticFiles.header("Key-2", "Value-2");
staticFiles.header("Key-3", "Value-3");
~~~

## ResponseTransformer {#response-transformer}
Mapped routes that transform the output from the handle method. This is done by extending the `ResponseTransformer` object and passing it to the mapping method. Example of a route transforming output to JSON using Gson:

~~~java
import com.google.gson.Gson;

public class JsonTransformer implements ResponseTransformer {

    private Gson gson = new Gson();

    @Override
    public String render(Object model) {
        return gson.toJson(model);
    }

}
~~~

and how it is used (MyMessage is a bean with one member 'message'):

~~~java
get("/hello", "application/json", (request, response) -> {
    return new MyMessage("Hello World");
}, new JsonTransformer());
~~~

You can also use Java 8 method references, since ResponseTransformer is an interface with one method:

~~~java
Gson gson = new Gson();
get("/hello", (request, response) -> new MyMessage("Hello World"), gson::toJson);
~~~

## Views and Templates
Spark has community-provided wrappers for a lot of popular template engines:

<div class="template-engine-list" markdown="1">
* [Velocity](#velocity) (very mature, feature rich, great IDE support)
* [Freemarker](#freemarker) (very mature, feature rich, great IDE support)
* [Mustache](#mustache) (mature, decent IDE support)
* [Handlebars](#handlebars) (mature, decent IDE support)
* [Jade](#jade) (mature, decent IDE support)
* [Thymeleaf](#thymeleaf) (mature, feature rich, decent IDE support)
* [Pebble](#pebble) (we know very little about this)
* [Water](#water) (we know very little about this)
* [jTwig](#jtwig) (we know very little about this)
* [Jinjava](#jinjava) (we know very little about this)
* [Jetbrick](#jetbrick) (we know very little about this)
</div>

There are two main ways of rendering a template in Spark. You can either call render directly in a standard route declaration (recommended), or you can provide the template-engine as a third-route parameter (likely to be removed in the future):

~~~java
// do this
get("template-example", (req, res) -> {
    Map<String, Object> model = new HashMap<>();
    return new VelocityTemplateEngine().render(
        new ModelAndView(model, "path-to-template")
    );
});
~~~

~~~java
// don't do this
get("template-example", (req, res) -> {
    Map<String, Object> model = new HashMap<>();
    return new ModelAndView(model, "path-to-template");
}, new VelocityTemplateEngine());
~~~

It can be helpful to create a static utility method for rendering:
~~~java
get("template-example", (req, res) -> {
    Map<String, Object> model = new HashMap<>();
    return render(model, "path-to-template");
});

// declare this in a util-class
public static String render(Map<String, Object> model, String templatePath) {
    return new VelocityTemplateEngine().render(new ModelAndView(model, templatePath));
}
~~~
{% assign templateEngines = "velocity,freemarker,mustache,handlebars,jade,thymeleaf,pebble,water,jtwig,jinjava,jetbrick" | split: "," %}

{% for templateEngine in templateEngines %}
<div class="template-engine" markdown="1">
### {{templateEngine | capitalize}} {#{{templateEngine}}}
Renders HTML using the {{templateEngine | capitalize}} template engine. 
Source and example on [GitHub](https://github.com/perwendel/spark-template-engines/tree/master/spark-template-{{templateEngine}}).

<div class="language-xml highlighter-rouge" markdown="1">
~~~markup
<dependency>
    <groupId>com.sparkjava</groupId>
    <artifactId>spark-template-{{templateEngine}}</artifactId>
    <version>{{site.templateversion}}</version>
</dependency>
~~~
</div>
</div>
{% endfor %}

## Embedded web server

Standalone Spark runs on an embedded [Jetty](http://eclipse.org/jetty/) web server.

### Port
By default, Spark runs on port 4567. If you want to set another port, use `port()`. 
This has to be done before declaring routes and filters:

~~~java
port(8080); // Spark will run on port 8080
~~~

### Secure (HTTPS/SSL) {#secure}

You can set the connection to be secure via the `secure()` method.\\
This has to be done before any route mapping:

~~~java
secure(keystoreFilePath, keystorePassword, truststoreFilePath, truststorePassword);
~~~

If you need more help, check out the [FAQ](#enable-ssl).

### ThreadPool

You can set the maximum number of threads easily:

~~~java
int maxThreads = 8;
threadPool(maxThreads);
~~~

You can also configure the minimum numbers of threads, and the idle timeout:

~~~java
int maxThreads = 8;
int minThreads = 2;
int timeOutMillis = 30000;
threadPool(maxThreads, minThreads, timeOutMillis);
~~~

### Waiting for Initialization {#awaitinit}
You can use the method `awaitInitialization()` to check if the server is ready to handle requests. This is usually done in a separate thread, for example to run a health check module after your server has started.  
The method causes the current thread to wait until the embedded Jetty server has been initialized. Initialization is triggered by defining routes and/or filters. So, if you're using just one thread don't put this before you define your routes and/or filters.

~~~java
awaitInitialization(); // Wait for server to be initialized
~~~

### WebSockets
WebSockets provide a protocol full-duplex communication channel over a single TCP connection, meaning you can send message back and forth over the same connection.

WebSockets only works with the embedded Jetty server, and must be defined before regular HTTP routes. To create a WebSocket route, you need to provide a path and a handler class:

~~~java
webSocket("/echo", EchoWebSocket.class);
init(); // Needed if you don't define any HTTP routes after your WebSocket routes
~~~

~~~java
import org.eclipse.jetty.websocket.api.*;
import org.eclipse.jetty.websocket.api.annotations.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;

@WebSocket
public class EchoWebSocket {

    // Store sessions if you want to, for example, broadcast a message to all users
    private static final Queue<Session> sessions = new ConcurrentLinkedQueue<>();

    @OnWebSocketConnect
    public void connected(Session session) {
        sessions.add(session);
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {
        sessions.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        System.out.println("Got: " + message);   // Print message
        session.getRemote().sendString(message); // and send it back
    }

}
~~~

## Other web server
To run Spark on another web server (instead of the embedded jetty server), an implementation of the interface `spark.servlet.SparkApplication` is needed. You have to initialize your routes in the `init()` method, and the following filter might have to be configured in your web.xml:

~~~xml
<filter>
    <filter-name>SparkFilter</filter-name>
    <filter-class>spark.servlet.SparkFilter</filter-class>
    <init-param>
        <param-name>applicationClass</param-name>
        <param-value>com.company.YourApplication</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>SparkFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
~~~

## GZIP
GZIP is done automatically if it's in both the request and the response headers. This usually only means that you have to set it in your response headers.

If you want to GZIP a single response, you can add it manually to your route:

~~~java
get("/some-path", (request, response) -> {
    // code for your get
    response.header("Content-Encoding", "gzip");
});
~~~

If you want to GZIP everything, you can use an after-filter
~~~java
after((request, response) -> {
    response.header("Content-Encoding", "gzip");
});
~~~

## Javadoc
### javadoc.io
Javadoc is available at [javadoc.io](http://javadoc.io/doc/com.sparkjava/spark-core).

### Build it yourself
After getting the source from [GitHub](https://github.com/perwendel/spark) run:

~~~bash
mvn javadoc:javadoc
~~~
The result is put in /target/site/apidocs


## Examples and FAQ
Examples can be found on the project's page on [GitHub](https://github.com/perwendel/spark/blob/master/README.md#examples).

### How do I upload something?
_Note: This applies to the standard configuration of Spark (embedded jetty). If you're using Spark with some other webserver, this might not apply to you._

To upload a file you need a form and a post handler. First, create a form with the correct enctype, and an input field with the type "file" and a name of your choice (here "upoaded_file"):
~~~html
<form method='post' enctype='multipart/form-data'>
    <input type='file' name='uploaded_file'>
    <button>Upload picture</button>"
</form>"
~~~

For Spark to be able to extract the uploaded file, you have to set a specific request attribute, which allows to use the `getPart()` method on the raw request:
~~~java
post("/yourUploadPath", (request, response) -> {
    request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));
    try (InputStream is = request.raw().getPart("uploaded_file").getInputStream()) {
        // Use the input stream to create a file
    }
    return "File uploaded";
});
~~~

The Java-IO-stuff is left out as it's not Spark-specific, but you can see a fully working example [here](https://github.com/tipsy/spark-file-upload).

### How do I enable SSL/HTTPS?
Enabling HTTPS/SSL requires you to have a keystore file, which you can generate using the Java keytool [(→ oracle docs)](https://docs.oracle.com/cd/E19509-01/820-3503/ggfen/index.html). Once you have the keystore file, just point to its location and include its password.

~~~java
String keyStoreLocation = "deploy/keystore.jks";
String keyStorePassword = "password";
secure(keyStoreLocation, keyStorePassword, null, null);
~~~
Check out the [fully working example](https://github.com/tipsy/spark-ssl) on GitHub if you need more guidance.

### How do I enable logging?
You might have seen this message when starting Spark:
~~~bash
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
~~~

To enable logging, just add the following dependency to your project:
~~~xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.21</version>
</dependency>
~~~

### How do I enable automatic refresh of static files?
If you use `staticFiles.location()`, meaning you keep your static files in the classpath, static resources are copied to a target folder when you build your application. This means you have to make/build your project in order to refresh static files. A workaround for this is to tell Spark to read static files from the absolute path to the src-directory. If you do this you will see changes instantly when you refresh, but if you build a jar file it will only work on your computer (because of the absolute path). So, **only use this during development.**

~~~java
if (localhost) {
    String projectDir = System.getProperty("user.dir");
    String staticDir = "/src/main/resources/public";
    staticFiles.externalLocation(projectDir + staticDir);
} else {
    staticFiles.location("/public");
}
~~~
