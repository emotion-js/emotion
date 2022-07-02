import { DocSearch } from '@docsearch/react'
import { css, Global } from '@emotion/react'
import { ReactElement } from 'react'

const docSearchCustomizationCss = css({
  '.DocSearch-Button': {
    margin: '0 auto 2rem 0'
  }
})

// This is causing a hydration warning. Reported here: https://github.com/algolia/docsearch/issues/1242
export function Search(): ReactElement {
  return (
    <>
      <Global styles={docSearchCustomizationCss} />
      <DocSearch
        indexName="emotion_sh"
        apiKey="d160789a17f10ba962c4bce1b298fbbb"
      />
    </>
  )
}
