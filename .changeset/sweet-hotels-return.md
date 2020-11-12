---
'@emotion/css': major
---

The `key` option is now required when creating a custom instance of a cache. Please make sure it's unique (and not equal to `'css'`) as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.
