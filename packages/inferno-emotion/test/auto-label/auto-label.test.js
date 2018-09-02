import 'test-utils/legacy-env'
import * as Inferno from 'inferno'
import styled, { flush, css } from 'inferno-emotion'
import { createElement } from 'inferno-create-element'
import { renderToSnapshot } from 'inferno-test-utils'
import { hiDPI, lighten, modularScale } from 'polished'

const React = {
  ...Inferno,
  createElement
}

describe('styled with autoLabel', () => {
  beforeEach(() => flush())
  test('composition', () => {
    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      ${cssA};
      color: red;
    `

    const BlueH1 = styled('h1')`
      ${cssB};
      color: blue;
      font-size: ${fontSize};
    `

    const FinalH2 = styled(BlueH1)`
      font-size: 32px;
    `

    const tree = renderToSnapshot(
      <FinalH2 scale={2} className={'legacy__class'}>
        hello world
      </FinalH2>
    )

    expect(tree).toMatchSnapshot()
    // Not defined why?
    //expect(sheet).toMatchSnapshot()
  })

  test('composition with objects', () => {
    const cssA = {
      color: lighten(0.2, '#000'),
      fontSize: modularScale(1),
      [hiDPI(1.5)
        .replace('\n', ' ')
        .trim()]: { fontSize: modularScale(1.25) }
    }

    const cssB = css`
      ${cssA};
      height: 64px;
    `

    const H1 = styled('h1')`
      ${cssB};
      font-size: ${modularScale(4)};
    `

    const H2 = styled(H1)`
      font-size: 32px;
    `

    const tree = renderToSnapshot(
      <H2 scale={2} className={'legacy__class'}>
        hello world
      </H2>
    )

    expect(tree).toMatchSnapshot()
    // Not defined why?
    //expect(sheet).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = css`
      background-color: #7fc8d6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        ${squirtleBlueBackground};
        background-color: '#343a40';
        flex-direction: column;
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    const tree = renderToSnapshot(<ColumnContent />)

    expect(tree).toMatchSnapshot()
    // Not defined why?
    //expect(sheet).toMatchSnapshot()
  })
  /*
   * This one is also failing
   * Looks like options.label is not set, is this a babel-plugin thing?
   * 
  test('displayName', () => {
    const SomeComponent = styled('div')`
      color: hotpink;
    `
    
    expect(SomeComponent.displayName).toBe('SomeComponent')
  })
  */
})
