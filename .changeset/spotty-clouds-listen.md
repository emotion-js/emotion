---
'@emotion/react': patch
---

Fix an edge case where runtime label extraction in class components led to invalid class names in Firefox. This only affected the development build of Emotion.
