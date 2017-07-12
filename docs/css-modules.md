## Usage with CSS Modules

emotion works well with CSS Modules but it requires a bit of configuration.

1. In your webpack config add the exclude option with this regex `/emotion\.css$/` to your loader for css so that emotion's static css isn't imported as a CSS Module.
2. Add another object to your `modules.use` with your css loaders but with CSS Modules disabled and set the test field to the same regex as above `/emotion\.css$/`.


- [Example webpack config](../example/webpack.config.js)
- [Example usage of CSS Modules with emotion](../example/src/markdown/index.js)

### attr

The [attr](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) CSS function is supported in
a basic capacity.

```css
/* get value from `width` prop */
width: attr(width vw);

/* specify type or unit to apply to value */
width: attr(width vw);

/* fallback value if props.width is falsey */
width: attr(width vw, 50);
```

```jsx
const H1 = styled.h1`
  font-size: attr(fontSize px);
  margin: attr(margin rem, 4);
  font-family: sans-serif;
  color: attr(color, ${colors.pink[5]});
  @media (min-width: 680px) {
    color: attr(desktopColor);
  }
`

const Title = ({ title, scale }) => {
  return (
    <H1 fontSize={16 * scale} desktopColor={colors.gray[5]}>
      {title}
    </H1>
  )
}
```
