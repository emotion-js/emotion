// @flow
import { css } from 'emotion'
import facepaint from 'facepaint'
import { util, constants } from 'styled-system'

export const animatedUnderline = css`
  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 4px;
    height: 4px;
    transition: transform 250ms ease;
    transform: scaleX(0);
    background-color: hotpink;
  }
  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`

export const mq = facepaint(constants.breakpoints.map(util.mq))

export const colors = {
  pink: '#D26AC2',
  blue: '#46C9E5',
  yellow: '#FFCA2A',
  dark: '#1D2029'
}

export const fonts = {
  primary: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`
}
export { default as openColors } from 'open-color'
export {
  space,
  width,
  fontSize,
  color,
  style,
  responsiveStyle,
  pseudoStyle,
  textAlign,
  fontWeight,
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  alignSelf,
  borderRadius,
  borderColor,
  borderWidth,
  boxShadow,
  hover,
  focus,
  active,
  disabled,
  theme,
  propTypes,
  cleanElement,
  removeProps,
  util,
  constants
} from 'styled-system'
