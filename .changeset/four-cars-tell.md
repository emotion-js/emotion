---
'@emotion/react': major
'@emotion/styled': major
---

Reworked TypeScript definitions so it's easier to provide a type for Theme. Instead of creating custom instances (like before) you can augment builtin Theme interface like this:

```ts
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    primaryColor: string
    secondaryColor: string
  }
}
```
