# Changelog

All notable changes to this project will be documented in this file.

## Sprint 0 - 2021/11/25
---

### Added

- `README` file
- `CHANGELOG` file
- Added project specification
- React app structure and configuration
- Integration of [React.js](https://reactjs.org/)
  with [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
- Integration of [React.js](https://reactjs.org/) with [Three.js](https://threejs.org/)
- [ESLint](https://eslint.org/) configuration
- [Prettier](https://prettier.io/) configuration
- [Docker](https://www.docker.com/) configuration
- Three.js scene
- Webpack bundler configuration

## Sprint 1 - 2021/12/09
---

### Added

- Page with ID, name and description of device.
- Developed graphics for battery status (discarded).
- Defined conceptual model for the playground.
- Sequelize + Node.js + PostgreSQL set up.
- Three.JS setup.

### Updated

- Bumped Material UI 4 to MUI 5 (former was outdated).

## Sprint 2 - 2021/12/23
---

### Added

- Defined device, action and report controllers.
- Defined API endpoints for the backend.
- playground API documentation.
- Developed tests for the API.
- Added GitHub actions
    - Build
    - Lint
    - Format
- Developed web application layout.
- Done Report component.
- Scene controllers for the playground.
- Done Bucket models.
- Dynamically created shelves according to the provided parameters.
- Missing 

### Updated

- Finished database models and their relations.
- Changed device ID from UUID to string.

### Fixed

- ESlint configuration.
- Fixed model imports in every controller.

## Sprint 3 - 2021/12/23
---

### Added

- Filtering, sorting of reports.
- Finished implementation of tab panels.
- Cucumber acceptance tests.
- Integrated backend with frontend components.
- Database clear command.
- Wait command for backend in docker-compose.yml
- Unit tests automation for API tests.
- Now receiving configuration file to draw the whole warehouse.

### Updated
- Backend API documentation.

### Fixed
- Redesigned web app.
- Fixed backend controller typos.

## Sprint 4 - 2022/01/13
---

### Added
- Integration with mesh communication API
  - Displaying device information
  - Displaying metrics
  - Simulation UI and interaction (reset, advance ticks, etc...)
  - 3D rendering of devices and messages
- Functionality to search bar
- Docker service for mesh simulation
- Dummy devices for mesh communication
- Orchestrator representation  
- Ability to have objects without shelves (ex: object on the ground)
- Ability to hide a rack frame

### Updated
- Warehouse configuration file and coordinate provider
- Tab layout in the dashboard component
- Changed layout to receive arbitrary buckets for the 3D renderer.

### Fix 
- NetworkErrorBoundaries, Suspense and AsyncBoundaries are now working
- JavaScript MIME type warning
