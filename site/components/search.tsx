import { DocSearch } from '@docsearch/react'
import { css, Global } from '@emotion/react'
import { ReactElement } from 'react'

const docSearchCustomizationCss = css({
  '.DocSearch-Button': {
    margin: '0 auto 2rem 0',
    width: '100%'
  },

  // Display the "Search" placeholder regardless of screen width
  '.DocSearch-Button-Placeholder': {
    display: 'block !important'
  }
})

export function Search(): ReactElement {
  return (
    <>
      <Global styles={docSearchCustomizationCss} />
      <DocSearch
        appId="12939UANWC"
        apiKey="a1728a14089135f149b2997e1fb14cf0"
        indexName="emotion_sh"
      />
    </>
  )
}
