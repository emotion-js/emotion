import createEmotion from '@emotion/css/create-instance'

// $ExpectType Emotion
const emotion0 = createEmotion({ key: 'bar' })
// $ExpectType Emotion
const emotion1 = createEmotion({
  key: 'foo',
  container: document.head,
  nonce: 'fasefw'
})

// $ExpectError
createEmotion('abc')
// $ExpectError
createEmotion({}, undefined as any)

const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  css,
  injectGlobal,
  keyframes,
  sheet,
  cache
} = emotion0

flush()

// $ExpectError
flush(undefined as any)

hydrate([])
hydrate(['123'])

// $ExpectError
hydrate()
// $ExpectError
hydrate([0])
// $ExpectError
hydrate([], undefined as any)

cx()
cx(true)
cx('123')
cx('123', 'pf')
cx({
  abc: false,
  fp: true,
  opt1: null,
  opt2: undefined
})
cx([])
cx([
  'cl',
  {
    fp: true
  }
])
cx([['abc']])

// $ExpectError
cx(5)

merge('abc def fpfp')

getRegisteredStyles([], 'abc')
getRegisteredStyles(['abc'], 'bcd')
getRegisteredStyles([], 'abc def fpfw')

css`
  height: 20px;
`
css`
  color: ${'green'};
  font-size: ${10 + 4}px;
`
css()
css(1)
css('abc')
css(true)
css([])
css([1])
css([['abc', 'asdf'], 'efw'])
css({
  ':active': {
    borderRadius: '2px',
    overflowAnchor: 'none',
    clear: ['both', 'left']
  },
  '::before': {
    borderRadius: '2px'
  }
})
css(true, true)
css('fa', 1123)
css(['123'], 'asdf')

// $ExpectError
css({
  width: {}
})
// $ExpectError
css({
  color: 5
})

injectGlobal`
  background: black;
`
injectGlobal()
injectGlobal(30)
injectGlobal('this-is-class')
injectGlobal({})
injectGlobal([
  {
    animationDelay: '200ms'
  }
])
// $ExpectError
injectGlobal({
  backgroundColor: 4
})

keyframes`
  from {
    width: 100%;
  }

  to {
    width: 50%;
  }
`
keyframes()
keyframes({
  from: {
    marginLeft: '100%'
  },
  to: {
    marginLeft: '50%'
  }
})
keyframes([
  {
    from: {
      marginLeft: '100%'
    },
    to: {
      marginLeft: '50%'
    }
  },
  {
    '0%': {
      width: '100px'
    },
    '50%': {
      width: '50px'
    },
    '100%': {
      width: '120px'
    }
  }
])
// $ExpectError
keyframes({
  '0%': {
    backgroundOrigin: 0
  }
})
