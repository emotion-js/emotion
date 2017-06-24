const chalk = require('chalk')
const diff = require('jest-diff')
const stripAnsi = require('strip-ansi')
const { toMatchSnapshot } = require('jest-snapshot')

const isAddition = line => /^\+/.test(line)

const isDeletion = line => /^-/.test(line)

const removeGlamorClassNames = line =>
  line.replace(/css-.+?( |")/, '').slice(1).trim()
const isClassNameAttribute = (
  line,
  previous = '',
  /* istanbul ignore next */ next = ''
) => {
  const containsGlamorClassName = /class(Name)?=".*css-.*"/.test(line)
  if (containsGlamorClassName) {
    // just because the line contains a glamor class name doesn't mean that
    // it doesn't also have some other change, so we'll remove everything
    // except the glamor class name and see if it's the same as the previous
    // or the next line. It's not really perfect, but it's less likely that
    // we'll show something in white that shouldn't be :)
    const lineRemoved = removeGlamorClassNames(line)
    const previousRemoved = removeGlamorClassNames(previous)
    const nextRemoved = removeGlamorClassNames(next)
    return lineRemoved === previousRemoved || lineRemoved === nextRemoved
  }
  return containsGlamorClassName
}
const isDataAttribute = line => /data-css-.*/.test(line)
const isClassNameSelector = line => /\.css-.*,/.test(line)
const isDataSelector = line => /\[data-css-.*\] {/.test(line)

const isClassName = (line, previous, next) =>
  (isAddition(line) || isDeletion(line)) &&
  (isClassNameAttribute(line, previous, next) ||
    isDataAttribute(line) ||
    isClassNameSelector(line) ||
    isDataSelector(line))

const colorize = message => {
  const messageLines = message.split('\n')

  return messageLines
    .map((line, index) => {
      const previous = messageLines[index - 1]
      const next = messageLines[index + 1]
      if (isClassName(line, previous, next)) {
        return chalk.white(line)
      }
      if (isAddition(line)) {
        return chalk.red(line)
      }
      if (isDeletion(line)) {
        return chalk.green(line)
      }
      return chalk.dim(line)
    })
    .join('\n')
}

const matcher = {
  toMatchSnapshotWithEmotion (...args) {
    const result = toMatchSnapshot.apply(this, args)
    let message

    if (!result.pass) {
      message = diff(result.expected, result.actual, {
        aAnnotation: 'Snapshot',
        bAnnotation: 'Received'
      })
      message = stripAnsi(message)
      message = colorize(message)
    }

    return { pass: result.pass, message }
  }
}

module.exports = matcher
