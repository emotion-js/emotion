import React from 'react'
import { css, injectGlobal } from 'emotion'

const maxColors = Math.pow(16, 6)

// a sample react app. nothing fancy, just generating enough html to guarantee chunks
export default function App({ count }) {
  return (
    <div className={css({ color: 'red' })}>
      woah there
      <span>hello world</span>
      {Array.from({ length: count }, (_, i) => {
        injectGlobal`
        .some-global-${i} {
          padding: 0;
          margin: ${i};
        }`
        return (
          <span
            key={i}
            className={css({
              color:
                '#' +
                Math.round(i / count * maxColors)
                  .toString(16)
                  .padStart(6, '0')
            })}
          >
            what what
          </span>
        )
      })}
    </div>
  )
}
