// @flow
import * as React from 'react'
import Sidebar from 'react-sidebar'

let mql: MediaQueryList | void
if (typeof window !== 'undefined') {
  mql = window.matchMedia(`(min-width: 900px)`)
}

type State = {
  docked: boolean,
  open: boolean,
}

type RenderProps = State & {
  setSidebarOpenState: (state: boolean) => void,
}

type Props = {
  renderSidebar: RenderProps => React.Node,
  renderContent: RenderProps => React.Node,
  renderOutside: RenderProps => React.Node,
  styles?: Object,
}

export default class DocSidebar extends React.Component<Props, State> {
  state = {
    docked: true || (mql && mql.matches),
    open: false,
  }
  onSetSidebarOpen = (open: boolean) => {
    this.setState({ open })
  }

  componentWillMount() {
    if (mql !== undefined) {
      mql.addListener(this.mediaQueryChanged)

      this.setState({ docked: mql.matches })
    }
  }

  componentWillUnmount() {
    if (mql !== undefined) {
      mql.removeListener(this.mediaQueryChanged)
    }
  }

  mediaQueryChanged = (e: MediaQueryListEvent) => {
    this.setState({ docked: e.matches })
  }

  render() {
    const { renderSidebar, renderContent, ...otherProps } = this.props
    const renderProps = {
      ...this.state,
      setSidebarOpenState: this.onSetSidebarOpen,
    }
    return (
      <div>
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
        {this.props.renderOutside(renderProps)}
      </div>
    )
  }
}
