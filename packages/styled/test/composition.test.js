/** @jsx jsx */
import 'test-utils/setup-env'
import { render } from '@testing-library/react'
import { jsx, css } from '@emotion/react'
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

  const { container } = render(
    <FinalH2 scale={2} className={'legacy__class'}>
      hello world
    </FinalH2>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('composition with objects', () => {
  const cssA = {
    color: lighten(0.2, '#000'),
    fontSize: '1em',
    [hiDPI(1.5).replace('\n', ' ').trim()]: { fontSize: '1.25em' }
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

  const { container } = render(
    <H2 scale={2} className={'legacy__class'}>
      hello world
    </H2>
  )

  expect(container.firstChild).toMatchSnapshot()
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

  const { container } = render(<Avatar />)

  expect(container.firstChild).toMatchSnapshot()
})

test('composition', () => {
  const fontSize = 20
  const H1 = styled('h1')`
    font-size: ${fontSize + 'px'};
  `

  const H2 = styled(H1)`
    font-size: ${(fontSize * 2) / 3 + 'px'};
  `

  const { container } = render(<H2 className={'legacy__class'}>hello world</H2>)
  expect(container.firstChild).toMatchSnapshot()
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
  const { container } = render(<AnotherButton>hello world</AnotherButton>)

  expect(container.firstChild).toMatchSnapshot()
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

  const { container } = render(
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
  expect(container.firstChild).toMatchSnapshot()
})

test('glamorous style api & composition', () => {
  const H1 = styled.h1(props => ({ fontSize: props.fontSize }))
  const H2 = styled(H1)(props => ({ flex: props.flex }), { display: 'flex' })

  const { container } = render(
    <H2 fontSize={20} flex={1}>
      hello world
    </H2>
  )

  expect(container.firstChild).toMatchSnapshot()
})
