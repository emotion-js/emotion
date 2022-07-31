---
'@emotion/react': minor
'@emotion/styled': minor
'@emotion/utils': minor
---

Thanks to the added `exports` field, the package now includes a `worker` condition that can be utilized by properly configured bundlers when targeting worker-like environments. It fixes the issue with browser-specific files being prioritized by some bundlers when targeting workers.
