// @flow
import { parse, stringify } from 'css'

type StyleSheet = {
  tags: Array<HTMLStyleElement>
}

global.shouldKeepSourceMaps = false

let removeCommentPattern = /\/\*[\s\S]*?\*\//g

export default {
  test: (val: any) => val && val.tags !== undefined && Array.isArray(val.tags),
  print(val: StyleSheet, printer: Function) {
    let styles = val.tags.map(tag => tag.textContent || '').join('')
    if (global.shouldKeepSourceMaps === false) {
      styles = styles.replace(removeCommentPattern, '')
    }

    return printer(stringify(parse(styles)))
  }
}
