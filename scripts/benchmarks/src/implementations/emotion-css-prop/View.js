/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const View = ({ style, ...other }) => {
  return <div {...other} css={css(viewStyle, style)} />
}

export const viewStyle = css({
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0
})

export default View
