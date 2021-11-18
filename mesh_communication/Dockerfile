###############
# BUILD STAGE #
###############
FROM openjdk:17-alpine AS build
WORKDIR /app

RUN apk --no-cache add maven

COPY src .
COPY pom.xml .
RUN mvn -B -f pom.xml clean package

################
# DEPLOY STAGE #
################
FROM openjdk:17-alpine AS build
COPY --from=build /app/target/mesh_communication-1.0-SNAPSHOT.jar /usr/local/lib/mesh_communication.jar
ENTRYPOINT ["java","-jar","/usr/local/lib/mesh_communication.jar"]
