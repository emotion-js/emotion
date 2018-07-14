# @emotion/weak-memoize

> A memoization function that uses a WeakMap

## Install

```bash
yarn add @emotion/weak-memoize
```

## Usage

Because @emotion/weak-memoize uses a WeakMap the arguments must be non primitive types, e.g. objects, functions, arrays and etc.

```jsx
import weakMemoize from '@emotion/weak-memoize'

let thing = weakMemoize(arg => {})
```
