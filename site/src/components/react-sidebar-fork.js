// https://github.com/balloob/react-sidebar/blob/master/src/sidebar.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollContainer } from 'gatsby-react-router-scroll'

const CANCEL_DISTANCE_ON_SCROLL = 20

const defaultStyles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto'
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out'
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // the detected width of the sidebar in pixels
      sidebarWidth: props.defaultSidebarWidth,

      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchStartY: null,
      touchCurrentX: null,
      touchCurrentY: null,

      // if touch is supported by the browser
      dragSupported: false
    }

    this.overlayClicked = this.overlayClicked.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.saveSidebarRef = this.saveSidebarRef.bind(this)
  }

  componentDidMount() {
    this.setState({
      dragSupported: typeof window === 'object' && 'ontouchstart' in window
    })
    this.saveSidebarWidth()
  }

  componentDidUpdate() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarWidth()
    }
  }

  onTouchStart(ev) {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0]
      this.setState({
        touchIdentifier: touch.identifier,
        touchStartX: touch.clientX,
        touchStartY: touch.clientY,
        touchCurrentX: touch.clientX,
        touchCurrentY: touch.clientY
      })
    }
  }

  onTouchMove(ev) {
    if (this.isTouching()) {
      for (let ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.setState({
            touchCurrentX: ev.targetTouches[ind].clientX,
            touchCurrentY: ev.targetTouches[ind].clientY
          })
          break
        }
      }
    }
  }

  onTouchEnd() {
    if (this.isTouching()) {
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      const touchWidth = this.touchSidebarWidth()

      if (
        (this.props.open &&
          touchWidth <
            this.state.sidebarWidth - this.props.dragToggleDistance) ||
        (!this.props.open && touchWidth > this.props.dragToggleDistance)
      ) {
        this.props.onSetOpen(!this.props.open)
      }

      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchStartY: null,
        touchCurrentX: null,
        touchCurrentY: null
      })
    }
  }

  // This logic helps us prevents the user from sliding the sidebar horizontally
  // while scrolling the sidebar vertically. When a scroll event comes in, we're
  // cancelling the ongoing gesture if it did not move horizontally much.
  onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchStartY: null,
        touchCurrentX: null,
        touchCurrentY: null
      })
    }
  }

  // True if the on going gesture X distance is less than the cancel distance
  inCancelDistanceOnScroll() {
    let cancelDistanceOnScroll

    if (this.props.pullRight) {
      cancelDistanceOnScroll =
        Math.abs(this.state.touchCurrentX - this.state.touchStartX) <
        CANCEL_DISTANCE_ON_SCROLL
    } else {
      cancelDistanceOnScroll =
        Math.abs(this.state.touchStartX - this.state.touchCurrentX) <
        CANCEL_DISTANCE_ON_SCROLL
    }
    return cancelDistanceOnScroll
  }

  isTouching() {
    return this.state.touchIdentifier !== null
  }

  overlayClicked() {
    if (this.props.open) {
      this.props.onSetOpen(false)
    }
  }

  saveSidebarWidth() {
    const width = this.sidebar.offsetWidth

    if (width !== this.state.sidebarWidth) {
      this.setState({ sidebarWidth: width })
    }
  }

  saveSidebarRef(node) {
    this.sidebar = node
  }

  // calculate the sidebarWidth based on current touch info
  touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.props.pullRight) {
      if (
        this.props.open &&
        window.innerWidth - this.state.touchStartX < this.state.sidebarWidth
      ) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return (
            this.state.sidebarWidth +
            this.state.touchStartX -
            this.state.touchCurrentX
          )
        }
        return this.state.sidebarWidth
      }
      return Math.min(
        window.innerWidth - this.state.touchCurrentX,
        this.state.sidebarWidth
      )
    }

    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      if (this.state.touchCurrentX > this.state.touchStartX) {
        return this.state.sidebarWidth
      }
      return (
        this.state.sidebarWidth -
        this.state.touchStartX +
        this.state.touchCurrentX
      )
    }
    return Math.min(this.state.touchCurrentX, this.state.sidebarWidth)
  }

  render() {
    const sidebarStyle = {
      ...defaultStyles.sidebar,
      ...this.props.styles.sidebar
    }
    const contentStyle = {
      ...defaultStyles.content,
      ...this.props.styles.content
    }
    const overlayStyle = {
      ...defaultStyles.overlay,
      ...this.props.styles.overlay
    }
    const useTouch = this.state.dragSupported && this.props.touch
    const isTouching = this.isTouching()
    const rootProps = {
      className: this.props.rootClassName,
      style: { ...defaultStyles.root, ...this.props.styles.root },
      role: 'navigation'
    }
    let dragHandle

    // sidebarStyle right/left
    if (this.props.pullRight) {
      sidebarStyle.right = 0
      sidebarStyle.transform = 'translateX(100%)'
      sidebarStyle.WebkitTransform = 'translateX(100%)'
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)'
      }
    } else {
      sidebarStyle.left = 0
      sidebarStyle.transform = 'translateX(-100%)'
      sidebarStyle.WebkitTransform = 'translateX(-100%)'
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)'
      }
    }

    if (isTouching) {
      const percentage = this.touchSidebarWidth() / this.state.sidebarWidth

      // slide open to what we dragged
      if (this.props.pullRight) {
        sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`
        sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`
      } else {
        sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`
        sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`
      }

      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage
      overlayStyle.visibility = 'visible'
    } else if (this.props.docked) {
      // show sidebar
      if (this.state.sidebarWidth !== 0) {
        sidebarStyle.transform = `translateX(0%)`
        sidebarStyle.WebkitTransform = `translateX(0%)`
      }

      // make space on the left/right side of the content for the sidebar
      if (this.props.pullRight) {
        contentStyle.right = `${this.state.sidebarWidth}px`
      } else {
        contentStyle.left = `${this.state.sidebarWidth}px`
      }
    } else if (this.props.open) {
      // slide open sidebar
      sidebarStyle.transform = `translateX(0%)`
      sidebarStyle.WebkitTransform = `translateX(0%)`

      // show overlay
      overlayStyle.opacity = 1
      overlayStyle.visibility = 'visible'
    }

    if (this.props.docked || isTouching || !this.props.transitions) {
      sidebarStyle.transition = 'none'
      sidebarStyle.WebkitTransition = 'none'
      contentStyle.transition = 'none'
      overlayStyle.transition = 'none'
    }

    if (useTouch) {
      if (this.props.open) {
        rootProps.onTouchStart = this.onTouchStart
        rootProps.onTouchMove = this.onTouchMove
        rootProps.onTouchEnd = this.onTouchEnd
        rootProps.onTouchCancel = this.onTouchEnd
        rootProps.onScroll = this.onScroll
      } else {
        const dragHandleStyle = {
          ...defaultStyles.dragHandle,
          ...this.props.styles.dragHandle
        }
        dragHandleStyle.width = this.props.touchHandleWidth

        // dragHandleStyle right/left
        if (this.props.pullRight) {
          dragHandleStyle.right = 0
        } else {
          dragHandleStyle.left = 0
        }

        dragHandle = (
          <div
            style={dragHandleStyle}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
          />
        )
      }
    }

    return (
      <div {...rootProps}>
        <div
          className={this.props.sidebarClassName}
          style={sidebarStyle}
          ref={this.saveSidebarRef}
        >
          {this.props.sidebar}
        </div>
        <div
          className={this.props.overlayClassName}
          style={overlayStyle}
          role="presentation"
          tabIndex="0"
          onClick={this.overlayClicked}
        />
        <ScrollContainer scrollKey="some-key">
          <div className={this.props.contentClassName} style={contentStyle}>
            {dragHandle}
            {this.props.children}
          </div>
        </ScrollContainer>
      </div>
    )
  }
}

