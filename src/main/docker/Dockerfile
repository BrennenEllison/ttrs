FROM openjdk:17-jdk-alpine
RUN mkdir "app"
WORKDIR /app
COPY target/ttrs-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]