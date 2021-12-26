export const colors = {
  body: '#212529',
  pink: '#D26AC2',
  //   blue: '#46C9E5',
  //   yellow: '#FFCA2A',
  //   dark: '#1D2029',
  //   reallyLightPink: '#f9e9fb',
  hightlight: '#C43BAD',
  pinkBorder: '#eac3e4',
  grayBorder: '#d2d2d2'
  // border: '#C865B9'
  //   bg: '#FAF9FA',
  //   color: '#1B1D1D',
  //   parentBg: '#FBF8FD'
}

const breakpoints = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }

export const mediaQueries = {
  smUp: `@media (min-width: ${breakpoints.sm}px)`,
  mdUp: `@media (min-width: ${breakpoints.md}px)`,
  lgUp: `@media (min-width: ${breakpoints.lg}px)`,
  xlUp: `@media (min-width: ${breakpoints.xl}px)`,
  xxlUp: `@media (min-width: ${breakpoints.xxl}px)`
}

export const styleConstants = {
  containerWidth: 1100,

  borderRadius: '0.25rem',

  fontSizeSm: '0.875rem'
}
