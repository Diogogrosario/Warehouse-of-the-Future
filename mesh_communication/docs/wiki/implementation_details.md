# Implementation Details

The following secstions include some details of the implementation and
development state. The timestamp on these indicates the last update on this
information, so it might be out-of-date in the future.

## Backend

The backend and the API are both made using
[OpenJDK 17](https://openjdk.java.net/projects/jdk/17/) with
[Maven 4](https://maven.apache.org/) following
[Google's aoc code style](https://github.com/google/styleguide). The API is also
using the
[Spring Boot version 2 framework](https://spring.io/projects/spring-boot). The
backend implements a communication protocol between devices using a flooding
technique, where messages must start and end on the same device, the
orchestrator. These messages are created using a manifest file, containing info
about the amount of pieces needed and the destination device, which is read at
the start of the execution. There are tests done to ensure the backend is
working as intended, made using [JUnit 5](https://junit.org/junit5/). On top of
that, mutation tests are also done using [Pitest](http://pitest.org/).

The backend development, as of 24/01/2022, is missing a config endpoint, and a
way to specify manifests on the API. The endpoint for layout changes and the
funcionality to go back in ticks are currently being implemented.

## Frontend

The frontend is made using [GraphView](https://github.com/nabil6391/graphview)
with [Flutter 2](https://flutter.dev/). The frontend communicates with the
backend using the API created. The visual interface is composed of a 2D ambient
where devices are displayed in accordance to their position. On the right side
of the interface, a log is displayed, containing all the messages sent and
received by every device on each tick. There are acceptance tests done using
[Flutter gherkin](https://github.com/jonsamwell/flutter_gherkin). We're using
the experimental
[integration test backend](https://docs.flutter.dev/testing/integration-tests),
instead of the old widget driver. Since we are using flutter web, there is no
need for an android emulator in our project. As such, we use
[Chrome driver](https://chromedriver.chromium.org/downloads) to run the
integration tests in a web server. When the definitive version of the
integration test is released, it is necessary to update it.

As of 24/01/2022, the development of the frontend as been suspended
indefinitely, because the project is being integrated with a new frontend.
Still, the frontend was left missing a way to display devices without battery, a
button to hide the logs, and some embellishment.

## Deployment

The program is deployed using a docker container. Two docker files were created,
one for the backend and one for the frontend. In order to run them in specific
ports and join them, a docker compose was made to synchronize the deployment of
these two servers.
