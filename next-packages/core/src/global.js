// @flow
import * as React from 'react'
import { withCSSContext } from './context'
import { isBrowser, type CSSContextType } from '@emotion/utils'
import { StyleSheet } from '@emotion/sheet'
import { serializeStyles } from '@emotion/serialize'

type GlobalProps = {
  styles: Object | Array<Object>
}

export let Global: React.StatelessFunctionalComponent<
  GlobalProps
> = /* #__PURE__ */ withCSSContext((props: GlobalProps, context) => {
  return <InnerGlobal styles={props.styles} context={context} />
})

type InnerGlobalProps = {
  styles: Object | Array<Object>,
  context: CSSContextType
}

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

class InnerGlobal extends React.Component<InnerGlobalProps> {
  styleName: string
  sheet: StyleSheet
  componentDidMount() {
    this.updateStyles()
  }
  componentDidUpdate() {
    this.updateStyles()
  }
  updateStyles() {
    let serialized = serializeStyles(this.props.context.registered, [
      this.props.styles
    ])
    if (serialized.name === this.styleName) {
      return
    }
    this.styleName = serialized.name
    if (!this.sheet) {
      this.sheet = new StyleSheet({
        key: `${this.props.context.key}-global`,
        nonce: this.props.context.sheet.nonce,
        container: this.props.context.sheet.container
      })
      // $FlowFixMe
      let node: HTMLStyleElement | null = document.querySelector(
        `style[data-emotion-${this.props.context.key}="${serialized.name}"]`
      )

      if (node !== null) {
        this.sheet.tags.push(node)
      }
      // $FlowFixMe
      if (this.props.context.sheet.tags.length) {
        this.sheet.before = this.props.context.sheet.tags[0]
      }
    }
    let rules = this.props.context.stylis(``, serialized.styles)
    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      this.sheet.before = this.sheet.tags[0].nextElementSibling
      this.sheet.flush()
    }

    rules.forEach(this.sheet.insert, this.sheet)
  }

  componentWillUnmount() {
    this.sheet.flush()
  }
  render() {
    if (!isBrowser) {
      const serialized = serializeStyles(this.props.context.registered, [
        this.props.styles
      ])
      let rules = this.props.context.stylis(``, serialized.styles)

      return (
        <style
          {...{
            [`data-emotion-${this.props.context.key}`]: serialized.name,
            dangerouslySetInnerHTML: { __html: rules.join('') },
            nonce: this.props.context.sheet.nonce
          }}
        />
      )
    }
    return null
  }
}
