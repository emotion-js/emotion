---
title: "Typescript"
---

Emotion includes TypeScript definitions for `emotion`, `react-emotion`, `preact-emotion`, `create-emotion`, and `create-emotion-styled`. These definitions also infer types for css properties with the object syntax, HTML/SVG tag names, and prop types.

## emotion

```tsx
import { css } from 'emotion'

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

Typescript checks css properties with the object style syntax using [csstype](https://www.npmjs.com/package/csstype) package, so following code will emit errors.

```tsx
import { css } from 'emotion';

const titleStyle = css({
                       ^ Argument of type 'boxSizing: 'bordre-box';' is not assignable [...]
  boxSizing: 'bordre-box', // Oops, there's a typo!
  width: 300,
  height: 200,
});
```

## react-emotion

### HTML/SVG elements

```tsx
import styled from 'react-emotion'

const Link = styled('a')`
  color: red;
`

const Icon = styled('svg')`
  stroke: green;
`

const App = () => <Link href="#">Click me</Link>
```

```tsx
import styled from 'react-emotion';

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
import styled from 'react-emotion'

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
import styled from 'react-emotion'

type ImageProps = {
  src: string,
  width: number;
}

const Image0 = styled('div')`
  width: ${(props: ImageProps) => props.width};
  background: url(${(props: ImageProps) => props.src}) center center;
  background-size: contain;
`

// Or with object styles

const Image1 = styled('div')({
  backgroundSize: 'contain',
}, (props: ImageProps) => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));

// Or with a generic type

const Image2 = styled('div')<ImageProps>`
  width: ${props => props.width};
  background: url(${props => props.src}) center center;
  background-size: contain;
`

const Image3 = styled('div')<ImageProps>({
  backgroundSize: 'contain',
}, props => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));
```

### React Components

```tsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

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
import styled from 'react-emotion'

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
However, you can define a theme type by creating a another `styled` instance.

_styled.tsx_

```tsx
import styled, { CreateStyled } from 'react-emotion'

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

## preact-emotion

The `preact-emotion` types are the same as the `react-emotion` types except that the types use Preact component types like `ComponentConstructor` and `FunctionalComponent` instead of React component types.

## create-emotion

The `create-emotion` types are very similar to the `emotion` types except that you can pass your own context and options.

```tsx
import createEmotion, {
  Emotion,
  EmotionOptions
} from 'create-emotion'

const context = {}
const options: EmotionOptions = {
  key: 'my-emotion'
}
const myEmotion: Emotion = createEmotion(context, options)

const bodyStyle = myEmotion.css({
  display: 'flex',
  flowDirection: 'column-reverse'
})
```

## create-emotion-styled

The current typings for `create-emotion-styled` are only compatible with React, and will not work with Preact. For detail typing, see the [`react-emotion` section](#react-emotion) above.
