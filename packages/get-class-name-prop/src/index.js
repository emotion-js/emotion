// @flow

// https://github.com/facebook/react/blob/c954efa70f44a44be9c33c60c57f87bea6f40a10/packages/react-dom/src/shared/isCustomComponent.js
function isCustomComponent(tagName: string, props: Object): boolean {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string'
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false
    default:
      return true
  }
}

export default function getClassNameProp(tagName: any, props: Object) {
  return typeof tagName !== 'string' || !isCustomComponent(tagName, props)
    ? 'className'
    : 'class'
}
