import styled, { css } from 'react-emotion'
import { space, width, fontSize, color, responsiveStyle } from 'styled-system'

export const display = responsiveStyle('display')
export const flex = responsiveStyle('flex')
export const order = responsiveStyle('order')
const wrap = responsiveStyle('flex-wrap', 'wrap', 'wrap')
const direction = responsiveStyle('flexDirection', 'direction')
const align = responsiveStyle('alignItems', 'align')
const justify = responsiveStyle('justifyContent', 'justify')
const column = props => (props.column ? css`flex-direction: column;` : null)

export default styled('div')`
  ${display};
  ${space};
  ${width};
  ${fontSize};
  ${color};
  ${flex};
  ${order};
  ${wrap};
  ${column};
  ${direction};
  ${align};
  ${justify};
`
