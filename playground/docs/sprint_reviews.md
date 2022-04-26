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

**Tools:** Sequelize, Postgres, Node.js

Problems configuring all these packages in a Docker container. Took more time than initially thought.
Had to decide on a backend ORM.  
Little experience with Sequelize (more time was needed to understand its functionalities and nuances).

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

Several problems regarding openAPI documentation can be confusing (at first sight).  
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

# Sprint 3 Review

## Frontend

Added filtering, sorting of reports.  
Fully implemented tab panels on the web app.  
Major redesign of the web app.  
Removed mark as solved button and added new action form to add actions to a given report.  
Acceptance tests with Gherkin Cucumber.  
Integration with backend.  

Problems with the rest-hooks package. The examples provided in the documentation didn't work out of the box. A lot of time was dispended implementing the connections to the backend API.  
When developing the backend and frontend are served from different ports as such the browser sees the requests have different origins and does not accept any calls to the backend (if not running from localhost, eg. from a tablet in the same network). This is not a priority, as in production proxying would not be needed.   
Async/Network boundaries and Suspense. When the frontend request the database for data it should render something while it is waiting (async boundaries and suspense). When these requests fail, the frontend simply goes down and shows a white page. This should be fixed with network error boundaries. This will be analyzed in another sprint.

In the next sprint, we will focus on bug fixing and integration with other verticals.

## Backend

Updated API documentation with the changes that occurred in this milestone.
Created a database clear command.
Fixed minor issues in backend controllers.
Added wait for DB initiation command to Docker container.

In the future, we will need to remove the employee ID from the database as it goes against the company's privacy policy. Will also focus on the integration with other verticals.

## Dev Ops

Unit test automation for API tests.

## 3D Renderer

Receiving configuration files to draw the whole warehouse.  

In the next sprint, we will add another JSON version to support arbitrary buckets; add support for device representation, and integrate with other verticals.

## Retrospective

Went well:
+ GitHub communication (PR + issues)
+ Integration of backend + frontend went smoothly, communication-wise
+ Less strict division of the team between renderer/frontend/backend

Meh:
+ Requirements changing due to vertical merging (without asking the client)

Could have gone better:
+ Integration led to many unexpected bugs
+ GitHub actions going down

# Sprint 4 Review

## Frontend
Added Search Bar functionality.  
Added device representation.
Displaying metrics for the devices in the network.  
Added Simulation UI (reset, advance ticks buttons).  

Some functionalities that were developed by team 2 weren't developed due to time restrictions and sudden changes of the API functionalities.  
Detected a problem in the web app's responsiveness in smaller screens. This wasn't fixed because of the time that was dispended in the integration with the other teams.

In the future, the team would focus on fixing the aforementioned problems.

## Dev Ops
Added docker service for mesh simulation.  

Removed wait command from docker-compose because it wasn't working on some of the developers' machines.  
Fixed cors problems that occurred during the integration with team 2.  

## 3D Renderer
Added device, message and orchestrator representations.  
Added dummy devices for mesh communication to facilitate message representation.  
Objects can now be placed on the ground.  
Can now hide a rack frame.  
Changed layout to receive arbitrary buckets for the 3D renderer.  

Had to retroactively change how shelves' geometry was created and added to the rack mesh. This change was mandatory due to the change from bucket types to arbitrary sizes and to the addition of devices. This brought into attention how important setting the origin of every geometry and mesh is, to not mess up the relative placement of objects throughout the scene graph.  
Arrow messages were initially straight (ArrowHelper), but thanks to feedback from the team, they should be curves to improve visibility. This unexpected change in requirements added a new layer of complexity that was unaccounted for and required more hours of development.  

In the future, the team would focus on popups with information about the devices and a description of the events.  

## Integration with other teams
Some issues were encountered in the integration with the mesh communication team which had never tested the API with complex messages. This caused "CORS" related problems (pre-flight checks) especially when trying to upload devices through the layout's endpoint, with the content type `application/json`.
