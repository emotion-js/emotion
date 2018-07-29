# @emotion/primitives-core

> Shared utilities for emotion primitives and native

## Introduction

> Note: In most of the cases, you won't need this package and should use `@emotion/native` or `@emotion/primitives`.

This package contains some shared utilities which are consumed by `@emotion/primitives` and `@emotion/native` for styling and rendering components.

This package provides two functions, `createCss` and `createStyled`.

### `createCss(StyleSheet)`

`createCss` accepts a platform specific `StyleSheet` method for creating styles, and returns a function which accepts styles via string template literal and object literal notation.

```js
import { StyleSheet, View, Text } from 'react-native'
import { createCss } from '@emotion/primitives-core'

const css = createCss(StyleSheet)

<View style={css`background-color: red;`}><Text style={css`font-size: 40px;`}>Hello World</Text></View>
```

### `createStyled(StyleSheet)`

`createStyled` also accepts a platform specific `StyleSheet` method for creating styles. It returns a function to which primitives can be assigned for example - `View`, `Text`, and it returns a styled component.

```js
import { StyleSheet, View, Text } from 'react-native'
import { createStyled } from '@emotion/primitives-core'

const styled = createStyled(StyleSheet)

styled.Text = styled(Text)

const StyledText = styled.Text`font-size: 40px;`

<View><StyledText>Hello World</StyledText></View>
```
