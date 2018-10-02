import 'test-utils/legacy-env'
import React from 'react'
import * as renderer from 'test-utils/compat-render-json'
import styled from 'react-emotion'

describe('`as` prop', () => {
  test('string base - string as', () => {
    const Title = styled('h1')`
      color: green;
    `

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Title as="h2">My Subtitle</Title>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('styled string base - string as', () => {
    const Title = styled('h1')`
      color: green;
    `

    const Subtitle = styled(Title)`
      font-weight: 100;
    `

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Subtitle>My Subtitle</Subtitle>
          <Subtitle as="h3">My smaller Subtitle</Subtitle>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composite base - string as', () => {
    const Title = styled(props => <h1 {...props} />)`
      color: green;
    `

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Title as="h3">My Subtitle</Title>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('forward as - string base', () => {
    const Title = styled('h1', {
      shouldForwardProp: prop => prop !== 'theme'
    })`
      color: green;
    `

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Title as="h2">My Subtitle</Title>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('forward as - composite base', () => {
    const Title = styled(props => <h1 {...props} />, {
      shouldForwardProp: prop => prop !== 'theme'
    })`
      color: green;
    `

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Title as="h2">My Subtitle</Title>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
