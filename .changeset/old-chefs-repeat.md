---
"@emotion/react": patch
---

Export `Keyframes` type to avoid TypeScript inserting `import("@emotion/serialize").Keyframes` references into declaration files emitted based on a source files exporting `keyframes` result. This avoids issues with strict package managers that don't allow accessing undeclared dependencies.
