/** @jsx jsx */
import { viewStyle } from './View'
import { css, jsx } from '@emotion/core'

const Box = ({
  color,
  fixed = false,
  layout = 'column',
  outer = false,
  ...other
}) => (
  <div
    {...other}
    css={css(
      viewStyle,
      styles[`color${color}`],
      fixed && styles.fixed,
      layout === 'row' && styles.row,
      outer && styles.outer
    )}
  />
)

const styles = {
  outer: css({
    alignSelf: 'flex-start',
    padding: 4
  }),
  row: css({
    flexDirection: 'row'
  }),
  color0: css({
    backgroundColor: '#14171A'
  }),
  color1: css({
    backgroundColor: '#AAB8C2'
  }),
  color2: css({
    backgroundColor: '#E6ECF0'
  }),
  color3: css({
    backgroundColor: '#FFAD1F'
  }),
  color4: css({
    backgroundColor: '#F45D22'
  }),
  color5: css({
    backgroundColor: '#E0245E'
  }),
  fixed: css({
    width: 6,
    height: 6
  })
}

export default Box
