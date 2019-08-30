// @flow
import nodePath from 'path'

const invalidClassNameCharacters = /[!"#$%&'()*+,./:;<=>?@[\]^`|}~{]/g

const sanitizeLabelPart = (labelPart: string) =>
  labelPart.trim().replace(invalidClassNameCharacters, '-')

function getLabel(
  identifierName?: string,
  autoLabel: boolean,
  labelFormat?: string,
  filename: string
) {
  if (!identifierName || !autoLabel) return null
  if (!labelFormat) return sanitizeLabelPart(identifierName)

  const parsedPath = nodePath.parse(filename)
  let localDirname = nodePath.basename(parsedPath.dir)
  let localFilename = parsedPath.name

  if (localFilename === 'index') {
    localFilename = localDirname
  }

  return labelFormat
    .replace(/\[local\]/gi, sanitizeLabelPart(identifierName))
    .replace(/\[filename\]/gi, sanitizeLabelPart(localFilename))
    .replace(/\[dirname\]/gi, sanitizeLabelPart(localDirname))
}

export function getLabelFromPath(path: *, state: *, t: *) {
  return getLabel(
    getIdentifierName(path, t),
    state.opts.autoLabel === undefined
      ? process.env.NODE_ENV !== 'production'
      : state.opts.autoLabel,
    state.opts.labelFormat,
    state.file.opts.filename
  )
}

let pascalCaseRegex = /^[A-Z][A-Za-z]+/

function getDeclaratorName(path, t) {
  // $FlowFixMe
  const parent = path.findParent(
    p =>
      p.isVariableDeclarator() ||
      p.isFunctionDeclaration() ||
      p.isFunctionExpression() ||
      p.isArrowFunctionExpression() ||
      p.isObjectProperty()
  )
  if (!parent) {
    return ''
  }

  // we probably have a css call assigned to a variable
  // so we'll just return the variable name
  if (parent.isVariableDeclarator()) {
    return parent.node.id.name
  }

  // we probably have an inline css prop usage
  if (parent.isFunctionDeclaration()) {
    let { name } = parent.node.id
    if (pascalCaseRegex.test(name)) {
      return name
    }
    return ''
  }

  // we could also have an object property
  if (parent.isObjectProperty() && parent.node.key.name) {
    return parent.node.key.name
  }

  let variableDeclarator = path.findParent(p => p.isVariableDeclarator())
  if (!variableDeclarator) {
    return ''
  }
  let { name } = variableDeclarator.node.id
  if (pascalCaseRegex.test(name)) {
    return name
  }
  return ''
}

function getIdentifierName(path: *, t: *) {
  let classOrClassPropertyParent

  if (
    t.isObjectProperty(path.parentPath) &&
    path.parentPath.node.computed === false &&
    (t.isIdentifier(path.parentPath.node.key) ||
      t.isStringLiteral(path.parentPath.node.key))
  ) {
    return path.parentPath.node.key.name || path.parentPath.node.key.value
  }

  if (path) {
    // $FlowFixMe
    classOrClassPropertyParent = path.findParent(
      p => t.isClassProperty(p) || t.isClass(p)
    )
  }
  if (classOrClassPropertyParent) {
    if (
      t.isClassProperty(classOrClassPropertyParent) &&
      classOrClassPropertyParent.node.computed === false &&
      t.isIdentifier(classOrClassPropertyParent.node.key)
    ) {
      return classOrClassPropertyParent.node.key.name
    }
    if (
      t.isClass(classOrClassPropertyParent) &&
      classOrClassPropertyParent.node.id
    ) {
      return t.isIdentifier(classOrClassPropertyParent.node.id)
        ? classOrClassPropertyParent.node.id.name
        : ''
    }
  }

  let declaratorName = getDeclaratorName(path, t)
  // if the name starts with _ it was probably generated by babel so we should ignore it
  if (declaratorName.charAt(0) === '_') {
    return ''
  }
  return declaratorName
}
