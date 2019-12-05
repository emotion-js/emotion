import { css } from 'emotion/macro'

function test() {
  const cls1 = css`
    font-size: 20px;
    @media (min-width: 420px) {
      color: blue;
      ${css`
        width: 96px;
        height: 96px;
      `};
      line-height: 26px;
    }
    background: green;
    ${{ backgroundColor: 'hotpink' }};
  `

  const cls2 = css`
    ${{ color: 'blue' }};
  `

  const cls3 = css`
    display: flex;
    &:hover {
      color: hotpink;
    }
  `
  let outerVar = 'something'
  function inner() {
    const styles = { color: 'darkorchid' }
    const color = 'aquamarine'

    const cls4 = css`
      ${cls3};
      ${cls1};
      ${{ color: 'darkorchid' }};
      ${{ color }};
      ${css`
        height: 420px;
        width: ${styles};
      `};
    `
    let someCls = css`
      color: ${outerVar};
    `
  }
}
