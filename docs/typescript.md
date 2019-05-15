---
title: 'TypeScript'
---

Emotion includes TypeScript definitions for `@emotion/core` and `@emotion/styled`. These definitions also infer types for css properties with the object syntax, HTML/SVG tag names, and prop types.

## @emotion/core

```tsx
import { css } from '@emotion/core'

const titleStyle = css({
  boxSizing: 'border-box',
  width: 300,
  height: 200
})

const subtitleStyle = css`
  box-sizing: border-box;
  width: 100px;
  height: 60px;
`
```

TypeScript checks css properties with the object style syntax using [csstype](https://www.npmjs.com/package/csstype) package, so following code will emit errors.

```tsx
import { css } from '@emotion/core';

const titleStyle = css({
                       ^ Argument of type 'boxSizing: 'bordre-box';' is not assignable [...]
  boxSizing: 'bordre-box', // Oops, there's a typo!
  width: 300,
  height: 200,
});
```

## @emotion/styled

### HTML/SVG elements

```tsx
import styled from '@emotion/styled'

const Link = styled('a')`
  color: red;
`

const Icon = styled('svg')`
  stroke: green;
`

const App = () => <Link href="#">Click me</Link>
```

```tsx
import styled from '@emotion/styled';

const NotALink = styled('div')`
  color: red;
`;

const App = () => (
  <NotALink href="#">Click me</NotALink>
            ^^^^^^^^ Property 'href' does not exist [...]
);
```

### `withComponent`

```tsx
import styled from '@emotion/styled'

const NotALink = styled('div')`
  color: red;
`

const Link = NotALink.withComponent('a')

const App = () => <Link href="#">Click me</Link>

// No errors!
```

### Passing Props

You can type the props of styled components.

```tsx
import styled from '@emotion/styled'

type ImageProps = {
  src: string
  width: number
}

const Image0 = styled('div')`
  width: ${(props: ImageProps) => props.width};
  background: url(${(props: ImageProps) => props.src})
    center center;
  background-size: contain;
`

// Or with object styles

const Image1 = styled('div')(
  {
    backgroundSize: 'contain'
  },
  (props: ImageProps) => ({
    width: props.width,
    background: `url(${props.src}) center center`
  })
)

// Or with a generic type

const Image2 = styled('div')<ImageProps>(
  {
    backgroundSize: 'contain'
  },
  props => ({
    width: props.width,
    background: `url(${props.src}) center center`
  })
)

// TS 2.9+ only
const Image3 = styled.div<ImageProps>`
  width: ${(props: ImageProps) => props.width};
  background: url(${(props: ImageProps) => props.src})
    center center;
  background-size: contain;
`
```

- For Typescript <2.9, the generic type version only works with object styles due to https://github.com/Microsoft/TypeScript/issues/11947.

### React Components

```tsx
import React, { SFC } from 'react'
import styled from '@emotion/styled'

type ComponentProps = {
  className?: string
  label: string
}

const Component: SFC<ComponentProps> = ({
  label,
  className
}) => <div className={className}>{label}</div>

const StyledComponent0 = styled(Component)`
  color: red;
`

const StyledComponent1 = styled(Component)({
  color: 'red'
})

const App = () => (
  <div>
    <StyledComponent0 label="Yea! No need to re-type this label prop." />
    <StyledComponent1 label="Yea! No need to re-type this label prop." />
  </div>
)
```

### Passing props when styling a React component

```tsx
import React, { SFC } from 'react'
import styled from '@emotion/styled'

type ComponentProps = {
  className?: string
  label: string
}

const Component: SFC<ComponentProps> = ({
  label,
  className
}) => <div className={className}>{label}</div>

type StyledComponentProps = {
  bgColor: string
}

const StyledComponent0 = styled(Component)`
  color: red;
  background: ${(props: StyledComponentProps) =>
    props.bgColor};
`

const StyledComponent1 = styled(Component)<
  StyledComponentProps
>(
  {
    color: 'red'
  },
  props => ({
    background: props.bgColor
  })
)

const App = () => (
  <div>
    <StyledComponent0
      bgColor="red"
      label="Some cool text"
    />
    <StyledComponent1
      bgColor="red"
      label="Some more cool text"
    />
  </div>
)
```

### Define a Theme

By default, `props.theme` has an `any` type annotation and works without any errors.
However, you can define a theme type by creating another `styled` instance.

_styled.tsx_

```tsx
import styled, { CreateStyled } from '@emotion/styled'

type Theme = {
  color: {
    primary: string
    positive: string
    negative: string
  }
  // ...
}

export default styled as CreateStyled<Theme>
```

_Button.tsx_

```tsx
import styled from '../path/to/styled'

const Button = styled('button')`
  padding: 20px;
  background-color: ${props => props.theme.primary};
  border-radius: 3px;
`

export default Button
```
