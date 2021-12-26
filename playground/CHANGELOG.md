# Changelog
All notable changes to this project will be documented in this file.

## Sprint 0 - 2021/11/25
---
### Added
- `README` file
- `CHANGELOG` file
- Added project specification
- React app structure and configuration
- Integration of [React.js](https://reactjs.org/) with [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
- Integration of [React.js](https://reactjs.org/) with [Three.js](https://threejs.org/)
- [ESLint](https://eslint.org/) configuration
- [Prettier](https://prettier.io/) configuration
- [Docker](https://www.docker.com/) configuration
- Three.js scene
- Webpack bundler configuration

## Sprint 1 - 2021/12/09
---
### Added
- Page with with ID, name and description of device.
- Developed graphics for battery status (discarded).
- Defined conceptual model for playground.
- Sequelize + Node + Postgres set up.
- Three.JS setup.
### Updated
- MUI4 to MUI5 (former was outdated).

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
- Dinamically created shelves according to the provided parameters.
### Updated
- Finished database models and their relations.
- Changed device ID from UUID to string.
### Fixed
- ESlint configuration.
- Fixed model imports in every controller.
