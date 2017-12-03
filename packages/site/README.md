# Emotion Site

## Docs

All of the docs live in the `docs` in the root of this repository. They are in [Markdown](https://daringfireball.net/projects/markdown/basics) and they should include the following frontmatter at the top of each file that specifies the name for the page.

```yaml
---
title: "Some Title"
---
```

### Code Blocks

The docs can contain Markdown code blocks, the language should generally be `jsx` but it can also be `jsx live` to have previews. When the langauge is `jsx live` the code block will have a preview next to it and all of emotion and react-emotion's exports are available along with a `render` function that accepts a react element and will render into the preview next to it.


### Links

All links to other pages on the docs should be linked to with `docs/doc-name`.

TODO: Add packages pages and do something special with links to READMEs.