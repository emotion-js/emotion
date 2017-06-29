/* eslint-disable jsx-quotes */
// https://raw.githubusercontent.com/FormidableLabs/component-playground/master/src/components/playground.jsx
/* eslint no-unused-vars:0 */
// import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor from 'component-playground/lib/components/editor'
import Preview from '../preview'
import styled from 'emotion/styled'
import colors from 'open-color'

const PlaygroundContent = styled('div')`
  display: flex;
  margin: 0 auto 16px auto;
  padding: 16px 0;
  max-width: 560px;
  
  & .ReactCodeMirror {
    flex: 1 1 70%;
    & textarea {
      border-radius: 4px;
    }
    
    .CodeMirror {
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

  render () {
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
