// @flow
import transform from 'css-to-react-native'
import { StyleSheet } from 'react-primitives'

function interleave(vals) {
  let strings = vals[0]
  let finalArray = [strings[0]]
  for (let i = 1, len = vals.length; i < len; i++) {
    finalArray.push(vals[i])
    if (strings[i + 1] !== undefined) {
      finalArray.push(strings[i + 1])
    }
  }
  return finalArray
}

function css(...args: any) {
  let vals

  if (args[0].strings == null || args[0].strings.raw === undefined) {
    vals = args
  } else {
    vals = interleave(args)
  }

  let styles = []
  let buffer = ''
  let lastType
  let handleInterpolation = (interpolation, i, arr) => {
    let type = typeof interpolation

    if (interpolation == null || type === 'boolean') {
      return
    }
    let isRnStyle =
      (type === 'object' && !Array.isArray(interpolation)) || type === 'number'
    if (lastType === 'string' && isRnStyle) {
      styles.push(convertStyles(buffer))
      buffer = ''
    }

    if (type === 'string') {
      buffer += interpolation

      if (arr.length - 1 === i) {
        styles.push(convertStyles(buffer))
        buffer = ''
      }
    }
    if (isRnStyle) {
      styles.push(interpolation)
    }
    if (Array.isArray(interpolation)) {
      interpolation.forEach(handleInterpolation)
    }
    lastType = type
  }

  vals.forEach(handleInterpolation)

  return StyleSheet.flatten(styles)
}

function convertStyles(str: string) {
  if (str.trim() === '') return {}

  const styleObj = []

  const parsedString = str.split(';')

  parsedString.forEach(style => {
    // Get prop name and prop value
    const ar = style.split(':')

    if (ar[0] && ar[1]) {
      styleObj.push([ar[0].trim(), ar[1].trim()])
    }
  })

  return transform(styleObj)
}

test('basic', () => {
  expect(css`
    color: hotpink;
    ${{ backgroundColor: 'green' }};
  `).toEqual({ color: 'hotpink', backgroundColor: 'green' })
  expect(css({ color: 'green' })).toEqual({ color: 'green' })
  expect(css([{ color: 'green' }, `background-color:yellow;`])).toEqual({
    color: 'green',
    backgroundColor: 'yellow'
  })
  expect(css([{ color: 'green' }])).toEqual({ color: 'green' })
})

test('order with string and object', () => {
  // this test checks the keys instead of the objects
  // because we care about the order of the keys
  expect(
    Object.keys(
      css({ color: 'green' }, `background-color:yellow;`, { flex: 2 })
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        [{ color: 'green' }, `background-color:yellow;`],
        {
          flex: 2
        }
      ])
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        { color: 'green' },
        [
          `background-color:yellow;`,
          {
            flex: 2
          }
        ]
      ])
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        { color: 'green' },
        [
          { flex: 8 },
          `background-color:yellow;`,
          [`flex-grow: 1;`, { flexDirection: 'row' }]
        ]
      ])
    )
  ).toEqual(['color', 'flex', 'backgroundColor', 'flexGrow', 'flexDirection'])
})
