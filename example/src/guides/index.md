# 👩‍🎤 emotion

[github](https://github.com/tkh44/emotion)
[npm](https://npm.im/emotion)

High performance css-in-js using the css you know.


In order to learn more about emotion lets build this guide together. By following along below, we can get this markdown looking good.

#### Heading

👈 Find the `Heading` declaration and modify it to match the example below.

```jsx
const Heading = styled('h1')`
  color: #da77f2;
  letter-spacing: 1px;
`
```

#### Links

Change them to green and fix up their font.

👈 Find the `Link` declaration and modify it to match the example below.

```jsx
const Link = styled('a')`
  font-size: 1rem;
  margin-left: auto;
  margin-right: 8px;
  text-decoration: none;
  color: ${colors.green[4]};
  
  p & {
    margin: 0;
  }
  
  &:hover {
    color: ${colors.green[8]};
  }
`
```

#### Paragraphs

Now lets clean up the paragraphs.

👈 Find the `Paragraph` declaration and modify it to match the example below.

```jsx
const Paragraph = styled('div')`
  margin: 16px 0;
  padding: 2px;
  font-size: 0.85rem;
  color: ${colors.gray[8]};
`
```

#### Code Blocks

These code blocks don't really stand out. Lets give them a nice background and lighten the text color a bit.

👈 Find the `Code` declaration and modify it to match the example below.

```jsx
const Code = styled('code')`
  font-family: monospace;
  font-size: 0.75rem;
  color: ${colors.gray[8]};
  background-color: ${colors.gray[0]};
  padding: 1px;
  
  p & {
    font-size: 0.99rem;
  }
`
```

That modified the text but we still need to style the container.

👈 Find the `CodeBlock` declaration and modify it to match the example below.

```jsx
const CodeBlock = styled('pre')`
  margin: 0;
  padding: 4px;
  color: ${colors.gray[6]};
  background-color: ${colors.gray[0]};
  border-radius: attr(radius, 6px);
`
```

