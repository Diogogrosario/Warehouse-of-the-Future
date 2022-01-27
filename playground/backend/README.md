# Warehouse of the Future | Playground - Backend

## Technology Stack

This project was built using Node 16 LTS and uses the following technologies:

- [PostgreSQL](https://www.postgresql.org/) - Chosen technology for the database.
- [Sequelize](https://sequelize.org/) - An ORM for the database.
- [Pytest](docs.pytest.org) - Used for Unit-testing.
- [Express](https://expressjs.com/) - Used to serve the API.

## Available Scripts

### `yarn serve`

Serves the backend application and database.

### `yarn seed`

Populates the database.

### `yarn clear`

Clears the database, removing all entries.

### `yarn lint`

Runs the [linter](https://eslint.org/) on all Javascript/JSX, Typescript/TSX, CSS, HTML, JSON and YAML files.

The properties are defined in the [ESLint configuration](./.eslintrc.js)

### `yarn format`

Runs [prettier](https://prettier.io/) and formats all Javascript/JSX, Typescript/TSX, CSS, HTML, JSON and YAML files.

The properties are defined in the [Prettier configuration](./.prettierrc.json)

### `yarn check-format`

Same as above, but only checks if the files are correctly formatted and gives a warning if they aren't.

### `yarn test`

Runs all Unit-tests.
