---
'@emotion/react': patch
---


Use theme context when rendering components at all times. This removes a conditional usage of a React hook that could break [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) in some scenarios.
