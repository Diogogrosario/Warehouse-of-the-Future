# Sprint Logs

## Sprint 1
On the first sprint after the beginning of the work on the project, as previously decided, we started using an incremental approach, starting from the MVP.

### Data Format Definition
- The data format for the Data Lake was defined at the beginning of the sprint, in order to allow further development, of which it would be the basis.

### [MongoAtlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_portugal_search_core_brand_atlas_desktop&utm_term=mongodbatlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624551&adgroup=115749716583&gclid=CjwKCAiA3L6PBhBvEiwAINlJ9H-Yu1PbWeba9bpFlmqBpS66frYq_P6QA2E8SHANyuZdEiM3GrGWIRoCXTsQAvD_BwE) Database
- A `MongoDB` database was developed according to the previously defined data format and saved in the cloud using `MongoAtlas`.

### Database population
- The `MongoDB` database created was populated with random, incoherent and inconsistent dummy data for testing purposes.

### [Flask](https://flask.palletsprojects.com/en/2.0.x/) RESTful API
- A `Flask` API was designed to make the data available to other services.
- Endpoints were created for each of the relevant collections of the database (`Manifest`, `Sensors`, `Staff`, `Cart`, `Layouts` and `Stock`).

### Data generation
- Endpoints that generate random data in the defined data format were added to the API, to be used in the future for population and simulation.

### [Swagger](https://swagger.io) Documentation
- `Swagger` was used to create a documentation associated to the aforementioned API.

### Continuous Integration and Development Pipeline
- A pipeline was created using [Github Actions](https://github.com/features/actions) to automate the software workflow.


## Retrospective Sprint 1

### What went well?
- Usage of [GitHub](https://github.com/) tools/features in the group;
- Communication inside the team;
- Separation of independent tasks.

### What went ok?
- Technologies used were reasonably easy to understand and pick up.

### What could have gone better? 
- Effort estimation for each issue;
- Communication between the teams.



## Sprint 2
On this sprint, the integration of the different partials was initiated, with the creation of a connection between the data generation API, the now automatically populated database and the retrieval API.

### Channel for Data Intake
- A channel was created for the receiving of real-time data, such as the position of the cart or the sensor-registered movements. Currently, only random data is sent regarding this real-time information.

### Frontend Design
- Mockups were designed for the frontend of the app using [Figma](https://www.figma.com/), consisting of an interactive UI with coherent and consistent data.

### Populate-worker
- A `Python` worker was implemented to populate the database automatically, aided by the data generation endpoints added in the last sprint.

### Coherent Data Generation
- Data generation was improved to be able to produce more coherent data in the `Layouts`, `Stock` and `Cart` endpoints.
- Data generation for the three super racks, as defined in the MVP, was also implemented.

### Flask-MongoDB Integration
- `Flask` was integrated with the database. API endpoints now retrieve the data directly from the `MongoDB` database.


## Retrospective Sprint 2

### What went well?
- Integration of the separate partials.

### What went ok?
- Effort estimation for each issue;
- Communication between the teams;
- Communication with the client.

### What could have gone better? 
- Estimation of how much of the project the team would be able to develop in this sprint.



## Sprint 3
The goals for this sprint were to improve the previous sprint's features and dive further into the development of the frontend for the Data Lake.

### Coherent Data Generation (cont.)
- Data generation made more coherent for the `Manifests`, `Items`, `Sensors` and `Staff` endpoints.

### Worker-Database integration
- Scheduling and termination functionalities were added to the `Python` populate-worker.
- A pipeline was added to authenticate the `Client` to the database and allow the worker to be directed integrated with the database.

### Frontend Dashboard
- A [Grafana](https://grafana.com/) dashboard was designed based on the mockups, to display the data in a user-friendly format.

### Frontend File Structure
- A [React](https://reactjs.org/)/[Material-UI](https://mui.com/) file structure was also added for future development.


## Retrospective Sprint 3

### What went well?
- Problem resolution;
- Adaptability;
- Communication with the client.

### What went ok?
- Communication between the teams.

### What could have gone better?
- Lesser involvement of some team members in the tasks and discussions.



## Sprint 4
This sprint we focused on integrating the features with the other verticals and polish some features of our vertical.

### Layout POST endpoint
- A POST endpoint for layouts was temporarily added to the API, but it was dropped due to it not being used by the Layout Optimization vertical.

### Pipeline update
- Grafana deployment was added in the `GitHub Action` pipeline.
- The pipeline was updated to also include changes in repository path.

### Documentation update
- Mockups, git workflow and sprint logs were added/moved to the `docs/wiki` folder of the team repository.
- README.md files were polished and terminated.

### Stock integration
- Stock endpoint was integrated with the Layout Optimization algorithm, in order to produce more realistic results.


## Retrospective Sprint 4

### What went well?
- Project finalisation;
- Grand Finale.

### What went ok?
- Presentation to the client.

### What could have gone better?
- Complete integration with other verticals.