<h1 align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" width="200">
  <br>
  emotion
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">high performance css-in-js</p>

[github](https://github.com/tkh44/emotion)
[npm](https://npm.im/emotion)

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

