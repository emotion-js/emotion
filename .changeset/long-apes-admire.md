---
'@emotion/react': major
'@emotion/styled': major
---

TypeScript types have been significantly restructured. These changes:

- reduce build times when using Emotion, especially in larger projects
- it's no longer necessary to manually specify generic parameters for your Emotion components in many cases
- union types as props are better supported and should be inferred properly
- the `css` function has been restricted to prevent passing invalid types
- `styled`'s generic parameter has been changed, if you were specifying the `ComponentType` you will need to remove that generic parameter
- `styled` no longer takes a second `ExtraProps` parameter - instead of that move it to after the `styled` call. So instead of writing `styled<typeof MyComponent, ExtraProps>(MyComponent)({})` you should now be writing `styled(MyComponent)<ExtraProps>({})`

If you encounter build issues after upgrade, try removing any manually specified generic types and let them be inferred.
