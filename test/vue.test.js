/* eslint-disable no-new */
/* eslint-env jest */
import Vue from 'vue/dist/vue'
import { sheet } from '../src/index'
import styled from '../src/vue'

const StyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

Vue.component('styled-component', StyledComponent)

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
  test('creates the correct styles', () => {
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
})
