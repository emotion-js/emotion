---
'@emotion/react': major
'@emotion/styled': major
---

TypeScript types have been restructured. These changes:

- Reduce build times when using emotion
- In many cases remove the need for manually specifying generic parameters for your emotion components.

If you encounter build issues after upgrade, try removing any manually specified generic types and let them be inferred. Otherwise refer to the breaking changes list below.

## Improvements

- Union types as props are better supported and should be inferred properly
- Build times should be reduced significantly in larger projects.

## Breaking changes

- `withTheme` can now have the Theme type specified when calling it. For example `withTheme<MyTheme>(MyComponent)`

  **Breaking change:** Generic argument changed, if you were specifying the ComponentType you will need to remove the generic parameter. Recommend following example setup in the TypeScript docs under theming section

- `css` function has been restricted to prevent passing of invalid types
- `CreateStyled` functions no longer take a second `ExtraProps` argument. Instead move it to after the create styled call. For example

  `styled<typeof MyComponent, ExtraProps>(MyComponent)({})`
  to
  `styled(MyComponent)<ExtraProps>({})`
