/* eslint-disable no-new */
/* eslint-env jest */
import Vue from 'vue/dist/vue'
import { sheet } from '../src/index'
import styled from '../src/vue'

const inherit = 'inherit'

const StyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${inherit};
`

const BasedOnProps = styled.h1`font-weight: ${props => props.weight};`

const baseComponent = {
  render (h) {
    return h('div', {}, [
      h('div'),
      h('div'),
      h('h1', {}, 'some text'),
      h('div')
    ])
  }
}

const NonHtmlComponent = styled(baseComponent)`
  background-color: purple;
  color: green;
`

Vue.component('styled-component', StyledComponent)
Vue.component('based-on-props', BasedOnProps)
Vue.component('non-html-component', NonHtmlComponent)

describe('vue styled', () => {
  test('basic', async () => {
    document.body.innerHTML = `
      <div id="app">
          <styled-component></styled-component>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('with properties', async () => {
    document.body.innerHTML = `
      <div id="app">
          <styled-component aria-label="label"></styled-component>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('with class', async () => {
    document.body.innerHTML = `
      <div id="app">
          <styled-component class="some-class"></styled-component>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('with style', async () => {
    document.body.innerHTML = `
      <div id="app">
          <styled-component style="display: none"></styled-component>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('based on props', async () => {
    document.body.innerHTML = `
      <div id="app">
          <based-on-props weight="bold"></based-on-props>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('custom external component', async () => {
    document.body.innerHTML = `
      <div id="app">
          <non-html-component></non-html-component>
      </div>
    `
    new Vue({
      el: '#app'
    })

    await Vue.nextTick(() => {})
    expect(document.body.innerHTML).toMatchSnapshot()
  })
  test('creates the correct styles', () => {
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
})
