/* eslint-disable jsx-quotes */
// https://raw.githubusercontent.com/FormidableLabs/component-playground/master/src/components/playground.jsx
/* eslint no-unused-vars:0 */
// import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor from 'component-playground/lib/components/editor'
import Preview from '../preview'
import { css } from 'emotion'
import styled from 'emotion/react'
import colors from 'open-color'

const dracula = css`
  & .cm-s-dracula.CodeMirror,
  .cm-s-dracula .CodeMirror-gutters {
    background-color: #282a36 !important;
    color: #f8f8f2 !important;
    border: none;
  }

  & .cm-s-dracula .CodeMirror-gutters {
    color: #282a36;
  }

  & .cm-s-dracula .CodeMirror-cursor {
    border-left: solid thin #f8f8f2 !important;
  }

  & .cm-s-dracula .CodeMirror-linenumber {
    color: #6d8a88;
  }

  & .cm-s-dracula .CodeMirror-selected {
    background: rgba(255, 255, 255, 0.1);
  }

  & .cm-s-dracula .CodeMirror-line::selection,
  .cm-s-dracula .CodeMirror-line > span::selection,
  .cm-s-dracula .CodeMirror-line > span > span::selection {
    background: rgba(255, 255, 255, 0.1);
  }

  & .cm-s-dracula .CodeMirror-line::-moz-selection,
  .cm-s-dracula .CodeMirror-line > span::-moz-selection,
  .cm-s-dracula .CodeMirror-line > span > span::-moz-selection {
    background: rgba(255, 255, 255, 0.1);
  }

  & .cm-s-dracula span.cm-comment {
    color: #6272a4;
  }

  & .cm-s-dracula span.cm-string,
  .cm-s-dracula span.cm-string-2 {
    color: #f1fa8c;
  }

  & .cm-s-dracula span.cm-number {
    color: #bd93f9;
  }

  & .cm-s-dracula span.cm-variable {
    color: #50fa7b;
  }

  & .cm-s-dracula span.cm-variable-2 {
    color: white;
  }

  & .cm-s-dracula span.cm-def {
    color: #50fa7b;
  }

  & .cm-s-dracula span.cm-operator {
    color: #ff79c6;
  }

  & .cm-s-dracula span.cm-keyword {
    color: #ff79c6;
  }

  & .cm-s-dracula span.cm-atom {
    color: #bd93f9;
  }

  & .cm-s-dracula span.cm-meta {
    color: #f8f8f2;
  }

  & .cm-s-dracula span.cm-tag {
    color: #ff79c6;
  }

  & .cm-s-dracula span.cm-attribute {
    color: #50fa7b;
  }

  & .cm-s-dracula span.cm-qualifier {
    color: #50fa7b;
  }

  & .cm-s-dracula span.cm-property {
    color: #66d9ef;
  }

  & .cm-s-dracula span.cm-builtin {
    color: #50fa7b;
  }

  & .cm-s-dracula span.cm-variable-3,
  .cm-s-dracula span.cm-type {
    color: #ffb86c;
  }

  & .cm-s-dracula .CodeMirror-activeline-background {
    background: rgba(255, 255, 255, 0.1);
  }

  & .cm-s-dracula .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: white !important;
  }
`

const PlaygroundContent = styled('div')`
  ${dracula};
  display: flex;
  margin: 0 auto 16px auto;
  padding: 16px 0;
  max-width: 560px;

  & .ReactCodeMirror {
    flex: 1 1 70%;
    & textarea {
      border-radius: 4px;
    }

    & .CodeMirror {
      height: auto;
      border-radius: 4px;
    }
  }
`

class ReactPlayground extends Component {
  static defaultProps = {
    theme: 'dracula',
    noRender: true,
    context: {},
    initiallyExpanded: false
  }

  static propTypes = {
    codeText: PropTypes.string.isRequired,
    scope: PropTypes.object.isRequired,
    collapsableCode: PropTypes.bool,
    docClass: PropTypes.func,
    propDescriptionMap: PropTypes.object,
    theme: PropTypes.string,
    selectedLines: PropTypes.array,
    noRender: PropTypes.bool,
    es6Console: PropTypes.bool,
    context: PropTypes.object,
    initiallyExpanded: PropTypes.bool,
    previewComponent: PropTypes.node
  }

  state = {
    code: this.props.codeText,
    expandedCode: this.props.initiallyExpanded,
    external: true
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      code: nextProps.codeText,
      external: true
    })
  }

  _handleCodeChange = code => {
    this.setState({
      code,
      external: false
    })
  }

  _toggleCode = () => {
    this.setState({
      expandedCode: !this.state.expandedCode
    })
  }

  render() {
    const { code, external, expandedCode } = this.state
    const {
      context,
      docClass,
      es6Console,
      maxHeight,
      noRender,
      previewComponent,
      propDescriptionMap,
      scope,
      selectedLines,
      theme
    } = this.props

    return (
      <PlaygroundContent maxHeight={maxHeight}>
        <Editor
          codeText={code}
          external={external}
          onChange={this._handleCodeChange}
          selectedLines={selectedLines}
          theme={theme}
        />
        <Preview
          context={context}
          code={code}
          scope={scope}
          noRender={noRender}
          previewComponent={previewComponent}
        />
      </PlaygroundContent>
    )
  }
}

export default ReactPlayground
