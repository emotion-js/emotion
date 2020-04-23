// @flow
import prettify from '@emotion/css-prettifier'

type StyleSheet = {
  tags: Array<HTMLStyleElement>
}

export default {
  test: (val: any) => val && val.tags !== undefined && Array.isArray(val.tags),
  print(val: StyleSheet, printer: Function) {
    let styles = val.tags.map(tag => tag.textContent || '').join('')
    return printer(prettify(styles))
  }
}
