###############
# BUILD STAGE #
###############
FROM debian:latest AS build
RUN apt-get update
# https://docs.flutter.dev/get-started/install/linux#system-requirements
RUN apt-get install -y bash curl file git unzip xz-utils zip libglu1-mesa
RUN apt-get clean

# install flutter
RUN curl "https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_2.8.1-stable.tar.xz" | tar xJv -C /opt
ENV PATH="/opt/flutter/bin:/opt/flutter/bin/cache/dart-sdk/bin:${PATH}"

RUN flutter doctor -v

# copy the app files to the container
COPY . /app
WORKDIR /app

RUN flutter pub get
RUN flutter build web

################
# DEPLOY STAGE #
################
FROM alpine:3.14
RUN apk --no-cache add python3

COPY --from=build /app/build/web /app
COPY --from=build /app/server/server.sh /app/server.sh
RUN chmod +x /app/server.sh

EXPOSE 4040
ENTRYPOINT ["/app/server.sh"]
