import React from 'react'
import { css, injectGlobal } from 'emotion'

const maxColors = Math.pow(16, 6)

// a sample react app. nothing fancy, just generating enough html to guarantee chunks
export default function App({ count }) {
  if (count === 0) return null
  injectGlobal`
  .some-global-${count} {
    padding: 0;
    margin: ${count};
  }`
  return (
    <div
      className={css({
        color:
          '#' +
          Math.round(1 / count * maxColors)
            .toString(16)
            .padStart(6, '0')
      })}
    >
      woah there
      <span>hello world</span>
      <App count={count - 1} />
    </div>
  )
}
