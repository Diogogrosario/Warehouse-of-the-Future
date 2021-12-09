# Team 1 - Data collection & Processing

We are a team in the Warehouse of Future project, that was done as part of the Large Scale Software Development Course at FEUP in colaboration with the DIGI-2 lab.

- Afonso Caiado
- Alexandre Abreu
- André Daniel Gomes
- Filipe Recharte
- Henrique Pereira
- Rui Pinto
- Tiago Gomes

## Docker
### Requirements
- Windows/Mac: Docker Desktop (https://www.docker.com/products/docker-desktop)
- Linux: docker and docker-compose (https://docs.docker.com/engine/install/ubuntu/)

### Build and run docker images
- create a ```.env``` file with appropriate values following the ```.env.example``` example in the same folder.
- docker-compose up --build

### URLs:
- frontend (localhost:8000)
- backend (localhost:8001)
- mongo (localhost:27017)
- mongo-express (localhost:5000)

### Mongo-Express:
- Web-based administrative interface used to manage MongoDB database interactively. 
- Use the variables set on ```.env``` file inside the ```database``` folder to log in and manage the database.
