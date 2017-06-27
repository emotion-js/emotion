/* eslint-disable jsx-quotes,no-useless-escape */
// https://raw.githubusercontent.com/FormidableLabs/component-playground/master/src/components/playground.jsx
/* eslint no-unused-vars:0 */
// import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live/lib'
import styled from 'emotion/styled'
import colors from 'open-color'
import 'prismjs/components/prism-css'
import Prism from 'prismjs'

// https://github.com/styled-components/styled-components-website/blob/master/utils/prismTemplateString.js
Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    pattern: /(styled(\.\w+|\([^\)]*\))(\.\w+(\([^\)]*\))*)*|css|injectGlobal|keyframes|\.extend)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
    lookbehind: true,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.jsx
        }
      },
      string: {
        pattern: /[\s\S]+/,
        inside: Prism.languages.css,
        alias: 'language-css'
      }
    }
  }
})

const Editor = styled(LiveEditor)`
  overflow: auto;
  flex:1;
  display:flex;
  flex-direction:column;
  min-width: 48vw;
  & > div { flex: 1;
`

const PreviewContainer = styled('div')`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  -webkit-overflow-scrolling: touch;
  overflow:auto;
  @media(min-width: 680px) {
    padding: 32px 48px;
  }
`

const Content = styled(LiveProvider)`
  flex: 1 1 auto;
  display: flex;
`

class ReactPlayground extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object.isRequired
  }

  render () {
    const {
      code,
      scope
    } = this.props

    return (
      <Content scope={scope} code={code} noInline>
        <Editor />
        <PreviewContainer>
          <LiveError />
          <LivePreview />
        </PreviewContainer>
      </Content>
    )
  }
}

export default ReactPlayground
