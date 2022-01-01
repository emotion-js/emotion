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

const scope = {
  process: {
    env: {
      NODE_ENV: process.env.NODE_ENV
    }
  },
  require(moduleName: string) {
    switch (moduleName) {
      case '@emotion/css':
        return require('@emotion/css')
      case '@emotion/cache':
        return require('@emotion/cache')
      case '@emotion/react':
        return require('@emotion/react')
      case '@emotion/react/jsx-runtime':
        return require('@emotion/react/jsx-runtime')
      case '@emotion/styled':
        return require('@emotion/styled')
      case '@emotion/styled/base':
        return require('@emotion/styled/base')
      case '@emotion/is-prop-valid':
        return require('@emotion/is-prop-valid')
      case 'facepaint':
        return require('facepaint')
      default:
        // eslint-disable-next-line no-throw-literal
        throw `Module "${moduleName}" not found.`
    }
  }
}

const borderRadius = '0.5rem'

const theCss = {
  container: css({
    display: 'flex'
  }),

  editor: css({
    flex: 1,
    backgroundColor: 'rgb(40, 41, 54)', // Copied from Prism theme
    caretColor: 'white',
    fontSize: styleConstants.fontSizeSm,

    borderStartStartRadius: borderRadius,
    borderEndStartRadius: borderRadius
  }),

  rightColumn: css({
    flex: 1,
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',

    border: `1px solid ${colors.grayBorder}`,
    borderLeftStyle: 'none',
    borderStartEndRadius: borderRadius,
    borderEndEndRadius: borderRadius
  }),

  label: css({
    textAlign: 'center',
    fontSize: styleConstants.fontSizeSm,
    color: colors.gray500
  }),

  error: css({
    flex: 1,
    padding: '0.5rem',
    marginBottom: 0,
    color: colors.danger
  }),

  preview: css({
    flex: 1,
    padding: '0.5rem',

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
}

export function EmotionLiveEditor({ code }: LiveEditorProps): ReactElement {
  return (
    <div className="emotion-live-editor">
      <div css={theCss.container}>
        <LiveProvider
          code={code}
          language="jsx"
          noInline
          transformCode={compile}
          scope={scope}
        >
          <LiveEditor css={theCss.editor} theme={noTheme} />
          <div css={theCss.rightColumn}>
            <LiveError css={theCss.error} />
            <LivePreview css={theCss.preview} />
            <div css={theCss.label}>(Edit code to see changes)</div>
          </div>
        </LiveProvider>
      </div>
    </div>
  )
}
