---
'@emotion/styled': minor
---

Custom `shouldForwardProp` is being preserved now when using `.withComponent`. Also, when passing an additional `shouldForwardProp` in `.withComponent`'s options (like this: `SomeComponent.withComponent('span', { shouldForwardProp })`) it's being composed with the potentially existing `shouldForwardProp`.
