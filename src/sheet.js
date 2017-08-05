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

import { forEach } from './utils'

function last(arr) {
  return arr[arr.length - 1]
}

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
const isDev: boolean =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV // (x => (x === 'development') || !x)(process.env.NODE_ENV)
const isTest: boolean = process.env.NODE_ENV === 'test'

const oldIE = (() => {
  if (isBrowser) {
    let div = document.createElement('div')
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->'
    return div.getElementsByTagName('i').length === 1
  }
})()

function makeStyleTag() {
  let tag = document.createElement('style')
  tag.type = 'text/css'
  tag.setAttribute('data-emotion', '')
  tag.appendChild(document.createTextNode(''))
  ;(document.head || document.getElementsByTagName('head')[0]).appendChild(tag)
  return tag
}

export class StyleSheet {
  constructor(
    {
      speedy = !isDev && !isTest,
      maxLength = isBrowser && oldIE ? 4000 : 65000
    }: { speedy: boolean, maxLength: number } = {}
  ) {
    this.isSpeedy = speedy // the big drawback here is that the css won't be editable in devtools
    this.sheet = undefined
    this.tags = []
    this.maxLength = maxLength
    this.ctr = 0
  }
  getSheet() {
    return sheetForTag(last(this.tags))
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
        cssRules: [],
        insertRule: rule => {
          // enough 'spec compliance' to be able to extract the rules later
          // in other words, just the cssText field
          this.sheet.cssRules.push({ cssText: rule })
        }
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
  _insert(rule) {
    // this weirdness for perf, and chrome's weird bug
    // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
    try {
      let sheet = this.getSheet()
      sheet.insertRule(
        rule,
        rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length
      )
    } catch (e) {
      if (isDev) {
        // might need beter dx for this
        console.warn('illegal rule', rule) // eslint-disable-line no-console
      }
    }
  }
  insert(rule) {
    if (isBrowser) {
      // this is the ultrafast version, works across browsers
      if (this.isSpeedy && this.getSheet().insertRule) {
        this._insert(rule)
      } else {
        // more browser weirdness. I don't even know
        // else if(this.tags.length > 0 && this.tags::last().styleSheet) {
        //   this.tags::last().styleSheet.cssText+= rule
        // }
        if (rule.indexOf('@import') !== -1) {
          const tag = last(this.tags)
          tag.insertBefore(document.createTextNode(rule), tag.firstChild)
        } else {
          last(this.tags).appendChild(document.createTextNode(rule))
        }
      }
    } else {
      // server side is pretty simple
      this.sheet.insertRule(
        rule,
        rule.indexOf('@import') !== -1 ? 0 : this.sheet.cssRules.length
      )
    }

    this.ctr++
    if (isBrowser && this.ctr % this.maxLength === 0) {
      this.tags.push(makeStyleTag())
    }
    return this.ctr - 1
  }
  delete(index) {
    // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    return this.replace(index, '')
  }
  flush() {
    if (isBrowser) {
      forEach(this.tags, tag => tag.parentNode.removeChild(tag))
      this.tags = []
      this.sheet = null
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
