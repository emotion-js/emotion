import { ReactElement } from 'react'
import { LiveProvider, LiveError, LivePreview, LiveEditor } from 'react-live'
import dracula from 'prism-react-renderer/themes/dracula'
import { css } from '@emotion/react'
import { colors } from '../../util'

const borderRadius = '0.5rem'

const theCss = {
  container: css({
    display: 'flex'
  }),

  editor: css({
    flex: 1,

    borderStartStartRadius: borderRadius,
    borderEndStartRadius: borderRadius
  }),

  rightColumn: css({
    flex: 1,
    padding: '1rem',

    border: `1px solid ${colors.grayBorder}`,
    borderLeftStyle: 'none',
    borderStartEndRadius: borderRadius,
    borderEndEndRadius: borderRadius
  }),

  error: css({
    marginBottom: 0,
    color: colors.danger
  }),

  preview: css({
    flex: 1,
    padding: '1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:empty': {
      display: 'none'
    }
  })
}

interface LiveEditorProps {
  code: string
  language: 'jsx' | 'tsx'
}

export function EmotionLiveEditor({
  code,
  language
}: LiveEditorProps): ReactElement {
  return (
    <div css={theCss.container}>
      <LiveProvider code={code} language={language} noInline>
        <LiveEditor theme={dracula} css={theCss.editor} />
        <LiveError css={[theCss.rightColumn, theCss.error]} />
        <LivePreview css={[theCss.rightColumn, theCss.preview]} />
      </LiveProvider>
    </div>
  )
}
