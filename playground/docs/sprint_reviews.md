# Sprint 1 Review

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



# Sprint 2 Review

## Frontend

Done basic responsive layout structure of the web application.  
It was difficult to reach a consensus on the final design for the components of the front end.
Finished the report component.  

In the next sprint, integration with the backend will be developed and refinement of the various components will be done.

## Backend

Finished the models that were created in the previous sprint.
Developed controllers for each of the models.  
Specified the playground API using OpenApi.  
Implemented API endpoints after their specification.  
Developed unit tests, in python, for each of the API routes.  
Database Seed.  

Several problems regarding openapi documentation, which can be confusing (at first sight).  
Various problems with module imports due to their unconventional structure (ES6).  
Difficulty in deciding the testing tools.  

In the future, acceptance tests should be created.

## Dev Ops

Done GitHub actions.  
`lint` and `format` actions went through several iterations. This was because we weren't familiar with this technology and had to learn it (`build` action was easier after the experience with the previous two actions).

In the future will also include automated testing.

## 3D Renderer

Developed the scene controllers.  
Done bucket models.  
Drawing shelves according to the provided parameters.

Problems finding out the difference between one-sided and double-sided materials.  

In the next sprint, the file containing the structure of the warehouse and its parser will be defined. In addition to this, buckets should also be placed inside the shelves.





