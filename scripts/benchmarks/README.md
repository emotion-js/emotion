# Benchmarks

These benchmarks test how fast various css-in-js libraries render with react components. They do not necessarily represent how fast a css-in-js library will be in the real world and are used by emotion to stop performance regressions in render performance/caching.

To run these benchmarks run `npm run benchmark` in the root directory. These benchmarks should generally be run on Travis and not locally.

These benchmarks are a modified version of [react-native-web's benchmarks](https://github.com/necolas/react-native-web/tree/master/benchmarks).