---
'@emotion/cache': major
---

From now on `key` option is required. Please make sure it's unique (and not equal to `"css"`) as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.
