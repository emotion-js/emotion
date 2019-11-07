// @flow
import 'test-utils/next-env'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import styled from '@emotion/styled'

let id = () => Math.random().toString(36)

afterEach(cleanup)

test('string base - string as', () => {
  const Title = styled('h1')`
    color: green;
  `

  let h1Title = id()
  let h2Title = id()

  let { getByTestId } = render(
    <article>
      <Title data-testid={h1Title}>My Title</Title>
      <Title data-testid={h2Title} as="h2">
        My Subtitle
      </Title>
    </article>
  )

  expect(getByTestId(h1Title).tagName).toBe('H1')
  expect(getByTestId(h2Title).tagName).toBe('H2')
})

test('styled string base - string as', () => {
  const Title = styled('h1')`
    color: green;
  `

  const Subtitle = styled(Title)`
    font-weight: 100;
  `

  let h1Title = id()
  let h1Subtitle = id()
  let h3Subtitle = id()

  let { getByTestId } = render(
    <article>
      <Title data-testid={h1Title}>My Title</Title>
      <Subtitle data-testid={h1Subtitle}>My Subtitle</Subtitle>
      <Subtitle data-testid={h3Subtitle} as="h3">
        My smaller Subtitle
      </Subtitle>
    </article>
  )

  expect(getByTestId(h1Title).tagName).toBe('H1')
  expect(getByTestId(h1Subtitle).tagName).toBe('H1')
  expect(getByTestId(h3Subtitle).tagName).toBe('H3')
})

test('composite base - string as', () => {
  const Title = styled(props => <h1 {...props} />)`
    color: green;
  `
  let h1Title = id()
  let h3Title = id()

  let { getByTestId } = render(
    <article>
      <Title data-testid={h1Title}>My Title</Title>
      <Title data-testid={h3Title} as="h3">
        My Subtitle
      </Title>
    </article>
  )

  expect(getByTestId(h1Title).tagName).toBe('H1')
  expect(getByTestId(h3Title).tagName).toBe('H1')
  expect(getByTestId(h3Title).getAttribute('as')).toBe('h3')
})

test('forward as - string base', () => {
  const Title = styled('h1', {
    shouldForwardProp: prop => prop !== 'theme'
  })`
    color: green;
  `

  let h1Title = id()
  let h1WithAsProp = id()

  let { getByTestId } = render(
    <article>
      <Title data-testid={h1Title}>My Title</Title>
      <Title data-testid={h1WithAsProp} as="h2">
        My Subtitle
      </Title>
    </article>
  )

  expect(getByTestId(h1Title).tagName).toBe('H1')
  expect(getByTestId(h1WithAsProp).tagName).toBe('H1')
  expect(getByTestId(h1WithAsProp).getAttribute('as')).toBe('h2')
})

test('forward as - composite base', () => {
  const Title = styled(props => <h1 {...props} />, {
    shouldForwardProp: prop => prop !== 'theme'
  })`
    color: green;
  `
  let h1Title = id()
  let h1WithAsProp = id()

  let { getByTestId } = render(
    <article>
      <Title data-testid={h1Title}>My Title</Title>
      <Title data-testid={h1WithAsProp} as="h2">
        My Subtitle
      </Title>
    </article>
  )

  expect(getByTestId(h1Title).tagName).toBe('H1')
  expect(getByTestId(h1WithAsProp).tagName).toBe('H1')
  expect(getByTestId(h1WithAsProp).getAttribute('as')).toBe('h2')
})
