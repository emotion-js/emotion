# @emotion/babel-preset-css-prop

## 11.2.0

### Patch Changes

- [`64bc9037`](https://github.com/emotion-js/emotion/commit/64bc9037b1172d46b3b42c58dce0b2533e488209) [#2245](https://github.com/emotion-js/emotion/pull/2245) Thanks [@0xBono](https://github.com/0xBono)! - Fixed the invalid example in the README.

- Updated dependencies [[`c9b57f36`](https://github.com/emotion-js/emotion/commit/c9b57f36e99f8cfe86c971ddb29c7a5d70644bc1)]:
  - @emotion/babel-plugin@11.2.0

## 11.0.0

### Major Changes

- [`9e3671c4`](https://github.com/emotion-js/emotion/commit/9e3671c466975fb31cd45431e25cb60ffb677a70) [#2076](https://github.com/emotion-js/emotion/pull/2076) Thanks [@Andarist](https://github.com/Andarist)! - Removed `runtime` option that was introduced to this preset and deprecated shortly after that. If you want to configure `runtime: "automatic"`, replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for the `instances` option, any usage of it should be replaced with the `importMap` option

* [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe) [#1656](https://github.com/emotion-js/emotion/pull/1656) Thanks [@Andarist](https://github.com/Andarist)! - `autoLabel` option no longer is a simple boolean. Instead we accept now 3 values: `dev-only` (the default), `always` and `never`.

  Each possible value for this option produces different output code:

  - with `dev-only` we optimize the production code, so there are no labels added there, but at the same time we keep labels for development environments,
  - with `always` we always add labels when possible,
  - with `never` we disable this entirely and no labels are added.

### Minor Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Added the `importMap` option which allows you to tell `@emotion/babel-plugin` what imports it should look at to determine what it should transform so if you re-export Emotion's exports, you can still use the Babel transforms

- [`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8) [#1130](https://github.com/emotion-js/emotion/pull/1130) Thanks [@jtmthf](https://github.com/jtmthf)! - Adjust how arrays passed to css prop are transformed so function elements can be resolved at runtime.

* [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d) [#1651](https://github.com/emotion-js/emotion/pull/1651) Thanks [@Andarist](https://github.com/Andarist)! - Allow `labelFormat` option to be a function.

### Patch Changes

- Updated dependencies [[`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d), [`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9), [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe), [`b7d21373`](https://github.com/emotion-js/emotion/commit/b7d21373d967d0f958dd59aaaa650047e23e8e8b), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd)]:
  - @emotion/babel-plugin@11.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/babel-plugin@11.0.0-rc.0

## 11.0.0-next.10

### Major Changes

- [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe) [#1656](https://github.com/emotion-js/emotion/pull/1656) Thanks [@Andarist](https://github.com/Andarist)! - `autoLabel` option no longer is a simple boolean. Instead we accept now 3 values: `dev-only` (the default), `always` and `never`.

  Each possible value for this option produces different output code:

  - with `dev-only` we optimize the production code, so there are no labels added there, but at the same time we keep labels for development environments,
  - with `always` we always add labels when possible,
  - with `never` we disable this entirely and no labels are added.

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe)]:
  - @emotion/babel-plugin@11.0.0-next.10

## 11.0.0-next.8

### Minor Changes

- [`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b) [#1609](https://github.com/emotion-js/emotion/pull/1609) Thanks [@joltmode](https://github.com/joltmode)! - Adjust how arrays passed to css prop are transformed so function elements can be resolved at runtime.

### Patch Changes

- Updated dependencies [[`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b)]:
  - babel-plugin-emotion@11.0.0-next.8

## 11.0.0-next.6

### Minor Changes

- [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d) [#1651](https://github.com/emotion-js/emotion/pull/1651) Thanks [@Andarist](https://github.com/Andarist)! - Allow `labelFormat` option to be a function.

### Patch Changes

- Updated dependencies [[`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d), [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41), [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd)]:
  - babel-plugin-emotion@11.0.0-next.6

## 11.0.0-next.3

### Major Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for the `instances` option, any usage of it should be replaced with the `importMap` option

### Minor Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Added the `importMap` option which allows you to tell babel-plugin-emotion what imports it should look at to determine what it should transform so if you re-export Emotion's exports, you can still use the Babel transforms

### Patch Changes

- Updated dependencies [[`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1)]:
  - babel-plugin-emotion@11.0.0-next.3

## 11.0.0-next.0

### Patch Changes

- Updated dependencies [[`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - babel-plugin-emotion@11.0.0-next.0

## 10.2.1

### Patch Changes

- [`32c8528a`](https://github.com/emotion-js/emotion/commit/32c8528a63153acd05f3da1d627d8617758e8033) [#2084](https://github.com/emotion-js/emotion/pull/2084) Thanks [@Andarist](https://github.com/Andarist)! - Only use `'@babel/plugin-transform-react-jsx-development'` based on the `development` option when `runtime` is set to `"automatic"`. The classic runtime is not compatible with this plugin.

## 10.2.0

### Minor Changes

- [`c55fadb4`](https://github.com/emotion-js/emotion/commit/c55fadb4c90f86e3c7837b4b3a5902f0e90a4f19) [#2074](https://github.com/emotion-js/emotion/pull/2074) Thanks [@Andarist](https://github.com/Andarist)! - `runtime` option has been deprecated. It still works and will continue to work in Emotion 10 but we have found out that including JSX plugin twice in the Babel configuration leads to hard to debug problems and it's not always obvious that some presets include it. If you want to configure `runtime: "automatic"` just replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `babel-plugin-emotion`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset

## 10.1.0

### Minor Changes

- [`71514b06`](https://github.com/emotion-js/emotion/commit/71514b06fe172517168f98321499f05e74388de6) [#1970](https://github.com/emotion-js/emotion/pull/1970) Thanks [@FLGMwt](https://github.com/FLGMwt)! - A new `runtime` option has been added that can be configured to `'automatic'` to opt into [the new JSX runtimes](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). To use this a compatible React version has to be used.

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - babel-plugin-emotion@10.0.27
  - @emotion/babel-plugin-jsx-pragmatic@0.1.5

## 10.0.23

### Patch Changes

- [`539bc0c2`](https://github.com/emotion-js/emotion/commit/539bc0c2acf164b6c31f5df55f05db35932af100) [#1576](https://github.com/emotion-js/emotion/pull/1576) Thanks [@Andarist](https://github.com/Andarist)! - Insert import to @emotion/core after existing imports to avoid ordering issues with polyfills

* [`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161) [#1569](https://github.com/emotion-js/emotion/pull/1569) Thanks [@Andarist](https://github.com/Andarist)! - Add dev hint about css object (generated by Babel) being stringified by accident

* Updated dependencies [[`539bc0c2`](https://github.com/emotion-js/emotion/commit/539bc0c2acf164b6c31f5df55f05db35932af100), [`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161), [`b3a0f148`](https://github.com/emotion-js/emotion/commit/b3a0f1484f2efcc78b447639ff2e0bc0f29915ae)]:
  - @emotion/babel-plugin-jsx-pragmatic@0.1.4
  - babel-plugin-emotion@10.0.23

## 10.0.22

### Patch Changes

- [`1bb3efe3`](https://github.com/emotion-js/emotion/commit/1bb3efe399ddf0f3332187f3c751fbba9326d02c) [#1554](https://github.com/emotion-js/emotion/pull/1554) Thanks [@Andarist](https://github.com/Andarist)! - Prepend appended label string with semicolon to avoid problems with declaration blocks without a final semicolon

- Updated dependencies [[`1bb3efe3`](https://github.com/emotion-js/emotion/commit/1bb3efe399ddf0f3332187f3c751fbba9326d02c)]:
  - babel-plugin-emotion@10.0.22

## 10.0.17

### Patch Changes

- [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Update Babel dependencies

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
