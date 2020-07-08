# Choose between styles written as strings or objects (syntax-preference)

[Styled](https://emotion.sh/docs/styled) accepts string styles or object styles.

## Rule Details

This rule aims to choose between syntaxes.

Examples of **incorrect** code for this rule, when `@emotion/syntax-preference: [2, "string"]`:

```js
const H1 = styled.h1({
  color: red
})
// --> Styles should be written using strings.

const H1 = styled('h1')({
  color: red
})
// --> Styles should be written using strings.
```

Examples of **incorrect** code for this rule, when `@emotion/syntax-preference: [2, "object"]`:

```js
const H1 = styled.h1`
  color: red;
`
// --> Styles should be written using objects.

const H1 = styled('h1')`
  color: red;
`
// --> Styles should be written using objects.
```

## When Not To Use It

If you don't want to limit styles to a unique syntax.
