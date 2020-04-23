// @flow
import prettify from '@emotion/css-prettifier'

type StyleSheet = {
  tags: Array<HTMLStyleElement>
}

export default {
  test: (val: any) => val && val.tags !== undefined && Array.isArray(val.tags),
  serialize(
    val: StyleSheet,
    config: *,
    indentation: string,
    depth: number,
    refs: *,
    printer: Function
  ) {
    let styles = val.tags.map(tag => tag.textContent || '').join('')
    return printer(
      prettify(styles, config.indent),
      config,
      indentation,
      depth,
      refs
    )
  }
}
