---
'@emotion/jest': major
---

`@emotion/jest/serializer`'s main purpose is compatibility with Jest's `snapshotSerializers` option, so it no longer has a default export. You can import `createSerializer` from the root entry (`@emotion/jest`) and create your own serializer if needed.
