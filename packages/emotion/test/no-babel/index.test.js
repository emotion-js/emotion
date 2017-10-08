import React from 'react'
import renderer from 'react-test-renderer'
import { css } from 'emotion'
import styled from 'react-emotion'

describe('css', () => {
  test('random expression', () => {
    const cls2 = css`
      font-size: 20px;
      @media (min-width: 420px) {
        color: blue;
        ${css`
          width: 96px;
          height: 96px;
        `};
        line-height: 40px;
      }
      background: green;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composition', () => {
    const cls1 = css`
      display: flex;
      &:hover {
        color: hotpink;
      }
    `
    const cls2 = css`
      ${cls1};
      justify-content: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles objects', () => {
    const cls1 = css({
      float: 'left',
      display: 'flex',
      color: `${'blue'}`,
      fontSize: `${'20px'}`,
      height: 50,
      width: 20
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composition with objects', () => {
    const cls1 = css({
      display: 'flex',
      width: 30,
      height: 'calc(40vw - 50px)',
      '&:hover': { color: 'blue' },
      ':after': {
        content: '" "',
        color: 'red'
      },
      '@media(min-width: 420px)': {
        color: 'green'
      }
    })
    const cls2 = css`
      ${cls1};
      justify-content: center;
    `

    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('@supports', () => {
    const cls1 = css`@supports (display: grid) {display: grid;}`
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('nested array', () => {
    const cls1 = css([[{ display: 'flex' }]])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('composition stuff', () => {
    const cls1 = css({ justifyContent: 'center' })
    const cls2 = css([cls1])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    const tree2 = renderer.create(<div className={cls2} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })
  test('null rule', () => {
    const cls1 = css()

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('no dynamic', () => {
    const H1 = styled('h1')`float: left;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('object as style', () => {
    const H1 = styled('h1')(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const tree = renderer
      .create(
        <H1 fontSize={20} flex={1}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('glamorous style api & composition', () => {
    const H1 = styled('h1')(props => ({ fontSize: props.fontSize }))
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
  test('random expressions undefined return', () => {
    const H1 = styled('h1')`
      ${props => props.prop && css`font-size: 1rem;`};
      color: green;
    `

    const tree = renderer
      .create(<H1 className={'legacy__class'}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`font-size: ${fontSize + 'px'};`

    const H2 = styled(H1)`font-size: ${({ scale }) => fontSize * scale + 'px'};`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
