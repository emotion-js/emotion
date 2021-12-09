import { css } from '@emotion/react/macro'

export default () => {
  return {
    color: css`
      color: hotpink;
    `,
    colorFn1: () => css`
      color: hotpink;
    `,
    colorFn2() {
      return css`
        color: hotpink;
      `
    }
  }
}

export const { useStyles } = {
  useStyles: () => {
    return {
      color: css`
        color: hotpink;
      `,
      colorFn1: () => css`
        color: hotpink;
      `,
      colorFn2() {
        return css`
          color: hotpink;
        `
      }
    }
  }
}
