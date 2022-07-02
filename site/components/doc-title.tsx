import { ReactElement } from 'react'
import { styleConstants } from '../util'

interface DocTitleProps {
  title: string
  slug: string
}

export function DocTitle({ title, slug }: DocTitleProps): ReactElement {
  let editUrl

  if (slug.startsWith('@emotion/')) {
    const packageName = slug.replace('@emotion/', '')
    editUrl = `https://github.com/emotion-js/emotion/edit/main/packages/${packageName}/README.md`
  } else {
    editUrl = `https://github.com/emotion-js/emotion/edit/main/docs/${slug}.mdx`
  }

  return (
    <div css={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <h1
        css={{
          margin: 0,
          fontWeight: 700
        }}
      >
        {title}
      </h1>
      <a
        css={{
          marginLeft: 'auto',
          fontSize: styleConstants.fontSizeSm,
          fontWeight: 'normal !important' as any
        }}
        href={editUrl}
      >
        ✏️ <span css={{ marginLeft: '0.25rem' }}>Edit this page</span>
      </a>
    </div>
  )
}
