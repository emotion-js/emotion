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

import { forEach } from 'emotion-utils'

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

const isBrowser: boolean = typeof window !== 'undefined'

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
    this.isSpeedy = process.env.NODE_ENV === 'production' // the big drawback here is that the css won't be editable in devtools
    this.tags = []
    this.ctr = 0
  }
  inject() {
    if (this.injected) {
      throw new Error('already injected!')
    }
    if (isBrowser) {
      this.tags[0] = makeStyleTag()
    } else {
      // server side 'polyfill'. just enough behavior to be useful.
      this.sheet = {
        cssRules: []
      }
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
  insert(rule) {
    if (isBrowser) {
      const tag = this.tags[this.tags.length - 1]
      const sheet = sheetForTag(tag)
      // this is the ultrafast version, works across browsers
      if (this.isSpeedy && sheet.insertRule) {
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
          sheet.insertRule(rule, sheet.cssRules.length)
        } catch (e) {
          if (process.env.NODE_ENV !== 'production') {
            // might need beter dx for this
            console.warn('illegal rule', rule) // eslint-disable-line no-console
          }
        }
      } else {
        // more browser weirdness. I don't even know
        // else if(this.tags.length > 0 && this.tags::last().styleSheet) {
        //   this.tags::last().styleSheet.cssText+= rule
        // }
        tag.appendChild(document.createTextNode(rule))
      }
    } else {
      // enough 'spec compliance' to be able to extract the rules later
      // in other words, just the cssText field
      this.sheet.cssRules.push({ cssText: rule })
    }

    this.ctr++
    if (isBrowser && this.ctr % 65000 === 0) {
      this.tags.push(makeStyleTag())
    }
    return this.ctr - 1
  }
  flush() {
    if (isBrowser) {
      forEach(this.tags, tag => tag.parentNode.removeChild(tag))
      this.tags = []
      this.ctr = 0
      // todo - look for remnants in document.styleSheets
    } else {
      // simpler on server
      this.sheet.cssRules = []
    }
    this.injected = false
  }
  rules() {
    if (!isBrowser) {
      return this.sheet.cssRules
    }
    let arr = []
    forEach(this.tags, tag =>
      arr.splice(arr.length, 0, ...Array.from(sheetForTag(tag).cssRules))
    )
    return arr
  }
}
