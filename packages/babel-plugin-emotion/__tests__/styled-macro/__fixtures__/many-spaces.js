import styled from '@emotion/styled/macro'

function cssStyleGetter(input) {
  input = input / 4
  return input
}

const PageBox = styled.div`
  height: calc(
    100% -
      ${p => {
        const absoluteValue = cssStyleGetter(100)
        return 2 * absoluteValue + 4
      }}
  );
  width: calc(
    100% -
      ${p => {
        const absoluteValue = cssStyleGetter(80)
        return 2 * absoluteValue + 8
      }}
  );
`

export default PageBox
