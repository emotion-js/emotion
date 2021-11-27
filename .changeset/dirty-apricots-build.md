---
'@emotion/react': patch
---

Suppress class name mismatch warnings that could occur during development when runtime label extraction failed. This was only an issue when using both server-side rendering and Safari. Warnings are not suppressed in production or when using a browser other than Safari.
