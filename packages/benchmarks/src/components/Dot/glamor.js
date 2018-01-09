import React from 'react'
import { css } from 'glamor'

export default ({ size, x, y, children, color }) => (
  <div
    className={css({
      position: 'absolute',
      textAlign: 'center',
      cursor: 'pointer',
      width: 0,
      height: 0,
      left: x + 'px',
      top: y + 'px',
      borderStyle: 'solid',

      borderTop: 'none',
      borderWidth: `0 ${size / 2}px ${size / 2}px ${size / 2}px`,
      borderColor: `transparent transparent ${color} transparent`,
    })}
  >
    {children}
  </div>
)
