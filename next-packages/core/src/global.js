// @flow
import * as React from 'react'
import { withEmotionCache } from './context'
import {
  isBrowser,
  type EmotionCache,
  type SerializedStyles
} from '@emotion/utils'
import { StyleSheet } from '@emotion/sheet'
import { serializeStyles } from '@emotion/serialize'

type GlobalProps = {
  styles: Object | Array<Object>
}

export let Global: React.StatelessFunctionalComponent<
  GlobalProps
> = /* #__PURE__ */ withEmotionCache((props: GlobalProps, cache) => {
  let serialized = serializeStyles(cache.registered, [
    typeof props.styles === 'function'
      ? props.styles(cache.theme)
      : props.styles
  ])

  return <InnerGlobal serialized={serialized} cache={cache} />
})

type InnerGlobalProps = {
  serialized: SerializedStyles,
  cache: EmotionCache
}

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

class InnerGlobal extends React.Component<InnerGlobalProps> {
  sheet: StyleSheet
  componentDidMount() {
    this.sheet = new StyleSheet({
      key: `${this.props.cache.key}-global`,
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    })
    // $FlowFixMe
    let node: HTMLStyleElement | null = document.querySelector(
      `style[data-emotion-${this.props.cache.key}="${
        this.props.serialized.name
      }"]`
    )

    if (node !== null) {
      this.sheet.tags.push(node)
    }
    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0]
    }
    this.insertStyles()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles()
    }
  }
  insertStyles() {
    let rules = this.props.cache.stylis(``, this.props.serialized.styles)
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
      let { serialized } = this.props
      let rules = this.props.cache.stylis(``, serialized.styles)

      return (
        <style
          {...{
            [`data-emotion-${this.props.cache.key}`]: serialized.name,
            dangerouslySetInnerHTML: { __html: rules.join('') },
            nonce: this.props.cache.sheet.nonce
          }}
        />
      )
    }
    return null
  }
}
