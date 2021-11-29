# [Emotion Site](https://emotion.sh)

## Docs

All of the docs live in the `docs` in the root of this repository. They are in [Markdown](https://daringfireball.net/projects/markdown/basics) and they should include the following frontmatter at the top of each file that specifies the title for the page.

```yaml
title: 'Some Title'
---
```

### Code Blocks

When the langauge is `jsx` and the code block has a `// @live` comment, it will have a preview next to it. Most of the Emotion packages can be imported and there is a `render` function that accepts a react element and will render into the preview next to it.

```md
\`\`\`jsx
// @live

render('some react element')
\`\`\`
```
