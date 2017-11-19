import { parse, stringify } from 'css'

export default {
  test: val => val.tags !== undefined && Array.isArray(val.tags),
  print(val, printer) {
    return printer(
      stringify(parse(val.tags.map(tag => tag.textContent || '').join('')))
    )
  }
}
