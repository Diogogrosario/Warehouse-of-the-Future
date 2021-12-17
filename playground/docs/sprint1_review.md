# Sprint 1 Review - T3 Playground

The project was divided into 2 parts, the frontend and the backend. This division delayed the progression of the other features, due to a restructuring of the project's file system.

## Frontend

Defined a mockup of the application user interface.  

### Device Visualization

Done page with the ID of the device, its name and description and developed some graphics for battery status.
Not necessary after the client meeting. Discarded for now.  
Libraries that were considered: Visx, ChartJS, Grafano

### 3D Renderer

Initially used React-three-fiber but various issues emerged.  
Later switched to pure three.js.  

## Material UI

Updated from MUI4 to MUI5, because the former was outdated.  
The group had more experience with MUI4, and, because of this and major library changes, the transition was very time-consuming.  

## Backend

Defined a conceptual model for the playground.

Tools: Sequelize, Postgres, Node.js

Problems configuring all these packages in a Docker container. Took more time than initially thought.
Had to decide on a backend ORM.  
Little experience with Sequelize (more time was needed to understand its functionalities nad nuances).
