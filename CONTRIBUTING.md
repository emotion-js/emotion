## Prerequisites

- [Node.js](http://nodejs.org/) >= v16 must be installed.
- We are using Yarn Modern so you need either a global install of Yarn v1 (`npm i -g yarn`) or you need to [enable Corepack](https://yarnpkg.com/getting-started/install).

## Installation

- (If using Windows) Enable Developer Mode in the Windows settings app. On Windows 11, this can be done by searching the start menu for "Developer settings" and then enabling the Developer Mode toggle switch.
- Run `yarn` in the repository's root directory to install everything you need for development.
- Run `yarn build` in the root directory to build the modules.

## Running Tests

- `yarn test` will run the tests once.
- `yarn coverage` will run the tests and produce a coverage report in `coverage/`.
- `yarn test:watch` will run the tests on every change.

## Building

- Run `yarn build` in the root directory to build the modules. (Required before publishing)
- Run `yarn build PACKAGE_NAME ANOTHER_PACKAGE_NAME` to only build certain packages.
- Run `yarn build:watch` to build packages on every change.

## Documentation Website Development

- Run above installation steps and then `cd` to the `site` directory.
- Run `yarn dev` to run the Next.js development server.
- Run `yarn build` to create a build of the assets for the documentation website.

## Changesets

Emotion uses [changesets](https://github.com/Noviny/changesets) to do versioning. What that means for contributors is that you need to add a changeset by running `yarn changeset` which contains what packages should be bumped, their associated semver bump types and some markdown which will be inserted into changelogs.
