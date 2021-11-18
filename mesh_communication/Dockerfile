###############
# BUILD STAGE #
###############
FROM maven:3.8.3-openjdk-17-slim AS build
WORKDIR /app

COPY src src
COPY pom.xml .
RUN mvn -B -f pom.xml clean package -DskipTests

################
# DEPLOY STAGE #
################
FROM openjdk:17-slim
COPY --from=build /app/target/mesh_communication-1.0-SNAPSHOT.jar /usr/local/lib/mesh_communication.jar
ENTRYPOINT ["java","-jar","/usr/local/lib/mesh_communication.jar"]
