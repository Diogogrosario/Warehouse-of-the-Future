# Warehouse of the Future -- Mesh Communication

Welcome to the _Mesh Communication_ component of the the **Warehouse of the
Future** project!

Here you can find the code and documentation behind this (sub)product, hereby
referenced as project.

## The team

This project was developed by the second team of the 2nd class of DS, MEIC, FEUP
2021/2022. The members and their roles:

- Ana Barros (**The girl**) - up201806593@edu.fe.up.pt
- Davide Castro (**UML Master**) - up201806512@edu.fe.up.pt
- Diogo Rosário (**Poseidon (retired)**) - up201806582@edu.fe.up.pt
- Gustavo Sena (**NFT Bro**) - up201806078@edu.fe.up.pt
- Henrique Ribeiro (**Ata Master**) - up201806529@edu.fe.up.pt
- João Costa (**Product Owner**) - up201806560@edu.fe.up.pt
- João Martins (**Scrum Master**) - up201806436@edu.fe.up.pt

## Business modeling

### [Product vision](./mesh_communication/docs/wiki/product_vision.md)

Simulate the communication between devices in a mesh network, and provide
battery consumption and message statistics.

### Elevator pitch

People working with mesh networks need a tool to help them decide on the best
configuration for said devices. This project allows them to see all interactions
on a given scenario in a detailed manner, and evaluate what's the best way to
organize everything based on the given statistics.

## Getting started

This application is deployed as a [docker container](https://www.docker.com).

### With frontend

Users intending to use the provided frontend, can call `docker compose up` with
the provided [`docker-compose.iml`](https://docs.docker.com/compose/) file.

### API standalone (backend)

For users developing their own frontend or intending on integrating this project
with other tools, we provide a standalone backend that can be interacted with by
using a REST API.

To run this backend, users have to build and run the
[docker container](https://www.docker.com) inside the
[backend directory](./backend).

The specification for this API is available on multiple sources:

- [Main source -- YAML format](./docs/api/api.yaml) - always the most up-to-date
  version in YAML format.
- [Main source -- HTML format](./docs/api/api.html) - rendering of the YAML
  format to interactable HTML.
- [Secondary source -- Swagger Hub](https://app.swaggerhub.com/apis/cucx/mesh-communication_api/1.0.3) -
  remotelly available (hosted on Swagger Hub). Might not always be up-to-date.

## Testing

### Backend

The backend is tested using Unit-tests and Mutation tests.

- Unit-tests -- Run by calling `mvn test` inside the
  [backend directory](./backend). The results and statistics are shown on
  screen;
- Mutation tests -- Run by calling
  `mvn org.pitest:pitest-maven:mutationCoverage` inside the
  [backend directory](./backend). The results and statistics are then available
  inside the generated `target/pit-reports` directory in HTML format
  (`index.html`).

### Frontend

The frontend is tested using acceptance tests, using
[Flutter gherkin](https://github.com/jonsamwell/flutter_gherkin). We're using
the experimental backend
[integration test](https://docs.flutter.dev/testing/integration-tests), instead
of the old widget driver. Since we are using flutter web, there is no need for
an android emulator in our project. As such, we use
[chrome-driver](https://chromedriver.chromium.org/downloads) to run the
integration tests in a web server. When the definitive version of the
[integration test](https://docs.flutter.dev/testing/integration-tests) backend
is released, it is necessary to update it.

To run the acceptance tests the following has to be done:

- start **chromedriver** (comes with chrome/chromium) on port 4444:
  `chromedriver --port=4444`
- run the tests with following:

```sh
# generate test suite
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs

# run the tests
flutter drive --driver=test_driver/integration_test_driver.dart --target=integration_test/gherkin_suite_test.dart -d web-server
```

## Contributing

### Style guide

This project uses the
[Google Java Style Guide](https://google.github.io/styleguide/javaguide.html).
The code style is verified by github actions. A contributer can verify the style
locally by running `mvn git-code-format:validate-code-format` inside the
[backend directory](./backend).

In order to auto-format the code, a user can run locally run
`mvn git-code-format:format-code` inside the [backend directory](./backend). Due
to some limitations related to non-idempotency (for example this
[issue](https://github.com/google/google-java-format/issues/211)), it is
recommended that users run this command twice. Contributers can also use the
provided git hook that will this automattically on every commit for them:

- Install -- use the [install script](./install_format_hook.sh);
- Unninstall -- use the [uninstall script](./uninstall_format_hook.sh).

### Code compilation and testing

#### Backend

Github actions compile the code and run the tests on every pull request and
merge to the main branches. Every time this is done an artifact is generated so
regression is easier.

#### Frontend

Github actions compile the code and run the integration tests remotelly on every
merge to the main branches.

## Documentation

### Javadoc

When code is pushed to the main branches, a Github action (re)generates the
Javadocs for the backend and renders the API YAML to HTML (see the section about
the backend API).

### Wiki

The documentation for this project is available in wiki format on
[docs directory](./docs). The following are the main sections:

- [Architecture](./docs/wiki/architecture.md) -- The class diagram of the
  project;
- [Implementation details](./docs/wiki/implementation_details.md) -- Some
  details that might be important for code contributions;
- [Mockups](./docs/wiki/mockups.md) -- Mockups of the frontend;
- [Product Vision](./docs/wiki/product_vision.md) -- Detailed product vision;
- [Risks](./docs/wiki/risks.md) -- The risks of the project;
- [Similar products](./docs/wiki/similar_products.md) -- A study of some similar
  products found in the wild.
- [How the different parts of the product interact](./docs/wiki/specification.md);
- [Tests](./docs/wiki/tests.md) -- How the code is tested.

## License

This project is licensed under the MIT License available here
[license](./LICENSE).
