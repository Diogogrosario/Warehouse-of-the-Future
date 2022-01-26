# Team 1 - Data collection & Processing

We are a team in the Warehouse of Future project, that was done as part of the Large Scale Software Development Course at FEUP in colaboration with the DIGI-2 lab.

# Team
The members and their roles:
-   Afonso Caiado (**Developer**)
-   Alexandre Abreu (**Developer**)
-   André Daniel Gomes (**Product Owner**)
-   Filipe Recharte (**Developer**)
-   Henrique Pereira (**Scrum Master**)
-   Rui Pinto (**Developer**)
-   Tiago Gomes (**Developer**)

# Specification
The main goal here is to collect the data from the warehouse and make it available to everyone. The objectives are:
- Collect all data files from each warehouse sensor.
- Store and process the data.
- Allow other systems' interaction. (Send/Receive data)
- Allow a complete overview of what is happening on the warehouse.

# How to run

### Requirements

-   Windows/Mac: Docker Desktop (https://www.docker.com/products/docker-desktop)
-   Linux: docker and docker-compose (https://docs.docker.com/engine/install/ubuntu/)

### Build and run docker images

-   Create a `.env` file with appropriate values following the `.env.example` example, in the `backend` folder to successfully connect to Mongo Atlas.
- You can run the application with `docker-compose up --build` to build all the necessary images.

### Docker images URLs:

-   frontend (localhost:3000)
-   grafana (localhost:9000)
-   backend (localhost:8001)
-   populate-worker (localhost:8080)

# Contributing

## Coding guidelines

This project uses the `flake8` that is a command-line utility for enforcing style consistency across Python projects. 

The code style is always verified by github actions when making a pull request. Locally, the contributors are able to verify the code by running `flake8` command against the current directory.

## Documentation

### Wiki

The documentation for this vertical is available at
[docs](./docs). The main sections are:

- [Architecture](./docs/wiki/architecture.md) -- The class diagram of the
  project;
- [Domain Analysis](./docs/wiki/domain_analysis.md)
  details that might be important for code contributions;
- [Product Vision](./docs/wiki/vision.md) -- Detailed product vision;
- [Risks](./docs/wiki/risks.md) -- The risks of the project;
- [Similar products](./docs/wiki/similar_projects.md)
  products found in the wild.
