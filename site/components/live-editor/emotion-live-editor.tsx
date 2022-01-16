import { ReactElement } from 'react'
import {
  LiveProvider,
  LiveError,
  LivePreview,
  LiveEditor,
  Scope
} from './components'
import { css } from '@emotion/react'
import { colors, mediaQueries, styleConstants } from '../../util'
import { compile } from './compiler'

const scope: Scope = {
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

      // Not used unless the user adds a jsxImportSource directive
      case 'react/jsx-runtime':
        return require('react/jsx-runtime')

      default:
        throw new Error(`Module "${moduleName}" not found.`)
    }
  }
}

const borderRadius = '0.5rem'

const theCss = {
  container: css({
    [mediaQueries.mdUp]: {
      display: 'flex'
    }
  }),

  editor: css({
    backgroundColor: 'rgb(40, 41, 54)', // Copied from Prism theme
    caretColor: 'white',

    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,

    [mediaQueries.mdUp]: {
      width: '50%',
      borderBottomLeftRadius: borderRadius,
      borderTopRightRadius: 0
    }
  }),

  result: css({
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',

    border: `1px solid ${colors.grayBorder}`,
    borderTopStyle: 'none',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,

    [mediaQueries.mdUp]: {
      width: '50%',
      borderTopStyle: 'solid',
      borderLeftStyle: 'none',
      borderTopRightRadius: borderRadius,
      borderBottomLeftRadius: 0
    }
  }),

  label: css({
    textAlign: 'center',
    fontSize: styleConstants.fontSizeSm,
    color: colors.gray500
  }),

  error: css({
    flex: '1',
    padding: '0.5rem',
    marginBottom: 0,
    color: colors.danger
  }),

  preview: css({
    flex: 1,
    padding: '0.5rem 0.5rem 1.5rem 0.5rem',
    overflowX: 'auto',

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
}

export function EmotionLiveEditor({ code }: LiveEditorProps): ReactElement {
  return (
    <div className="emotion-live-editor">
      <div css={theCss.container}>
        <LiveProvider defaultCode={code} transformCode={compile} scope={scope}>
          <LiveEditor css={theCss.editor} />
          <div css={theCss.result}>
            <LiveError css={theCss.error} />
            <LivePreview css={theCss.preview} />
            <div css={theCss.label}>(Edit code to see changes)</div>
          </div>
        </LiveProvider>
      </div>
    </div>
  )
}
