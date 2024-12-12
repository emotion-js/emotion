import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import renderer from 'react-test-renderer'
import { css } from '@emotion/css'
import styled from '@emotion/styled'

let consoleError = console.error

afterEach(() => {
  console.error = consoleError
})

describe('css', () => {
  test('random expression', async () => {
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
    const tree = (
      await act(() => renderer.create(<div className={cls2} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composition', async () => {
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
    const tree = (
      await act(() => renderer.create(<div className={cls2} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles objects', async () => {
    const cls1 = css({
      float: 'left',
      display: 'flex',
      color: `${'blue'}`,
      fontSize: `${'20px'}`,
      height: 50,
      width: 20
    })
    const tree = (
      await act(() => renderer.create(<div className={cls1} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composition with objects', async () => {
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

    const tree = (
      await act(() => renderer.create(<div className={cls2} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('@supports', async () => {
    const cls1 = css`
      @supports (display: grid) {
        display: grid;
      }
    `
    const tree = (
      await act(() => renderer.create(<div className={cls1} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('nested array', async () => {
    const cls1 = css([[{ display: 'flex' }]])
    const tree = (
      await act(() => renderer.create(<div className={cls1} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('composition stuff', async () => {
    const cls1 = css({ justifyContent: 'center' })
    const cls2 = css([cls1])
    const tree = (
      await act(() => renderer.create(<div className={cls1} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
    const tree2 = (
      await act(() => renderer.create(<div className={cls2} />))
    ).toJSON()
    expect(tree2).toMatchSnapshot()
  })
  test('null rule', async () => {
    const cls1 = css()

    const tree = (
      await act(() => renderer.create(<div className={cls1} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('no dynamic', async () => {
    const H1 = styled('h1')`
      float: left;
    `

    const tree = (
      await act(() => renderer.create(<H1>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('object as style', async () => {
    const H1 = styled('h1')(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const tree = (
      await act(() =>
        renderer.create(
          <H1 fontSize={20} flex={1}>
            hello world
          </H1>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('component as selectors (object syntax)', async () => {
    const fontSize = '20px'
    const H1 = styled('h1')({ fontSize })
    const Thing = styled('div')({
      display: 'flex',
      [String(H1)]: {
        color: 'green'
      }
    })

    const spy = jest.fn()
    console.error = spy

    expect(
      act(() =>
        renderer.create(
          <Thing>
            hello <H1>This will be green</H1> world
          </Thing>
        )
      )
    ).rejects.toThrowErrorMatchingSnapshot()

    expect(spy.mock.calls.length).toBe(1)
    expect(spy.mock.calls[0][0].split('\n')[0]).toMatchSnapshot()
  })
  test('component selectors without target', async () => {
    const SomeComponent = styled('div')`
      color: blue;
    `

    expect(() => {
      css`
        ${SomeComponent} {
          color: red;
        }
      `
    }).toThrowErrorMatchingSnapshot()
  })
  test('glamorous style api & composition', async () => {
    const H1 = styled('h1')(props => ({ fontSize: props.fontSize }))
    const H2 = styled(H1)(props => ({ flex: props.flex }), {
      display: 'flex'
    })

    const tree = (
      await act(() =>
        renderer.create(
          <H2 fontSize={20} flex={1}>
            hello world
          </H2>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('random expressions undefined return', async () => {
    const H1 = styled('h1')`
      ${props =>
        props.prop &&
        css`
          font-size: 1rem;
        `};
      color: green;
    `

    const tree = (
      await act(() =>
        renderer.create(<H1 className={'legacy__class'}>hello world</H1>)
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', async () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${({ scale }) => fontSize * scale + 'px'};
    `

    const tree = (
      await act(() =>
        renderer.create(
          <H2 scale={2} className={'legacy__class'}>
            hello world
          </H2>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('name with class component', async () => {
    class SomeComponent extends React.Component /* <{ className: string }> */ {
      render() {
        return <div className={this.props.className} />
      }
    }
    const StyledComponent = styled(SomeComponent)`
      color: hotpink;
    `
    expect(StyledComponent.displayName).toBe(`Styled(SomeComponent)`)
  })
  test('styled does not throw on toString without target', async () => {
    expect(() => {
      styled('div')().toString()
    }).not.toThrow()
  })
  test('styled does not throw an error when certain properties are accessed', async () => {
    expect(() => {
      /* eslint-disable no-unused-expressions */
      // eslint-disable-next-line no-proto
      styled.__proto__
      styled.prototype
      styled.name
      styled.displayName
      /* eslint-enable no-unused-expressions */
    }).not.toThrow()
  })
})
