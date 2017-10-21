## Prerequisites

- [Node.js](http://nodejs.org/) >= v7 must be installed.

- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

- Running `yarn` in the module's root directory will install everything you need for development.
- Run `lerna bootstrap` in the module's root directory

## Running Tests

- `yarn test` will run the tests once.

- `yarn test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `yarn test:watch` will run the tests on every change.

## Building

- `yarn build` will build the module for publishing to npm.

- `yarn clean` will delete built resources.
