/* eslint-env jest */
import { css } from '../../src/macro'
import { sheet } from '../../src'

describe('css', () => {
  test('handles more than 10 dynamic properties', () => {
    const cls1 = css`
      background: ${'white'};
      color: ${'black'};
      text-decoration: ${'underline'};
      display: ${'block'};
      border-radius: ${'3px'};
      padding: ${'25px'};
      width: ${'500px'};
      z-index: ${100};
      font-size: ${'18px'};
      text-align: ${'center'};
      border: ${'solid 1px red'};
    `

    expect(cls1).toMatchSnapshot()
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })

  test('composes with undefined values', () => {
    const cls2 = css`
      composes: ${undefined};
      justifyContent: center;
    `
    expect(cls2).toMatchSnapshot()
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })

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
    const cls1 = css({ display: 'flex' })
    expect(cls1).toMatchSnapshot()
  })

  test('composes with objects', () => {
    const cls1 = css({
      display: ['flex', 'block'],
      width: 30,
      height: 'calc(40vw - 50px)',
      ':hover': {color: 'blue'},
      ':after': {
        content: '" "',
        color: 'red'
      },
      '@media(min-width: 420px)': {
        color: 'green'
      }
    })
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
