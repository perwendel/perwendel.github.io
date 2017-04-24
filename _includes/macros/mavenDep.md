~~~xml
<dependency>
    <groupId>com.sparkjava</groupId>
    <artifactId>spark-core</artifactId>
    <version>{{site.sparkversion}}</version>
</dependency>
~~~

[Not familiar with Maven? Click here for more detailed instructions.](/tutorials/maven-setup)

### Other dependency managers:
<div class="smaller-code" markdown="1">
~~~java
Gradle : compile "com.sparkjava:spark-core:{{site.sparkversion}}" //add to build.gradle
   Ivy : <dependency org="com.sparkjava" name="spark-core" rev="{{site.sparkversion}}" conf="build" /> //ivy.xml
   SBT : libraryDependencies += "com.sparkjava" % "spark-core" % "{{site.sparkversion}}" //build.sbt
~~~
</div>