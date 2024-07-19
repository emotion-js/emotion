---
'@emotion/cache': minor
'@emotion/css': minor
'@emotion/primitives-core': minor
'@emotion/react': minor
'@emotion/serialize': minor
'@emotion/sheet': minor
'@emotion/styled': minor
'@emotion/use-insertion-effect-with-fallbacks': minor
'@emotion/utils': minor
---

Migrated away from relying on `process.env.NODE_ENV` checks to differentiate between production and development builds.

Development builds (and other environment-specific builds) can be used by using proper conditions (see [here](https://nodejs.org/docs/v20.15.1/api/packages.html#resolving-user-conditions)). Most modern bundlers/frameworks already preconfigure those for the user so no action has to be taken.

Default files should continue to work in all environments.
