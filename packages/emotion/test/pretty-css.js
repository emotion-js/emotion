import { sheet } from 'emotion'
import { parse, stringify } from 'css'

export default {
  test: val => val === sheet,
  print(val, printer) {
    return printer(
      stringify(parse(sheet.tags.map(tag => tag.textContent || '').join('')))
    )
  }
}
