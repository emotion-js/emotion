# Benchmarks

These benchmarks test how fast emotion renders with react components. They do not necessarily represent how fast a css-in-js library will be in the real world and are used by emotion to stop performance regressions in render performance/caching.

To run these benchmarks, visit https://benchmarks.emotion.sh and choose a commit. (If a benchmark says artifact not found, that means the build hasn't finished yet and you have to wait or the build may have failed)

These benchmarks are a modified version of react-native-web's benchmarks.

## Running Locally

The benchmarks can also be run locally, in this folder run `yarn build` and then `open ./dist/index.html` or use `yarn run-benchmark` to run them automatically.
