import { DocSearch } from '@docsearch/react'
import { css, Global } from '@emotion/react'
import { ReactElement } from 'react'
import { colors } from '../util'

const docSearchCustomizationCss = css({
  ':root': {
    '--docsearch-primary-color': colors.pink,
    '--docsearch-searchbox-background': colors.gray100,
    '--docsearch-searchbox-focus-background': colors.gray100
  },

  '.DocSearch-Button': {
    margin: '0 auto 2rem 0',
    width: '100%',
    border: `1px solid ${colors.grayBorder}`,

    '&:hover': {
      borderColor: 'transparent'
    }
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
