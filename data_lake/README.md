# Team 1 - Data collection & Processing

We are a team in the Warehouse of Future project, that was done as part of the Large Scale Software Development Course at FEUP in colaboration with the DIGI-2 lab.

-   Afonso Caiado
-   Alexandre Abreu
-   André Daniel Gomes
-   Filipe Recharte
-   Henrique Pereira
-   Rui Pinto
-   Tiago Gomes

## Docker

### Requirements

-   Windows/Mac: Docker Desktop (https://www.docker.com/products/docker-desktop)
-   Linux: docker and docker-compose (https://docs.docker.com/engine/install/ubuntu/)

### Build and run docker images

-   Create a `.env` file with appropriate values following the `.env.example` example, in the `backend` folder to successfully connect to Mongo Atlas.
-   `docker-compose up --build`

### URLs:

-   frontend (localhost:3000)
-   grafana (localhost:9000)
-   backend (localhost:8001)
-   worker (localhost:8080)
