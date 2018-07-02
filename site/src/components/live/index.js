// @flow
import * as React from 'react'
import type { Compiler, Scope } from './types'
import { compileAndEvaluate, evaluate } from './compile'
export { default as compile } from './compiler'
export { default as Editor } from 'react-live/lib/components/Editor'

type Props = {
  code: string,
  compile: Compiler,
  render: (...args: *) => React.Node,
  scope: Scope,
  initial: string
}

type State = {
  code: string,
  element: React.Node | null,
  error: Error | null
}

export default class Live extends React.Component<Props, State> {
  constructor(...args: *) {
    super(...args)
    this.state = {
      code: this.props.code,
      ...evaluate(this.props.initial, this.props.scope)
    }
  }
  static defaultProps = {
    code: '',
    mountStylesheet: true,
    noInline: false
  }

  onChange = (code: string) => {
    this.compile(code, this.props.compile, this.props.scope)
  }

  compile = (code: string, compiler: Compiler, scope: Scope) => {
    if (code !== this.state.code) {
      this.setState({ code })
    }
    compileAndEvaluate(code, compiler, scope)
      .then(ret => {
        this.setState(ret)
      })
      .catch(err => {
        this.setState({ error: err, element: null })
      })
  }

  onError = (error: Error) => {
    this.setState({ error })
  }

  componentWillReceiveProps({ code, scope, compile }: Props) {
    if (
      code !== this.props.code ||
      scope !== this.props.scope ||
      compile !== this.props.compile
    ) {
      this.compile(code, compile, scope)
    }
  }

  render() {
    return this.props.render({
      onError: this.onError,
      onChange: this.onChange,
      code: this.state.code,
      error: this.state.error,
      element: this.state.element
    })
  }
}

type ErrorBoundaryProps = {
  children: React.Node,
  onError: Error => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(err: Error) {
    this.props.onError(err)
  }
  render() {
    return this.props.children
  }
}
