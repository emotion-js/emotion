import 'test-utils/enzyme-env'
/** @jsx jsx */

import jestInCase from 'jest-in-case'
import * as enzyme from 'enzyme'
import {
  __unsafe_useEmotionCache,
  css,
  jsx,
  ThemeProvider,
  EmotionCache
} from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import toJson from 'enzyme-to-json'

import { matchers } from '@emotion/jest'
import * as serializer from '@emotion/jest/enzyme-serializer'

afterEach(() => {
  let cache
  function GetCache() {
    cache = __unsafe_useEmotionCache()
    return null
  }
  enzyme.shallow(<GetCache />)

  cache.registered = {}
  cache.inserted = {}
  cache.sheet.flush()
})

const isReact16 = React.version.split('.')[0] === '16'

expect.extend(matchers)
expect.addSnapshotSerializer(serializer)

const identity = v => v

const cases = {
  basic: {
    render() {
      const Greeting = ({ children }) => (
        <div css={{ backgroundColor: 'red' }}>{children}</div>
      )
      return <Greeting>hello</Greeting>
    }
  },
  styled: {
    render() {
      const Greeting = styled.div`
        background-color: red;
      `
      return <Greeting>Hello</Greeting>
    }
  },
  'styled with css prop': {
    render() {
      const style1 = css`
        background-color: black;
      `
      const Button = styled.button`
        color: red;
      `
      return <Button css={style1}>iChenLei</Button>
    }
  },
  nested: {
    render() {
      const Greeting = ({ children }) => (
        <div css={{ backgroundColor: 'red' }}>{children}</div>
      )
      return (
        <div>
          <Greeting>hello</Greeting>
        </div>
      )
    }
  },
  'nested styled': {
    render() {
      const Greeting = styled.div`
        background-color: red;
      `
      return (
        <div>
          <Greeting>Hello</Greeting>
        </div>
      )
    }
  },
  'nested styled with css prop': {
    render() {
      const style1 = css`
        background-color: black;
      `
      const Button = styled.button`
        color: red;
      `
      return (
        <div>
          <Button css={style1}>iChenLei</Button>
        </div>
      )
    }
  },
  'empty styled': {
    render() {
      const Greeting = styled.div``
      return <Greeting>Hello</Greeting>
    }
  },
  'with styles on top level': {
    render() {
      const Greeting = ({ children, className }) => (
        <div className={className}>{children}</div>
      )
      return <Greeting css={{ backgroundColor: 'red' }}>Hello</Greeting>
    }
  },
  'with prop containing css element': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )
      return (
        <Greeting content={<p css={{ backgroundColor: 'blue' }}>Hello</p>}>
          World!
        </Greeting>
      )
    }
  },
  'with prop containing regular element': {
    render() {
      const Test = ({ element }) => element
      return <Test element={<button>Foo</button>} />
    }
  },
  'with prop containing css element not at the top level': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )

      return (
        <div>
          <Greeting
            content={
              <p id="something" css={{ backgroundColor: 'blue' }}>
                Hello
              </p>
            }
          >
            World!
          </Greeting>
        </div>
      )
    }
  },
  'with prop containing css element with other props': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )

      return (
        <Greeting
          content={
            <p id="something" css={{ backgroundColor: 'blue' }}>
              Hello
            </p>
          }
        >
          World!
        </Greeting>
      )
    }
  },
  'with prop containing css element with other label': {
    render() {
      const Thing = ({ content, children }) => {
        return children
      }
      const Greeting = ({ children, content }) => (
        <Thing content={<div css={{ color: 'hotpink' }} />}>
          {content} {children}
        </Thing>
      )

      return (
        <Greeting
          content={
            <p id="something" css={{ backgroundColor: 'blue' }}>
              Hello
            </p>
          }
        >
          World!
        </Greeting>
      )
    }
  },
  'with array of styles as css prop': {
    render() {
      const style1 = css`
        background-color: black;
      `

      const style2 = css`
        color: white;
      `

      return <div css={[style1, style2]}>Test content</div>
    }
  },
  'with array of styles in a composite inner child': {
    render() {
      const style1 = css`
        background-color: black;
      `

      const style2 = css`
        color: white;
      `

      function Inner(props) {
        return <span {...props} />
      }

      return (
        <div>
          <Inner css={[style1, style2]}>Test content</Inner>
        </div>
      )
    }
  },
  'conditional styles': {
    render() {
      const style1 = css`
        background-color: black;
      `

      const style2 = css`
        color: white;
      `

      return (
        <div css={[style1, false && style2, undefined && style2]}>
          <span css={null && style2}>Test content</span>
        </div>
      )
    }
  },
  theming: {
    render() {
      const Button = styled.button`
        color: ${props => props.theme.main ?? 'red'};
        border: 2px solid ${props => props.theme.main ?? 'red'};
      `

      const theme = {
        main: 'blue'
      }

      return (
        <div>
          <Button>Normal</Button>
          <ThemeProvider theme={theme}>
            <Button>Themed</Button>
          </ThemeProvider>
        </div>
      )
    }
  },
  displayName: {
    render() {
      const Comp = props => <div {...props}>Hello</div>
      Comp.displayName = 'CustomDisplayName'
      return <Comp css={{ color: 'hotpink' }} />
    }
  },
  'nested displayName': {
    render() {
      const Comp = props => <div {...props}>Hello</div>
      Comp.displayName = 'CustomDisplayName'
      return (
        <div>
          <Comp css={{ color: 'hotpink' }} />
        </div>
      )
    }
  },
  'parent and child using css property': {
    render() {
      const parentStyle = css`
        background-color: black;
      `

      const childStyle = css`
        color: white;
      `

      return (
        <div css={parentStyle}>
          Test content
          <div css={childStyle} />
        </div>
      )
    }
  },
  'fragment with multiple css prop elements': {
    render() {
      const Component = () => {
        return (
          <>
            <div css={{ backgroundColor: 'hotpink' }} />
            <div css={{ backgroundColor: 'green' }} />
            <div css={{ backgroundColor: 'blue' }} />
          </>
        )
      }
      return <Component />
    }
  },
  'multiple selected components': {
    selector: tree =>
      // with simple `tree.find('[data-item]')` we get elements twice with `mount` since it selects both the css prop element and the host element
      tree.findWhere(
        n => typeof n.type() !== 'string' && n.props()['data-item']
      ),
    render() {
      return (
        <ul>
          <li data-item css={{ backgroundColor: 'hotpink' }}>
            {'hello'}
          </li>
          <li data-item css={{ backgroundColor: 'blue' }}>
            {'beautiful'}
          </li>
          <li data-item css={{ backgroundColor: 'green' }}>
            {'world'}
          </li>
        </ul>
      )
    }
  },
  'unmatched selector': {
    selector: tree => tree.find('div'),
    render() {
      return (
        <ul>
          <li css={{ backgroundColor: 'hotpink' }}>{'hello'}</li>
          <li css={{ backgroundColor: 'blue' }}>{'beautiful'}</li>
          <li css={{ backgroundColor: 'green' }}>{'world'}</li>
        </ul>
      )
    }
  }
}

;(isReact16 ? describe : describe.skip)('enzyme', () => {
  jestInCase(
    'shallow',
    ({ render, selector = identity }) => {
      const wrapper = enzyme.shallow(render())
      expect(selector(wrapper)).toMatchSnapshot()
    },
    cases
  )

  jestInCase(
    'mount',
    ({ render, selector = identity }) => {
      const wrapper = enzyme.mount(render())
      expect(selector(wrapper)).toMatchSnapshot()
    },
    cases
  )

  test('with prop containing css element in fragment', () => {
    const FragmentComponent = () => (
      <React.Fragment>
        x<div css={{ backgroundColor: 'blue' }}>y</div>
      </React.Fragment>
    )

    const wrapper = enzyme.mount(
      <div>
        <FragmentComponent />
      </div>
    )

    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot()
  })

  test('toHaveStyleRule on react.element', () => {
    const tree = enzyme.mount(
      <ul>
        <li css={{ backgroundColor: 'hotpink' }}>hello</li>
      </ul>
    )
    expect(tree.find('li').get(0)).toHaveStyleRule(
      'background-color',
      'hotpink'
    )
  })
})
