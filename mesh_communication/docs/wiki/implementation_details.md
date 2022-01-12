# Implementation Details

## Backend

The backend and the API are both made using Java 17 with Maven version 4 following [Google's aoc code style](https://github.com/google/styleguide). The API is also using the spring boot version 2 framework.
The backend implements a communication protocol between devices using a flooding technique, where messages must start and end on the same device, the orchestrator.  These messages are created using a manifest file, containing info about the amount of pieces needed and the destination device, which is read at the start of the execution.
There are tests done to ensure the backend is working as intended, made using JUnit version 5. On top of that, mutation tests are also done using pitest version 1.
The backend development, as of 07/01/2022, is missing a restart endpoint on the API and implementing a way to go back in ticks, and some more functionalities.

## Frontend
The frontend is made using GraphView with Flutter 2 and Dart 2. 
The frontend communicates with the backend using the API created.
The visual interface is composed of a 2D ambient where devices are displayed in accordance to their position. On the right side of the interface, a log is displayed, containing all the messages sent and received by every device on each tick.
There are acceptance tests done using flutter-gherkin. We're using the experimental [backend:integration test](https://docs.flutter.dev/testing/integration-tests ), instead of the old widget driver. Since we are using flutter web, there is no need for an android emulator in our project. As such, we use chrome-driver to run the integration tests in a web server. When the definitive version of the backend:integration test is released, it is necessary to update it.
The development, as of 07/01/2022, is missing a way to display devices without battery, adding a button to hide the logs and some embellishment.

## Deployment
The program is deployed using a docker container. Two docker files were created, one for the backend and one for the frontend, in order to run them in specific ports. A docker compose was made to synchronize the deployment of these two servers.
