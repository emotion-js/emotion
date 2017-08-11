import { sheet, fontFace } from '../src/index'

describe('font-face', () => {
  test('adds font-face to sheet', () => {
    fontFace`
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'), url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2) format('woff2');
      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
    `
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
  test('adds font-face to sheet with interpolation', () => {
    const fontFamilyName = 'MyHelvetica'
    fontFace`
      font-family: ${fontFamilyName};
      src: local("Helvetica Neue Bold"),
          local("HelveticaNeue-Bold"),
          url(MgOpenModernaBold.ttf);
      font-weight: bold;
    `
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
})
