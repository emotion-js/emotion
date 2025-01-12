/* eslint-disable no-fallthrough */
/* eslint-disable eqeqeq */
import { DECLARATION, Element, hash, MOZ, MS, replace, WEBKIT } from 'stylis'

// this is a slice of stylis@4.0.13 prefixer, the latter version introduced grid prefixing which we don't want
// this version only includes css properties that are not widely available according to https://web-platform-dx.github.io/web-features/

function prefix(value: string, length: number): string {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value
    // box-decoration-break
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
      return WEBKIT + value + value
    // user-select, hyphens, text-size-adjust
    case 4246:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value
    // cursor
    case 6187:
      return (
        replace(
          replace(
            replace(value, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          value,
          ''
        ) + value
      )
  }

  return value
}

export let prefixer = (element: Element) => {
  if (element.length > -1 && !element.return && element.type === DECLARATION) {
    element.return = prefix(element.value, element.length)
  }
}
