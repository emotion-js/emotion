import { css } from '@emotion/react'

// $ExpectType SerializedStyles
css()
// $ExpectType SerializedStyles
css([])
// $ExpectType SerializedStyles
css('abc')
// $ExpectType SerializedStyles
css('width: 200px;')
// $ExpectType SerializedStyles
css('display: block;', {
  flexGrow: 1,
  backgroundColor: 'red'
})
// $ExpectType SerializedStyles
css`
  position: relative;
  top: 20px;
`
// $ExpectType SerializedStyles
css`
  position: relative;
  top: ${'20px'};
`
// $ExpectType SerializedStyles
css`
  position: relative;
  top: ${'20px'};
`

// $ExpectType SerializedStyles
css([{ display: null }])

// $ExpectType SerializedStyles
css({
  ':hover': [{ color: 'green' }, { backgroundColor: 'yellow' }]
})

// $ExpectType SerializedStyles
css({
  ':hover': css`
    color: hotpink;
  `
})

// $ExpectError
css(() => 'height: 300px;')

// $ExpectError
css`
  position: relative;
  flexgrow: ${() => 20};
`
