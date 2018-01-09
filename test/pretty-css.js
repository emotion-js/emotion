// @flow
import { parse, stringify } from 'css'
import typeof { sheet as StyleSheet } from 'emotion'

export default {
  test: (val: any) => val.tags !== undefined && Array.isArray(val.tags),
  print(val: StyleSheet, printer: Function) {
    return printer(
      stringify(parse(val.tags.map(tag => tag.textContent || '').join('')))
    )
  },
}
