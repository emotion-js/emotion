## TypeScript

Emotion have some TypeScript definitions to allow you easily type your styled components.
The definitions come with a great type inferences from tagnames and another components.

### Inferring Props from tag names

```jsx
import styled from 'react-emotion'

const Link = styled('a')`
  color: red;
`

const App = () => (
  <Link href="#">Click me</Link>
)
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

Also it can able to infer new tag props when using `withComponent`

```jsx
import styled from 'react-emotion'

const NotALink = styled('div')`
  color: red,
`

const Link = NotALink.withComponent('a')

const App = () => (
  <Link href="#">Click me</Link>
)

// No errors!
```

### Passing Props

You can type the props of your styled components.  
Unfortunately you will need to pass a second parameter with the tagname because TypeScript stops inferring the tagname.

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

Also works with object as styles way

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

// OR

const Image = styled.div<ImageProps>({
  backgroundSize: contain;
}, ({ src }) => ({
  background: `url(${src}) center center`,
}))

``` 

Note that in shorthand example you don't need to pass the tagname as argument.  
But it will only work using object as style due to a bug passing argument to a tagged template strings function. See https://github.com/Microsoft/TypeScript/issues/11947

### Inferring props from another component

```jsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string,
  label: string,
}

const Component: SFC = ({ label, className }) => (
  <div className={className}>
    {label}
  </div>
)

const StyledComponent = styled(Component)`
  color: red;
`

const App = () => (
  <StyledComponent label="Yea! No need to re-type this label prop." />
)
```

### Passing props while styling another component

```jsx
import React, { SFC } from 'react'
import styled from 'react-emotion'

type ComponentProps = {
  className?: string,
  label: string,
}

const Component: SFC = ({ label, className }) => (
  <div className={className}>
    {label}
  </div>
)

type StyledComponentProps = {
  bgColor: string,
} & ComponentProps
//  ^^^ You will need this

const StyledComponent = styled<StyledComponentProps>(Component)`
  color: red;
  background: ${props => props.bgColor};
`

const App = () => (
  <StyledComponent bgColor="red" label="Oh, needs to re-type label prop =(" />
)
```

Unfortunately when you pass custom props to a styled component, TypeScript will stops to inferring your Component props, and you will need to re-type that.

### Define a Theme

By default, the `props.theme` has `any` type annotation. So, by default, you can use without any error.  
However you can define a theme type by creating a another styled instance

*styled.tsx*
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

*Button.tsx*
```jsx
import styled from '../pathto/styled'

const Button = styled('button')`
  padding: 20px;
  background-color: ${props => props.theme.primary};
  border-radius: 3px;
`

export default Button
``` 
