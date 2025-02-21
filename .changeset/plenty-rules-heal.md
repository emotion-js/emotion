---
'@emotion/styled': major
---

What: Add autocomplete suggestion for styled. Fixes #3312

Why: When typing "styled" while coding, there are no autocompletion suggestions for `styled`. It's expected behavior is to have a suggestion option and when selected, imports `styled` like this: `import styled from @emotion/styled`

How: The previous code imports the base styled as `styled`. This changes it to `baseStyled` so the module can use `styled` as the default export.
