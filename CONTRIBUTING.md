## Prerequisites

- [Node.js](http://nodejs.org/) >= v22.11 must be installed.
- pnpm 11 must be installed.

## Installation

- (If using Windows) Enable Developer Mode in the Windows settings app. On Windows 11, this can be done by searching the start menu for "Developer settings" and then enabling the Developer Mode toggle switch.
- Run `pnpm install` in the repository's root directory to install everything you need for development.
- Run `pnpm build` in the root directory to build the modules.

## Running Tests

- `pnpm test` will run the tests once.
- `pnpm test:ci` will run the tests and produce a coverage report in `coverage/`.
- `pnpm test:watch` will run the tests on every change.

## Building

- Run `pnpm build` in the root directory to build the modules. (Required before publishing)
- Run `pnpm build PACKAGE_NAME ANOTHER_PACKAGE_NAME` to only build certain packages.
- Run `pnpm build:watch` to build packages on every change.

## Documentation Website Development

- Run above installation steps and then `cd` to the `site` directory.
- Run `pnpm dev` to run the Next.js development server.
- Run `pnpm build` to create a build of the assets for the documentation website.

## Changesets

Emotion uses [changesets](https://github.com/changesets/changesets) to do versioning. What that means for contributors is that you need to add a changeset by running `pnpm changeset` which contains what packages should be bumped, their associated semver bump types and some markdown which will be inserted into changelogs.
