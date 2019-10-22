// @flow
/** @jsx jsx */
import 'test-utils/legacy-env'
import * as renderer from 'react-test-renderer'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

import { lighten, hiDPI } from 'polished'

test('composition', () => {
  const fontSize = '20px'

  const cssA = css`
    color: blue;
  `

  const cssB = css`
    ${cssA};
    color: red;
  `

  const BlueH1 = styled('h1')`
    ${cssB};
    color: blue;
    font-size: ${fontSize};
  `

  const FinalH2 = styled(BlueH1)`
    font-size: 32px;
  `

  const tree = renderer
    .create(
      <FinalH2 scale={2} className={'legacy__class'}>
        hello world
      </FinalH2>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('composition with objects', () => {
  const cssA = {
    color: lighten(0.2, '#000'),
    fontSize: '1em',
    [hiDPI(1.5)
      .replace('\n', ' ')
      .trim()]: { fontSize: '1.25em' }
  }

  const cssB = css`
    ${cssA};
    height: 64px;
  `

  const H1 = styled('h1')`
    ${cssB};
    font-size: 4em;
  `

  const H2 = styled(H1)`
    font-size: 32px;
  `

  const tree = renderer
    .create(
      <H2 scale={2} className={'legacy__class'}>
        hello world
      </H2>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
test('object composition', () => {
  const imageStyles = css({ width: 96, height: 96 })

  css([{ color: 'blue' }])

  const red = css([{ color: 'red' }])

  const blue = css([red, { color: 'blue' }])

  const prettyStyles = css([
    {
      borderRadius: '50%',
      transition: 'transform 400ms ease-in-out',
      ':hover': {
        transform: 'scale(1.2)'
      }
    },
    { border: '3px solid currentColor' }
  ])

  const Avatar = styled('img')`
    ${prettyStyles};
    ${imageStyles};
    ${blue};
  `

  const tree = renderer.create(<Avatar />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('composition', () => {
  const fontSize = 20
  const H1 = styled('h1')`
    font-size: ${fontSize + 'px'};
  `

  const H2 = styled(H1)`
    font-size: ${(fontSize * 2) / 3 + 'px'};
  `

  const tree = renderer
    .create(<H2 className={'legacy__class'}>hello world</H2>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('composing components', () => {
  const Button = styled.button`
    color: green;
  `
  const OtherButton = styled(Button)`
    display: none;
  `

  const AnotherButton = styled(OtherButton)`
    display: flex;
    justify-content: center;
  `
  const tree = renderer
    .create(<AnotherButton>hello world</AnotherButton>)
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('composition of nested pseudo selectors', () => {
  const defaultLinkStyles = {
    '&:hover': {
      color: 'blue',
      '&:active': {
        color: 'red'
      }
    }
  }

  const buttonStyles = () => ({
    ...defaultLinkStyles,
    fontSize: '2rem',
    padding: 16
  })

  const Button = styled('button')(buttonStyles)

  const tree = renderer
    .create(
      <Button
        css={css({
          '&:hover': {
            color: 'pink',
            '&:active': {
              color: 'purple'
            },
            '&.some-class': {
              color: 'yellow'
            }
          }
        })}
      >
        Should be purple
      </Button>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('glamorous style api & composition', () => {
  const H1 = styled.h1(props => ({ fontSize: props.fontSize }))
  const H2 = styled(H1)(props => ({ flex: props.flex }), { display: 'flex' })

  const tree = renderer
    .create(
      <H2 fontSize={20} flex={1}>
        hello world
      </H2>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
