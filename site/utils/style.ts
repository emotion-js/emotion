import { css } from '@emotion/react'

export const colors = {
  pink: '#D26AC2',
  //   blue: '#46C9E5',
  //   yellow: '#FFCA2A',
  //   dark: '#1D2029',
  //   reallyLightPink: '#f9e9fb',
  hightlight: '#C43BAD'
  //   border: '#C865B9',
  //   bg: '#FAF9FA',
  //   color: '#1B1D1D',
  //   parentBg: '#FBF8FD'
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

const breakpoints = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }

export const mediaQueries = {
  smUp: `@media (min-width: ${breakpoints.sm}px)`,
  mdUp: `@media (min-width: ${breakpoints.md}px)`,
  lgUp: `@media (min-width: ${breakpoints.lg}px)`,
  xlUp: `@media (min-width: ${breakpoints.xl}px)`,
  xxlUp: `@media (min-width: ${breakpoints.xxl}px)`
}
