---
title: "Typescript"
---

Emotion includes TypeScript definitions for `emotion`, `react-emotion`, `preact-emotion`, `create-emotion`, and `create-emotion-styled` packages. These definitions also infer types for css property (with object syntax), and HTML/SVG tag names, and props types.

## emotion

```jsx
import { css } from 'emotion';

const titleStyle = css({
  boxSizing: 'border-box',
  width: 300,
  height: 200,
});

const subtitleStyle = css`
  boxSizing: 'border-box';
  width: 100;
  height: 60;
`;
```

Typescript checks css properties in object style syntax using [csstype](https://www.npmjs.com/package/csstype) package, so following code will emit errors.

```jsx
import { css } from 'emotion';

const titleStyle = css({
                       ^ Argument of type 'boxSizing: 'bordre-box';' is not assignable [...]
  boxSizing: 'bordre-box', // Oops, there's a typo!
  width: 300,
  height: 200,
});

const subtitleStyle = css`
  boxSizing: 'border-box';
  width: 100;
  height: 60;
`;
```

## react-emotion

### HTML/SVG elements

```jsx
import styled from 'react-emotion';

const Link = styled('a')`
  color: red;
`;

const Icon = styled('svg')`
  stroke: green;
`;

const App = () => <Link href="#">Click me</Link>;
```

```jsx
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

```jsx
import styled from 'react-emotion';

const NotALink = styled('div')`
  color: red;
`

const Link = NotALink.withComponent('a')

const App = () => <Link href="#">Click me</Link>

// No errors!
```

### Passing Props

You can type the props of your styled components.

```jsx
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

// Or with object style

const Image1 = styled('div')({
  backgroundSize: 'contain',
}, (props: ImageProps) => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));

// Or with generic type

const Image1 = styled('div')<ImageProps>({
  backgroundSize: 'contain',
}, props => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));
```

* The generic type version only works with object styles due to https://github.com/Microsoft/TypeScript/issues/11947.

### React Components

```jsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string,
  label: string
}

const Component: SFC = ({ label, className }) => (
  <div className={className}>{label}</div>
)

const StyledComponent0 = styled(Component)`
  color: red;
`

const StyledComponent1 = styled(Component)({
  color: 'red',
});

const App = () => (
  <div>
    <StyledComponent0 label="Yea! No need to re-type this label prop." />
    <StyledComponent1 label="Yea! No need to re-type this label prop." />
  </div>
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

const Component: SFC = ({ label, className }) => (
  <div className={className}>{label}</div>
)

type StyledComponentProps = {
  bgColor: string
};

const StyledComponent0 = styled(Component)`
  color: red;
  background: ${(props: StyledComponentProps) => props.bgColor};
`

const StyledComponent1 = styled(Component)<StyledComponentProps>({
  color: 'red',
}, props => ({
  background: props.bgColor,
}));

const App = () => (
  <div>
    <StyledComponent0 bgColor="red" label="Oh, needs to re-type label prop =(" />
    <StyledComponent1 bgColor="red" label="Oh, needs to re-type label prop =(" />
  </div>
)
```

### Define a Theme

By default, the `props.theme` has `any` type annotation and works without error.\
However, you can define a theme type by creating a another `styled` instance.

_styled.jsx_

```jsx
import styled, { CreateStyled } from 'react-emotion'

type Theme = {
  color: {
    primary: string,
    positive: string,
    negative: string,
  },
  // ...
}

export default styled as CreateStyled<Theme>
```

_Button.jsx_

```jsx
import styled from '../pathto/styled'

const Button = styled('button')`
  padding: 20px;
  background-color: ${props => props.theme.primary};
  border-radius: 3px;
`

export default Button
```

## preact-emotion

Types are almost same with `react-emotion` package.

## create-emotion

Basically same with `emotion`, except that you can pass your own context and options.

```jsx
import createEmotion, { Emotion, EmotionOption } from 'create-emotion';

const context = {};
const options: EmotionOption = {
  key: 'my-emotion',
};
const myEmotion: Emotion = createEmotion(context, options);

const bodyStyle = myEmotion.css({
  display: 'flex',
  flowDirection: 'column-reverse',
});
```

## create-emotion-styled

The current typings for `create-emotion-styled` are only compatible with React, and will not work with Preact. For detail typing, see `react-element` section above.
