## cx

`cx` is emotion's version of the popular [`classnames` library](https://github.com/JedWatson/classnames).
`cx` is useful when combining multiple class names, even class names from your stylesheets and emotion generated class names.

### Key features
- High performance integration with emotion
- Custom class names. e.g, `.my-bem--class`, are appended in order.
- Combines the actual content of emotion generated class names. Multiple emotion generated class names are input and a unique class name is output.


### API

**`cx`** - `(...args<string|number|function|object|array>): string`

`cx` takes any number of arguments and returns a string class name.

* Falsey values are removed from the final string.
* If an object value is encountered, any key that has a corresponding truthy value is added to the final string.
* If an function value is encountered, the return value is wrapped in `cx` and returned. 


### Examples

##### Combining emotion generated class names

```jsx harmony
import { cx, css } from 'emotion'

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls1, cls2)} />
```

This renders a `div` with a single class name and the following styles would be inserted.

```css
.css-12345 {
  font-size: 20px;
  background: green;
  font-size: 20px;
  background: blue;
}
```

If the order of the class names is reversed in the `cx` call the styles would change precedence.

```jsx harmony
import { cx, css } from 'emotion'

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls2, cls1)} /> // <-- arguments reversed
```

The div will now have a **green** background even though `cls2` was inserted **after** `cls1`.

```css
.css-54321 {
  font-size: 20px;
  background: blue;
  font-size: 20px;
  background: green;
}
```

##### Combining both emotion generated class names and custom class names.

```jsx harmony
const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

const cls3 = css`
  font-size: 20px;
  background: darkorange;
`

const cls4 = css`
  font-size: 20px;
  background: darkgreen;
`

const foo = true
const bar = false


<div
  className={cx(
    { [cls1]: foo },
    { [cls2]: bar },
    () => 'modal',
    'profile',
    [[cls3, [cls4]]]
  )}
/>
```

Output:

```css
.css-i43k4 {
  font-size: 20px;
  background: green;
  font-size: 20px;
  background: darkorange;
  font-size: 20px;
  background: darkgreen;
}
```

```jsx harmony
<div
  className="modal profile css-i43k4"
/>
```
