---
'@emotion/native': patch
'@emotion/primitives': patch
---

Add missing `@emotion/react` peer dependency

Both `@emotion/native` and `@emotion/primitives` depend on `@emotion/primitives-core`, which requires `@emotion/react` as a peer dependency. This change adds the missing peer dependency declarations to ensure proper dependency resolution.
