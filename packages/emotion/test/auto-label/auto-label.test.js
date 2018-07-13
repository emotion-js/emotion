// @flow
import 'test-utils/legacy-env'
import React from 'react'
import renderer from 'react-test-renderer'
import { css, flush, sheet, cx } from 'emotion'

describe('meta', () => {
  afterEach(() => flush())
  test('css generated class name should have the correct id', () => {
    const cls1 = css`
      color: blue;
    `
    const cls2 = css`
      & .${cls1} {
        color: red;
      }
    `
    const tree = renderer
      .create(
        <div className={cls2}>
          <div className={cls1} />
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('css prop correctly adds the id', () => {
    const SFC = () => {
      return (
        <div
          css={`
            display: flex;
          `}
        >
          Hello
        </div>
      )
    }

    class ClsComp extends React.Component<*> {
      render() {
        return (
          <div
            css={`
              display: grid;
            `}
          >
            Hello
          </div>
        )
      }
    }

    const hoc = W =>
      class extends React.Component<*> {
        render() {
          return (
            <div
              css={`
                display: block;
              `}
            >
              <W {...this.props} />
            </div>
          )
        }
      }

    const Wrapped = hoc(ClsComp)

    const sfcTree = renderer.create(<SFC>Hello</SFC>).toJSON()
    expect(sfcTree).toMatchSnapshot()

    const clsCompTree = renderer.create(<ClsComp>Hello</ClsComp>).toJSON()
    expect(clsCompTree).toMatchSnapshot()

    const hocTree = renderer.create(<Wrapped>Hello</Wrapped>).toJSON()
    expect(hocTree).toMatchSnapshot()

    expect(sheet).toMatchSnapshot()
  })
  test('multiple classes with the same styles', () => {
    const cls1 = css`
      display: flex;
    `
    const cls2 = css`
      display: flex;
    `
    const tree = renderer
      .create(
        <div>
          <div className={cls1} />
          <div className={cls2} />
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('manually use label property', () => {
    const cls1 = css`
      color: blue;
      label: wow;
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('labels compose', () => {
    const cls1 = css`
      color: blue;
    `
    const cls2 = css`
      color: hotpink;
    `
    expect(cls1).toContain('cls1')
    expect(cls2).toContain('cls2')
    expect(cx(cls1, cls2)).toContain('cls1-cls2')
  })
})
