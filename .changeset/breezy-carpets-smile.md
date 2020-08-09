---
'@emotion/jest': major
---

`test` & `print` are no longer exported as named exports. If you want to access the default serializer just access the default export. This means that `@emotion/jest`(previously `jest-emotion`) can't be used directly in the `snapshotSerializers` option, you should use `@emotion/jest/serializer` instead for this.
