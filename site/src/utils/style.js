// @flow
import { css } from '@emotion/core'
import facepaint from 'facepaint'
import { util, constants } from 'styled-system'
import darken from 'polished/lib/color/darken'
import lighten from 'polished/lib/color/lighten'

export const colors = {
  pink: '#D26AC2',
  blue: '#46C9E5',
  yellow: '#FFCA2A',
  dark: '#1D2029',
  darken,
  lighten,
  darken1: darken(0.1),
  darken2: darken(0.15),
  darken3: darken(0.2),
  reallyLightPink: '#f9e9fb',
  hightlight: '#C43BAD',
  border: '#C865B9',
  bg: '#FAF9FA',
  color: '#1B1D1D',
  parentBg: '#FBF8FD'
}

export const animatedUnderline = css`
  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 2px;
    height: 2px;
    transition: transform 250ms ease;
    transform: scaleX(0);
    background-color: ${colors.hightlight};
  }
  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`

export const mq = facepaint(constants.breakpoints.map(util.mq))

export const p = facepaint([':hover,:focus', ':active', ':visited'])

export const fonts = {
  primary: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
  code: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace'
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
