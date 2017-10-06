/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side

// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet
  }

  // this weirdness brought to you by firefox
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i]
    }
  }
}

function makeStyleTag() {
  let tag = document.createElement('style')
  tag.type = 'text/css'
  tag.setAttribute('data-emotion', '')
  tag.appendChild(document.createTextNode(''))
  document.head.appendChild(tag)
  return tag
}

export default class StyleSheet {
  constructor() {
    this.isBrowser = typeof window !== 'undefined'
    this.isSpeedy = process.env.NODE_ENV === 'production' // the big drawback here is that the css won't be editable in devtools
    this.tags = []
    this.ctr = 0
  }
  inject() {
    if (this.injected) {
      throw new Error('already injected!')
    }
    if (this.isBrowser) {
      this.tags[0] = makeStyleTag()
    } else {
      // server side 'polyfill'. just enough behavior to be useful.
      this.sheet = []
    }
    this.injected = true
  }
  speedy(bool) {
    if (this.ctr !== 0) {
      // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
      throw new Error(`cannot change speedy now`)
    }
    this.isSpeedy = !!bool
  }
  insert(rule, sourceMap) {
    if (this.isBrowser) {
      // this is the ultrafast version, works across browsers
      if (this.isSpeedy) {
        const tag = this.tags[this.tags.length - 1]
        const sheet = sheetForTag(tag)

        try {
          sheet.insertRule(rule, sheet.cssRules.length)
        } catch (e) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('illegal rule', rule) // eslint-disable-line no-console
          }
        }
      } else {
        const tag = makeStyleTag()
        this.tags.push(tag)
        tag.appendChild(document.createTextNode(rule + (sourceMap || '')))
      }
      this.ctr++
      if (this.ctr % 65000 === 0) {
        this.tags.push(makeStyleTag())
      }
    } else {
      // enough 'spec compliance' to be able to extract the rules later
      // in other words, just the rule
      this.sheet.push(rule)
    }
  }
  flush() {
    if (this.isBrowser) {
      this.tags.forEach(tag => tag.parentNode.removeChild(tag))
      this.tags = []
      this.ctr = 0
      // todo - look for remnants in document.styleSheets
    } else {
      // simpler on server
      this.sheet = []
    }
    this.injected = false
  }
}
