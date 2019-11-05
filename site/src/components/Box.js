// @flow
import styled from '@emotion/styled'
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
const overflow = responsiveStyle('overflow', 'overflow')
const column = props => (props.column ? 'flex-direction:column;' : null)

/**
 * This is an optimized version of
 *
 * export default styled.div`
 *   ${display};
 *   ${space};
 *   ${width};
 *   ${fontSize};
 *   ${color};
 *   ${flex};
 *   ${order};
 *   ${wrap};
 *   ${column};
 *   ${direction};
 *   ${align};
 *   ${justify};
 * `
 */
type Props = $Shape<{
  className: ?string,
  flex: number | string,
  children: React$Node,
  direction: Array<string>,
  css: { [string]: number | string },
  display: string,
  fontSize: string | number,
  justify: string,
  align: string
}>
const Box = styled.div<Props>(
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
  justify,
  overflow
)

export default Box
