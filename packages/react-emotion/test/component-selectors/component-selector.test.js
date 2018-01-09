import React from 'react'
import styled, { flush, sheet } from 'react-emotion'
import renderer from 'react-test-renderer'

afterEach(() => flush())

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

  const tree = renderer
    .create(
      <Thing>
        hello <H1>This will be green</H1> world
      </Thing>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
  expect(sheet).toMatchSnapshot()
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

  const tree = renderer
    .create(
      <Thing fontSize={10}>
        hello <H1 fontSize={20}>This will be green</H1> world
      </Thing>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
  expect(sheet).toMatchSnapshot()
})

test('component as selector (object syntax)', () => {
  const fontSize = '20px'
  const H1 = styled('h1')({ fontSize })

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green',
    },
  })

  const tree = renderer
    .create(
      <Thing>
        hello <H1>This will be green</H1> world
      </Thing>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
  expect(sheet).toMatchSnapshot()
})

test('component as selector function interpolation (object syntax)', () => {
  const H1 = styled('h1')(props => ({
    fontSize: `${props.fontSize}px`,
  }))

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green',
    },
  })

  const tree = renderer
    .create(
      <Thing fontSize={10}>
        hello <H1 fontSize={20}>This will be green</H1> world
      </Thing>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
  expect(sheet).toMatchSnapshot()
})
