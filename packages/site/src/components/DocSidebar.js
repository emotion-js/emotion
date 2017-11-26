// @flow
import React from 'react'
import Sidebar from 'react-sidebar'

const mql = window.matchMedia(`(min-width: 900px)`)

type State = {
  docked: boolean,
  open: boolean
}

type RenderProps = State & {
  setSidebarOpenState: (state: boolean) => void
}

type Props = {
  renderSidebar: RenderProps => React$Node,
  renderContent: RenderProps => React$Node,
  styles?: Object
}

export default class DocSidebar extends React.Component<Props, State> {
  state = {
    docked: true || mql.matches,
    open: false
  }
  onSetSidebarOpen = (open: boolean) => {
    this.setState({ open })
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)

    this.setState({ docked: mql.matches })
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged = (e: MediaQueryListEvent) => {
    this.setState({ docked: e.matches })
  }

  render() {
    const { renderSidebar, renderContent, ...otherProps } = this.props
    const renderProps = {
      ...this.state,
      setSidebarOpenState: this.onSetSidebarOpen
    }
    return (
      <Sidebar
        sidebar={this.props.renderSidebar(renderProps)}
        open={this.state.open}
        docked={this.state.docked}
        onSetOpen={this.onSetSidebarOpen}
        shadow={false}
        pullRight
        {...otherProps}
      >
        {this.props.renderContent(renderProps)}
      </Sidebar>
    )
  }
}
