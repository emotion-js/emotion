/** @jsx jsx */
import { jsx, Global } from '@emotion/react/macro'

const css1 = (theme) => ({ backgroundColor: theme.bgColor })
const css2 = (theme) => ({ padding: theme.spacing.small })

function SomeComponent(props) {
  return <div css={[css1, css2]}>{'Emotion'}</div>
}
