# --- build stage (optional if you use the CI-built JAR as artifact) ---
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package spring-boot:repackage

# --- runtime stage ---
FROM eclipse-temurin:17-jre
WORKDIR /app
# copy the fat jar (adjust name if your artifact differs)
COPY --from=build /app/target/*-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
