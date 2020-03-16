---
"@emotion/react": patch
---

Do not warn about `@emotion/react` being loaded twice in Jest. For some reason Jest sometimes evaluates modules twice when `jest.mock` is being called.
