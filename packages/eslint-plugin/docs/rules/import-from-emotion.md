# Ensure styled is imported from @emotion/styled (import-from-emotion)

## Rule Details

This rule reports an error if anything other than styled is imported from `react-emotion` because `emotion`'s exports are not re-exported from `react-emotion` in emotion 10 and above. This rule can usually be auto-fixed so you should not usually have to do anything yourself. This rule primarily exists for migration purposes because ideally the `emotion` package should not be used in a React app with Emotion 10 and above.

Examples of **incorrect** code for this rule.

```jsx
import { css } from 'react-emotion'
```

Examples of **correct** code for this rule.

```jsx
import { css } from 'emotion'
```
