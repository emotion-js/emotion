import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import styled from '@emotion/styled'

test('component as selector', () => {
  const fontSize = '20px'
  const H1 = styled.h1`
    font-size: ${fontSize};
  `

  const Thing = styled.div`
    display: flex;
    ${H1} {
      color: green;
    }
  `

  const { container } = render(
    <Thing>
      hello <H1>This will be green</H1> world
    </Thing>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('component as selector function interpolation', () => {
  const H1 = styled.h1`
    font-size: ${props => props.fontSize}px;
  `

  const Thing = styled.div`
    display: flex;
    ${H1} {
      color: green;
    }
  `

  const { container } = render(
    <Thing fontSize={10}>
      hello <H1 fontSize={20}>This will be green</H1> world
    </Thing>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('component as selector (object syntax)', () => {
  const fontSize = '20px'
  const H1 = styled('h1')({ fontSize })

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green'
    }
  })

  const { container } = render(
    <Thing>
      hello <H1>This will be green</H1> world
    </Thing>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('component as selector function interpolation (object syntax)', () => {
  const H1 = styled('h1')(props => ({
    fontSize: `${props.fontSize}px`
  }))

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green'
    }
  })

  const { container } = render(
    <Thing fontSize={10}>
      hello <H1 fontSize={20}>This will be green</H1> world
    </Thing>
  )

  expect(container.firstChild).toMatchSnapshot()
})
