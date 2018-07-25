// @flow

function getClassNames(selectors: any, classes?: string) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, { props = {} }) {
  return getClassNames(selectors, props.className || props.class)
}

function shouldDive(node) {
  return typeof node.dive === 'function' && typeof node.type() !== 'string'
}

function isTagWithClassName(node) {
  return node.prop('className') && typeof node.type() === 'string'
}

function getClassNamesFromEnzyme(selectors, node) {
  // We need to dive if we have selected a styled child from a shallow render
  const actualComponent = shouldDive(node) ? node.dive() : node
  // Find the first node with a className prop
  const components = actualComponent.findWhere(isTagWithClassName)
  const classes = components.length && components.first().prop('className')

  return getClassNames(selectors, classes)
}

function getClassNamesFromCheerio(selectors, node) {
  const classes = node.attr('class')
  return getClassNames(selectors, classes)
}

function getClassNamesFromDOMElement(selectors, node: any) {
  return getClassNames(selectors, node.getAttribute('class'))
}

export function isReactElement(val: any): boolean {
  return val.$$typeof === Symbol.for('react.test.json')
}

const domElementPattern = /^((HTML|SVG)\w*)?Element$/

export function isDOMElement(val: any): boolean {
  return (
    val.nodeType === 1 &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

function isEnzymeElement(val: any): boolean {
  return typeof val.findWhere === 'function'
}

function isCheerioElement(val: any): boolean {
  return val.cheerio === '[cheerio object]'
}

export function getClassNamesFromNodes(nodes: Array<any>) {
  return nodes.reduce((selectors, node) => {
    if (isReactElement(node)) {
      return getClassNamesFromTestRenderer(selectors, node)
    } else if (isEnzymeElement(node)) {
      return getClassNamesFromEnzyme(selectors, node)
    } else if (isCheerioElement(node)) {
      return getClassNamesFromCheerio(selectors, node)
    }
    return getClassNamesFromDOMElement(selectors, node)
  }, [])
}

let unique = arr => Array.prototype.concat(...new Set(arr))

export function getStylesFromClassNames(
  classNames: Array<string>,
  elements: Array<HTMLStyleElement>
): string {
  if (!classNames.length) {
    return ''
  }
  let keys = getKeys(elements)
  if (!keys.length) {
    return ''
  }

  let keyPatten = new RegExp(`^(${keys.join('|')})-`)
  let filteredClassNames = classNames.filter(className =>
    keyPatten.test(className)
  )
  if (!filteredClassNames.length) {
    return ''
  }
  let selectorPattern = new RegExp('\\.(' + filteredClassNames.join('|') + ')')

  let styles = ''
  elements.forEach(element => {
    let rule = element.textContent || ''
    if (selectorPattern.test(rule)) {
      styles += rule
    }
  })

  return styles
}

export function getStyleElements(): Array<HTMLStyleElement> {
  let elements = Array.prototype.concat(
    ...document.querySelectorAll('style[data-emotion]')
  )
  // $FlowFixMe
  return elements
}

export function getKeys(elements: Array<HTMLStyleElement>) {
  let keys = unique(
    elements.map(
      element =>
        // $FlowFixMe we know it exists since we query for elements with this attribute
        (element.getAttribute('data-emotion'): string)
    )
  ).filter(Boolean)
  return keys
}
