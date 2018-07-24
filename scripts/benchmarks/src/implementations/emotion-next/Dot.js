/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Dot = ({ size, x, y, children, color }) => (
  <div
    css={css(styles.root, {
      borderBottomColor: color,
      borderRightWidth: `${size / 2}px`,
      borderBottomWidth: `${size / 2}px`,
      borderLeftWidth: `${size / 2}px`,
      marginLeft: `${x}px`,
      marginTop: `${y}px`
    })}
  >
    {children}
  </div>
)

const styles = {
  root: css({
    position: 'absolute',
    cursor: 'pointer',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    transform: 'translate(50%, 50%)'
  })
}

export default Dot
