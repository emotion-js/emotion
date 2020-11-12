---
'@emotion/react': major
'@emotion/styled': major
---

It's now easier to provide a type for `Theme`. Instead of creating custom instances (like before) you can augment the builtin `Theme` interface like this:

```ts
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    primaryColor: string
    secondaryColor: string
  }
}
```
