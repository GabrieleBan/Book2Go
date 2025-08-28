FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy any JAR from target into the container as app.jar
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]