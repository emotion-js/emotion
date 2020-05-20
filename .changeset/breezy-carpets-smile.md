---
'@emotion/jest': major
---

`test` & `print` are no longer exported as named exports. If you want to access the default serializer just access the default export. This means that `@emotion/jest` can be used directly as the value for `snapshotSerializers`, but rather you should use `@emotion/jest/serializer` for this.
