---
'@emotion/jest': major
---

`@emotion/jest/enzyme` entrypoint has been renamed to `@emotion/jest/enzyme-serializer`. It's main purpose is compatibility with Jest's `snapshotSerializers` option, so it no longer has a default export. You can import `createEnzymeSerializer` from the root entry (`@emotion/jest`) and create your own serializer if needed.
