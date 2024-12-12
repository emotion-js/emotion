import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import styled from '@emotion/styled'
import * as renderer from 'react-test-renderer'

test('component as selector', async () => {
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

  const tree = (
    await act(() =>
      renderer.create(
        <Thing>
          hello <H1>This will be green</H1> world
        </Thing>
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('component as selector function interpolation', async () => {
  const H1 = styled.h1`
    font-size: ${props => props.fontSize}px;
  `

  const Thing = styled.div`
    display: flex;
    ${H1} {
      color: green;
    }
  `

  const tree = (
    await act(() =>
      renderer.create(
        <Thing fontSize={10}>
          hello <H1 fontSize={20}>This will be green</H1> world
        </Thing>
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('component as selector (object syntax)', async () => {
  const fontSize = '20px'
  const H1 = styled('h1')({ fontSize })

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green'
    }
  })

  const tree = (
    await act(() =>
      renderer.create(
        <Thing>
          hello <H1>This will be green</H1> world
        </Thing>
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('component as selector function interpolation (object syntax)', async () => {
  const H1 = styled('h1')(props => ({
    fontSize: `${props.fontSize}px`
  }))

  const Thing = styled('div')({
    display: 'flex',
    [H1]: {
      color: 'green'
    }
  })

  const tree = (
    await act(() =>
      renderer.create(
        <Thing fontSize={10}>
          hello <H1 fontSize={20}>This will be green</H1> world
        </Thing>
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
