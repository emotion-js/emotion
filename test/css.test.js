/* eslint-env jest */
import { sheet, css } from '../src/index'

describe('css', () => {
  test('composes', () => {
    const cls1 = css`
      display: flex;
    `
    const cls2 = css`
      composes: ${cls1};
      justifyContent: center;
    `
    expect(cls1).toMatchSnapshot()
    expect(cls2).toMatchSnapshot()
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })

  test('handles objects', () => {
    const cls1 = css({display: 'flex'})
    expect(cls1).toMatchSnapshot()
  })

  test('composes with objects', () => {
    const cls1 = css({ display: 'flex' })
    const cls2 = css`
      composes: ${cls1};
      justifyContent: center;
    `
    expect(cls1).toMatchSnapshot()
    expect(cls2).toMatchSnapshot()
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
})