Sidebar.propTypes = {
  // main content to render
  children: PropTypes.node.isRequired,

  // styles
  styles: PropTypes.shape({
    root: PropTypes.object,
    sidebar: PropTypes.object,
    content: PropTypes.object,
    overlay: PropTypes.object,
    dragHandle: PropTypes.object
  }),

  // root component optional class
  rootClassName: PropTypes.string,

  // sidebar optional class
  sidebarClassName: PropTypes.string,

  // content optional class
  contentClassName: PropTypes.string,

  // overlay optional class
  overlayClassName: PropTypes.string,

  // sidebar content to render
  sidebar: PropTypes.node.isRequired,

  // boolean if sidebar should be docked
  docked: PropTypes.bool,

  // boolean if sidebar should slide open
  open: PropTypes.bool,

  // boolean if transitions should be disabled
  transitions: PropTypes.bool,

  // boolean if touch gestures are enabled
  touch: PropTypes.bool,

  // max distance from the edge we can start touching
  touchHandleWidth: PropTypes.number,

  // Place the sidebar on the right
  pullRight: PropTypes.bool,

  // Enable/Disable sidebar shadow
  shadow: PropTypes.bool,

  // distance we have to drag the sidebar to toggle open state
  dragToggleDistance: PropTypes.number,

  // callback called when the overlay is clicked
  onSetOpen: PropTypes.func,

  // Intial sidebar width when page loads
  defaultSidebarWidth: PropTypes.number
}

Sidebar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  touch: true,
  touchHandleWidth: 20,
  pullRight: false,
  shadow: true,
  dragToggleDistance: 30,
  onSetOpen: () => {},
  styles: {},
  defaultSidebarWidth: 0
}

export default Sidebar
