# Warehouse of the Future | Playground

Playground is a web-app focused on providing maintenance staff a tool to visualize the real-time status of the warehouse.

## Specification
Product specification can be read in detail [here](docs/specification.md)

## Changelog
Changelog can be read fully at [CHANGELOG.md](CHANGELOG.md)

## How to run

You can deploy the web application using Docker by running `docker-compose up`

To delete all volumes from Docker run `docker-compose down -v`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn lint`

Runs the [linter](https://eslint.org/) on all Javascript/JSX and Typescript files.

To modify the linter properties, check [ESLint configuration](./.eslintrc.js)

### `yarn format`

Runs [prettier](https://prettier.io/) and formats all Javascript/JSX, Typescript, CSS and HTML files.

To modify the formatter properties, check [Prettier configuration](./.prettierrc.json)