---
title: "Typescript"
---

Emotion includes TypeScript definitions for `styled` components and has type inferences for both html elements and React components.

### html elements

```jsx
import styled from 'react-emotion'

const Link = styled('a')`
  color: red;
`

const App = () => <Link href="#">Click me</Link>
```

```jsx
import styled from 'react-emotion'

const NotALink = styled('div')`
  color: red;
`

const App = () => (
  <NotALink href="#">Click me</NotALink>
            ^^^^^^^^ Property 'href' does not exist [...]
)
```

### `withComponent`

```jsx
import styled from 'react-emotion'

const NotALink = styled('div')`
  color: red;
`

const Link = NotALink.withComponent('a')

const App = () => <Link href="#">Click me</Link>

// No errors!
```

### Passing Props

You can type the props of your styled components.
Unfortunately, you will need to pass a second parameter with the tag name because TypeScript is unable to infer the tagname.

```jsx
import styled from 'react-emotion'

type ImageProps = {
  src: string,
}

const Image = styled<ImageProps, 'div'>('div')`
  background: url(${props => props.src}) center center;
  background-size: contain;
`
```

### Object Styles

```jsx
import styled from 'react-emotion'

type ImageProps = {
  src: string,
}

const Image = styled<ImageProps, 'div'>('div')({
  backgroundSize: contain;
}, ({ src }) => ({
  background: `url(${src}) center center`,
}))

// Or shorthand

const Image = styled.div<ImageProps>({
  backgroundSize: contain;
}, ({ src }) => ({
  background: `url(${src}) center center`,
}))
```

* Note that in shorthand example you don't need to pass the tag name argument.
* The shorthand only works with object styles due to https://github.com/Microsoft/TypeScript/issues/11947.

### React Components

```jsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string,
  label: string
}

const Component: SFC<ComponentProps> = ({ label, className }) => (
  <div className={className}>{label}</div>
)

const StyledComponent = styled(Component)`
  color: red;
`

const App = () => (
  <StyledComponent label="Yea! No need to re-type this label prop." />
)
```

### Passing props when styling a React component

```jsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string,
  label: string
}

const Component: SFC<ComponentProps> = ({ label, className }) => (
  <div className={className}>{label}</div>
)

type StyledComponentProps = {
  bgColor: string
} & ComponentProps
//  ^^^ You will need this

const StyledComponent = styled<StyledComponentProps, {}>(Component)`
  color: red;
  background: ${props => props.bgColor};
`

const App = () => (
  <StyledComponent bgColor="red" label="Oh, needs to re-type label prop =(" />
)
```

Unfortunately, when you pass custom props to a styled component, TypeScript will stop inferring your Component props, and you will need to re-type them.

### Define a Theme

By default, the `props.theme` has `any` type annotation and works without error.\
However, you can define a theme type by creating a another `styled` instance.

_styled.tsx_

```jsx
import styled, { ThemedReactEmotionInterface } from 'react-emotion'

type Theme = {
  color: {
    primary: string,
    positive: string,
    negative: string,
  },
  // ...
}

export default styled as ThemedReactEmotionInterface<Theme>
```

_Button.tsx_

```jsx
import styled from '../pathto/styled'

const Button = styled('button')`
  padding: 20px;
  background-color: ${props => props.theme.primary};
  border-radius: 3px;
`

export default Button
```
