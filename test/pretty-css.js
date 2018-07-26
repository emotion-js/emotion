// @flow
import { parse, stringify } from 'css'

type StyleSheet = {
  tags: Array<HTMLStyleElement>
}

export default {
  test: (val: any) => val && val.tags !== undefined && Array.isArray(val.tags),
  print(val: StyleSheet, printer: Function) {
    return printer(
      stringify(parse(val.tags.map(tag => tag.textContent || '').join('')))
    )
  }
}
