# @emotion/primitives-core

> Shared utilities for emotion primitives and native

## Introduction

This package contains some shared utilities which are consumed by `@emotion/primitives` and `@emotion/native` for styling and rendering components.

> Note - In most of the cases, you won't need this package and should use `@emotion/native` or `@emotion/primitives`.

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

`createStyled` also accepts a platform specific `StyleSheet` method for creating styles, and returns a function that returns a function that returns a styled component. You can assign primitives to it for example - `View`

```js
import { StyleSheet, View, Text } from 'react-native'
import { createStyled } from '@emotion/primitives-core'

const styled = createStyled(StyleSheet)

styled.Text = styled(Text)

const StyledText = styled.Text`font-size: 40px;`

<View><StyledText>Hello World</StyledText></View>
```
