# Ensure vanilla emotion is not using (no-vanilla)

## Rule Details

This rule reports an error if there is an import from the `emotion` package which is not recommended if you are using emotion with React.

Examples of **incorrect** code for this rule.

```jsx
import { css } from 'emotion'
```

## When Not To Use It

If you are using vanilla emotion because you are not using React.
