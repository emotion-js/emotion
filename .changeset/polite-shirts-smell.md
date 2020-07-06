---
'@emotion/cache': patch
---

Fixed issue with SSRed styles causing a React rehydration mismatch between server & client when cache was created in render.
