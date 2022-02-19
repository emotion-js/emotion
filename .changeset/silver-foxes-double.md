---
'@emotion/react': minor
'@emotion/styled': minor
---

Refactored code to use the upcoming `React.useInsertionEffect` when it's available (this is a new hook that is going to be introduced in React 18). This shouldn't have any effect on existing codebases and the change should be transparent.
