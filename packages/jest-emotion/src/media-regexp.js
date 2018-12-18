import mediaQueryTypes from 'media-query-types'
import cssLengthUnits from 'css-length-units'
import cssResolutionUnits from 'css-resolution-units'
import cssMediaFeatures from 'css-media-features'
const numberRe = '\\d+(\\.\\d+)?'

const mediaRegExp = new RegExp(
  [
    '^(\\s*',
    '(only|not)?\\s*',
    `(${mediaQueryTypes().join('|')})?\\s*`,
    '(and)?\\s*',
    '(\\(\\s*(',
    [
      '-\\w+-(min-|max-)?([\\w\\-]+)\\s*(:?\\s*.+)?',
      `(${cssMediaFeatures({ range: true }).join(
        '|'
      )})\\s*(:?\\s*(${cssMediaFeatures.discreteValues.join(
        '|'
      )}|${numberRe}(${[]
        .concat(cssLengthUnits, cssResolutionUnits)
        .join('|')}|\\/${numberRe})?))?`
    ].join('|'),
    ')\\s*\\))?',
    '\\s*(,|and)?',
    '\\s*){1,}$'
  ].join('')
)

export default mediaRegExp
