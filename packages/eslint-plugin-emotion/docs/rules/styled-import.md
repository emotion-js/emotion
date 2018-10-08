# Ensure styled is imported from @emotion/styled (styled-import)

## Rule Details

This rule reports an error if styled is imported from `react-emotion` which is not where styled should be imported from in emotion 10 and above. This rule can usually be auto-fixed so you should not usually have to do anything yourself.

Examples of **incorrect** code for this rule.

```jsx
import styled from 'react-emotion'
```

Examples of **correct** code for this rule.

```jsx
import styled from '@emotion/styled'
```
