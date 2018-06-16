---
title: "Typescript"
---

Emotion includes TypeScript definitions for `emotion`, `react-emotion`, `preact-emotion`, `create-emotion`, and `create-emotion-styled`. These definitions also infer types for css properties with the object syntax, HTML/SVG tag names, and prop types.

## emotion

```tsx
import { css } from 'emotion';

const titleStyle = css({
  boxSizing: 'border-box',
  width: 300,
  height: 200,
});

const subtitleStyle = css`
  box-sizing: border-box;
  width: 100px;
  height: 60px;
`;
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
import styled from 'react-emotion';

const Link = styled('a')`
  color: red;
`;

const Icon = styled('svg')`
  stroke: green;
`;

const App = () => <Link href="#">Click me</Link>;
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
import styled from 'react-emotion';

const NotALink = styled<{}, 'div'>('div')`
  color: red;
`

const Link = NotALink.withComponent('a')

type TextProps = {
  className: string;
  text: string;
}
const Text = ({ className, text }: TextProps) => <div className={className}>{text}</div>
const StyledText = styled<{}, TextProps>(Text)`
  fontSize: 20px;
  color: white;
`;

const OtherLink = StyledText.withComponent('a');

const App = () => <Link href="#">Click me</Link>

// No errors!
```

When you use `withComponent`, you should explicitly provide the type of props used to make style. If you don't, TS will think all props for `Text` are used to make style, and request user to give all those props when using the result component of `withComponent`.

### Passing Props

You can type the props of styled components.

```tsx
import styled from 'react-emotion'

type ImageProps = {
  src: string;
  width: number;
}

const Image0 = styled<ImageProps, 'div'>('div')`
  width: ${(props) => props.width};
  background: url(${(props: ImageProps) => props.src}) center center;
  background-size: contain;
`

// Or with object styles

const Image1 = styled<ImageProps, 'div'>('div')({
  backgroundSize: 'contain',
}, (props) => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));

// Or with a generic function

const Image1 = styled('div')<ImageProps>({
  backgroundSize: 'contain',
}, props => ({
  width: props.width;
  background: `url(${props.src}) center center`,
}));
```

* The generic function version only works with object styles in TS <= 2.8 due to https://github.com/Microsoft/TypeScript/issues/11947.
* If you use TS > 2.9, generic function will works with string styles too, but it will break VSCode syntax highlighting. See https://github.com/emotion-js/emotion/issues/721#issuecomment-396954993

### React Components

```tsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string;
  label: string;
}

const Component: SFC<ComponentProps> = ({ label, className }) => (
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

```tsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps0 = {
  className?: string;
  label: string;
}

const Component0: SFC<ComponentProps0> = ({ label, className }) => (
  <div className={className}>{label}</div>
)

type StyledComponentProps = {
  bgColor: string
};

const StyledComponent00 = styled<StyledComponentProps, ComponentProps0>(Component)`
  color: red;
  background: ${props => props.bgColor};
`

const StyledComponent01 = styled(Component)<StyledComponentProps>({
  color: 'red',
}, props => ({
  background: props.bgColor,
}));

type ComponentProps1 = {
  className?: string;
  label: string;
  bgColor: string;
}

const Component1: SFC<ComponentProps1> = ({ label, className }) => (
  <div className={className}>{label}</div>
)

const StyledComponent10 = styled(Component)`
  color: red;
  background: ${props => props.bgColor}
`

const StyledComponent11 = styled(Component)({
  color: 'red',
}, props => ({
  background: props.bgColor,
}));

const App = () => (
  <div>
    <StyledComponent00 bgColor="red" label="Some cool text" />
    <StyledComponent01 bgColor="red" label="Some more cool text" />
    <StyledComponent10 bgColor="red" label="Much more cool text" />
    <StyledComponent11 bgColor="red" label="The most cool text" />
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
    primary: string,
    positive: string,
    negative: string,
  },
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
import createEmotion, { Emotion, EmotionOptions } from 'create-emotion';

const context = {};
const options: EmotionOptions = {
  key: 'my-emotion',
};
const myEmotion: Emotion = createEmotion(context, options);

const bodyStyle = myEmotion.css({
  display: 'flex',
  flowDirection: 'column-reverse',
});
```

## create-emotion-styled

The current typings for `create-emotion-styled` are only compatible with React, and will not work with Preact. For detail typing, see the [`react-emotion` section](#react-emotion) above.
