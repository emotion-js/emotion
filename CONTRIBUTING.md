## Prerequisites

- [Node.js](http://nodejs.org/) >= v7 must be installed.
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

- Run `yarn` in the repository's root directory to install everything you need for development.
- Run `yarn build` in the root directory to build the modules.

> NOTE:
>
> lerna is **NOT** used for installing packages. Only yarn is used. lerna is only used for publishing

## Running Tests

- `yarn test` will run the tests once.
- `yarn coverage` will run the tests and produce a coverage report in `coverage/`.
- `yarn test:watch` will run the tests on every change.

## Building

- Run `yarn build` in the root directory to build the modules. (Required before publishing)
- Run `yarn build PACKAGE_NAME ANOTHER_PACKAGE_NAME` to only build certain packages.
- Run `yarn build:watch` to build packages on every change.

## Documentation Website Development

- Run above installation steps and then
- Run `yarn start:site` to run a development server of gatsby.
- Run `yarn build:site` to create a build of the assets for the documentation website.
