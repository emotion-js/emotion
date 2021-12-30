import { ReactElement } from 'react'
import {
  LiveProvider,
  LiveError,
  LivePreview,
  LiveEditor,
  EditorProps
} from 'react-live'
import { css } from '@emotion/react'
import { colors, styleConstants } from '../../util'
import { compile } from './compile'

const borderRadius = '0.5rem'

const theCss = {
  container: css({
    display: 'flex'
  }),

  editor: css({
    flex: 1,
    backgroundColor: 'rgb(40, 41, 54)', // Copied from Prism theme
    fontSize: styleConstants.fontSizeSm,

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

const noTheme: EditorProps['theme'] = {
  plain: {},
  styles: []
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
    <div className="emotion-live-editor" css={theCss.container}>
      <LiveProvider
        code={code}
        language={language}
        noInline
        transformCode={compile}
      >
        <LiveEditor css={theCss.editor} theme={noTheme} />
        <LiveError css={[theCss.rightColumn, theCss.error]} />
        <LivePreview css={[theCss.rightColumn, theCss.preview]} />
      </LiveProvider>
    </div>
  )
}
