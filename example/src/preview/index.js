/* eslint-disable jsx-quotes */
// https://raw.githubusercontent.com/FormidableLabs/component-playground/master/src/components/preview.jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { registerPlugin, transform } from 'babel-standalone'
import styled from 'emotion/react'

const ric = window.requestIdleCallback || window.requestAnimationFrame

registerPlugin('emotion/babel', require('emotion/babel'))

const PreviewContent = styled('div')`
  display: flex;
  flex: 1 1 ${props => props.basis || 'auto'};
`

const PreviewWrapper = styled(PreviewContent)`
  position: relative;
  flex: 1 1 30%;

  & .preview-display {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const ErrorWrapper = styled(PreviewContent)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 4px;
  height: 100%;
  white-space: pre;
  color: #c92a2a;
  background: #f8f9fa;
  font-size: 0.65rem;
`

class Preview extends Component {
  static defaultProps = {
    previewComponent: 'div'
  }

  static propTypes = {
    code: PropTypes.string.isRequired,
    scope: PropTypes.object.isRequired,
    previewComponent: PropTypes.node,
    noRender: PropTypes.bool,
    context: PropTypes.object
  }

  state = {
    error: null
  }

  _compileCode = () => {
    const { code, context, noRender, scope } = this.props
    const generateContextTypes = c => {
      return `{ ${Object.keys(c)
        .map(val => `${val}: React.PropTypes.any.isRequired`)
        .join(', ')} }`
    }

    if (noRender) {
      return transform(
        `
        ((${Object.keys(scope).join(', ')}, mountNode) => {
          class Comp extends React.Component {

            getChildContext() {
              return ${JSON.stringify(context)};
            }

            render() {
              return (
                ${code}
              );
            }
          }

          Comp.childContextTypes = ${generateContextTypes(context)};

          return Comp;
        });
      `,
        {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            ['emotion/babel', { inline: true, autoImportCssProp: false }]
          ]
        }
      ).code
    } else {
      return transform(
        `
        ((${Object.keys(scope).join(',')}, mountNode) => {
          ${code}
        });
      `,
        {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            ['emotion/babel', { inline: true, autoImportCssProp: false }]
          ]
        }
      ).code
    }
  }

  _setTimeout = (...args) => {
    clearTimeout(this.timeoutID) // eslint-disable-line no-undef
    this.timeoutID = setTimeout.apply(null, args) // eslint-disable-line no-undef
  }

  _executeCode = () => {
    const mountNode = this.refs.mount
    const { scope } = this.props
    const tempScope = []

    try {
      Object.keys(scope).forEach(s => tempScope.push(scope[s]))
      tempScope.push(mountNode)
      const compiledCode = this._compileCode()
      // eslint-disable-next-line no-eval
      eval(compiledCode).apply(null, tempScope)
      /* eslint-enable no-eval, max-len */

      this.setState({ error: null })
    } catch (err) {
      this._setTimeout(() => {
        this.setState({ error: err.toString() })
      }, 500)
    }
  }

  componentDidMount = () => {
    ric(this._executeCode)
  }

  componentDidUpdate = prevProps => {
    clearTimeout(this.timeoutID) //eslint-disable-line
    if (this.props.code !== prevProps.code) {
      ric(this._executeCode)
    }
  }

  render() {
    const { error } = this.state
    return (
      <PreviewWrapper>
        <div ref="mount" className="preview-display" />
        {error !== null ? <ErrorWrapper>{error}</ErrorWrapper> : null}
      </PreviewWrapper>
    )
  }
}

export default Preview
