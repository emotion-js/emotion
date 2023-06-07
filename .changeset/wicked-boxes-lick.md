---
"@emotion/react": patch
---

Added `ElementType` to the Emotion's `JSX` namespace. It's defined in the same way as the one in `@types/react` and should make it possible to use components that return `string`s, `Promise`s and other types that are valid in React.
