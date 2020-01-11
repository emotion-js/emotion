---
'@emotion/core': patch
---

Fixed label extraction from the stack traces in FireFox and Safari. We have failed to match a label in Emotion wrappers like Theme UI which caused SSR mismatches in mentioned browsers. This has affected only development builds.
