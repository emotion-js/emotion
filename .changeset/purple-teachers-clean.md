---
'@emotion/jest': major
'jest-emotion': major
---

Rename `jest-emotion` to `@emotion/jest`. Please replace `"snapshotSerializers": ["jest-emotion"]` with `"snapshotSerializers": ["@emotion/jest"]` if you're using the snapshot serializer. Also replace any imports of `jest-emotion` with `@emotion/jest` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.
