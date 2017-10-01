import styled from 'react-emotion'
import {
  space,
  width,
  fontSize,
  color,
  responsiveStyle,
  flex
} from 'styled-system'

export const display = responsiveStyle('display')
export const order = responsiveStyle('order')
const wrap = responsiveStyle('flexWrap', 'wrap', 'wrap')
const direction = responsiveStyle('flexDirection', 'direction')
const align = responsiveStyle('alignItems', 'align')
const justify = responsiveStyle('justifyContent', 'justify')
const column = props => (props.column ? 'flex-direction:column;' : null)

export default styled.div(
  undefined,
  display,
  space,
  width,
  fontSize,
  color,
  flex,
  order,
  wrap,
  column,
  direction,
  align,
  justify
)
