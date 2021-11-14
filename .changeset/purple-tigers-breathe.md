---
'@emotion/jest': minor
---

author: @eps1lon
author: @Andarist

Adjusted the serialization logic to unwrap rendered elements from Fragments that had to be added to fix hydration mismatches caused by `React.useId` usage (the upcoming API of the React 18).
