# Team 1 - Data Collection & Processing

We are a team in the Warehouse of Future project, that was done as part of the Large Scale Software Development Course at FEUP in colaboration with the DIGI-2 lab.

# Team
The members and their roles:
-   Afonso Caiado (**Developer**) - up201806789@up.pt
-   Alexandre Abreu (**Developer**) - up201800168@up.pt
-   André Daniel Gomes (**Product Owner**) - up201806224@up.pt
-   Filipe Recharte (**Developer**) - up201806743@up.pt
-   Henrique Pereira (**Scrum Master**) - up201806538@up.pt
-   Rui Pinto (**Developer**) - up201806441@up.pt
-   Tiago Gomes (**Developer**) - up201806658@up.pt

# Specification
The main goal here is to collect the data from the warehouse and make it available to everyone. The objectives are:
- Collect all data files from each warehouse sensor.
- Store and process the data.
- Allow other systems' interaction. (Send/Receive data)
- Allow a complete overview of what is happening on the warehouse.

# Getting started

## How to Run

### Requirements

-   Windows/Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop)
-   Linux: [Docker and docker-compose](https://docs.docker.com/engine/install/ubuntu/)

### Build and run docker images

-   Create a `.env` file with appropriate values following the [.env.example](./backend/.env.example) example, in the [backend folder](./backend) to successfully connect to Mongo Atlas.
-   Create a `.env` file for the [populate-worker folder](./populate-worker)
-   Create a `.env.test` for the [backend folder](./backend) as well to run the tests using the test database.
-   You can run the application with `docker-compose up --build` to build all the necessary images.

### Docker images URLs:
-   grafana (localhost:9000)
-   backend (localhost:8001)
-   populate-worker (localhost:8080)

# Testing

Quality Assurance is granted using GitHub actions that runs the Unit tests developed using [Pytest](https://docs.pytest.org/en/6.2.x/) and Property Based tests developed using [Hypothesis](https://hypothesis.readthedocs.io/en/latest/). Both of this tests were implemented for the API endpoints.

Those tests can be run by executing the [runTests.sh](./backend/runTests.sh) script inside the [backend folder](./backend).

# Contributing

## Coding guidelines

This project uses [flake8](https://flake8.pycqa.org/en/latest/) that is a command-line utility for enforcing style consistency across Python projects. 

The code style is always verified by Github actions when making a pull request or a push to the team's development branch. Locally, the contributors are able to verify the code by running `flake8` command against the current directory.

## Code compilation and testing

**CD workflow** that detects pushes to the t1_development branch, builds the docker containers, and pushes them to Docker Hub. After that, it accesses the Cloud Provider machine through SSH, pulls those aforementioned containers, and runs them.

**CI pipeline** that checks out the code, install the specified dependencies, runs [flake8](https://flake8.pycqa.org/en/latest/) linter against the code and finally tests it allowing to see the tests coverage.

# Deployment

Digital Ocean remote machine.

- Backend: http://165.227.159.93:8001/
- Grafana:  http://165.227.159.93:9000/d/BwcXP3cnz/data-lake?orgId=1

## Documentation

### API

When code is pushed to the main branches, a Github action deploys the code and makes the [API documentation](http://165.227.159.93:8001/) available on the root backend URL.

### Wiki

The documentation for this vertical is available at
[docs](./docs). The main sections are:

- [Architecture](./docs/wiki/architecture.md) - The class diagram of the project;
- [Domain Analysis](./docs/wiki/domain_analysis.md) - Details that might be important for code contributions;
- [Git Workflow](./docs/wiki/workflow.md) - The workflow and practices for commits and repository management;
- [Mockups](./docs/wiki/mockups.md) - The mockups of the project;
- [Product Vision](./docs/wiki/vision.md) - Detailed product vision;
- [Risks](./docs/wiki/risks.md) - The risks of the project;
- [Similar Products](./docs/wiki/similar_projects.md) - Products found in the wild;
- [Sprint Logs](./docs/wiki/sprint_logs.md) - Detailed retrospective of each sprint.
