# Warehouse of the Future | Playground - Frontend

## Technology Stack

This project was built using Node 16 LTS and uses the following technologies:

- [Typescript](https://www.typescriptlang.org/) - As the main programming language.
- [React](https://reactjs.org/) - Framework of choice in which all the rest is built upon.
- [Three.js](https://threejs.org/) - For the warehouse 3D rendering.
- [MUI](https://mui.com/) - React's component library for Material Design.
- [REST Hooks](https://resthooks.io/) - For asynchronous data handling.
- [Cucumber.js](https://cucumber.io/docs/installation/javascript/) - For acceptance tests.
- [Docker](https://www.docker.com/) - For deployment.
- [Prettier](https://prettier.io/) - For formatting.
- [ESLint](https://eslint.org/) - For linting.
- [visx](https://airbnb.io/visx/) - For device battery visualization.

## Available Scripts

In the `frontend` directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.

### `yarn test`

Runs the integrations tests.

### `yarn serve`

Deploys the build application.

### `yarn lint`

Runs the [linter](https://eslint.org/) on all Javascript/JSX, Typescript/TSX, CSS, HTML, JSON and YAML files.

The properties are defined in the [ESLint configuration](./.eslintrc.js)

### `yarn format`

Runs [prettier](https://prettier.io/) and formats all Javascript/JSX, Typescript/TSX, CSS, HTML, JSON and YAML files.

The properties are defined in the [Prettier configuration](./.prettierrc.json)

### `yarn check-format`

Same as above, but only checks if the files are correctly formatted and gives a warning if they aren't.
