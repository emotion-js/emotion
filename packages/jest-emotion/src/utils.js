// @flow

function isTagWithClassName(node) {
  return node.prop('className') && typeof node.type() === 'string'
}

function getClassNames(selectors, classes) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, node) {
  const props = node.props
  return getClassNames(selectors, props.className || props.class)
}

function getClassNamesFromEnzyme(selectors, node) {
  const components = node.findWhere(isTagWithClassName)
  const prop = components.length && components.first().prop('className')
  return getClassNames(selectors, prop)
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

export function getClassNamesFromNodes(nodes: Array<any>) {
  return nodes.reduce(
    (selectors, node) =>
      isReactElement(node)
        ? getClassNamesFromTestRenderer(selectors, node)
        : isEnzymeElement(node)
          ? getClassNamesFromEnzyme(selectors, node)
          : getClassNamesFromDOMElement(selectors, node),
    []
  )
}
