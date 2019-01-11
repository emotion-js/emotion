---
title: 'Class Names'
---

It can be useful to create a className that is not passed to a component, for example if a component accepts a `wrapperClassName` prop or similar. To do this, Emotion exposes a render prop component which you can pass a function which accepts `css` and `cx`. If you have used versions of Emotion prior to Emotion 10 or used vanilla Emotion, the `css` and `cx` functions work exactly like they do in those versions.

```jsx
// @live
import { ClassNames } from '@emotion/core'

// this might be a component from npm that accepts a wrapperClassName prop
let SomeComponent = props => (
  <div className={props.wrapperClassName}>
    in the wrapper!
    <div className={props.className}>{props.children}</div>
  </div>
)

render(
  <ClassNames>
    {({ css, cx }) => (
      <SomeComponent
        wrapperClassName={css({ color: 'green' })}
        className={css`
          color: hotpink;
        `}
      >
        from children!!
      </SomeComponent>
    )}
  </ClassNames>
)
```
