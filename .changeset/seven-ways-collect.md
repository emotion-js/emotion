---
'@emotion/babel-plugin': minor
'@emotion/babel-plugin-jsx-pragmatic': minor
'@emotion/babel-preset-css-prop': minor
'@emotion/cache': minor
'@emotion/css': minor
'@emotion/css-prettifier': minor
'@emotion/eslint-plugin': minor
'@emotion/hash': minor
'@emotion/is-prop-valid': minor
'@emotion/jest': minor
'@emotion/memoize': minor
'@emotion/native': minor
'@emotion/primitives': minor
'@emotion/primitives-core': minor
'@emotion/react': minor
'@emotion/serialize': minor
'@emotion/server': minor
'@emotion/sheet': minor
'@emotion/styled': minor
'@emotion/unitless': minor
'@emotion/utils': minor
'@emotion/weak-memoize': minor
---

`exports` field has been added to the `package.json` manifest. This fixes how our default exports are treated by Node.js when using their native support for ES modules. It also limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.
