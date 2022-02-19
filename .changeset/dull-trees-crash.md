---
'@emotion/react': patch
'@emotion/styled': patch
---

Fixed a transpilation issue that caused `useInsertionEffect` to be referenced directly in the specifiers list of the import statement. This has caused build errors in the consuming tools since the import statement can only reference known exports of a module.
