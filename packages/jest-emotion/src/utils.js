// @flow

function getClassNames(selectors, classes) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, node) {
  const props = node.props
  return getClassNames(selectors, props.className || props.class)
}

function isTagWithClassName(node) {
  return node.prop('className') && typeof node.type() === 'string'
}

function getClassNamesFromEnzyme(selectors, node) {
  const components = node.findWhere(isTagWithClassName)
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
