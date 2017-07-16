import { css as magic } from '../index'

export { flush, css, injectGlobal, fontFace, keyframes, hydrate, objStyle } from '../index'

const styled = (tag, cls, vars = [], content) => {
  return {
    cls: '.' + cls,
    functional: true,
    render (h, context) {
      const getValue = v => (v && typeof v === 'function' ? v(context.props) : v.cls || v)
      const className = magic(
        cls.map(getValue),
        vars.map(getValue),
        content
      )
      return h(
        tag,
        {
          ...context.data,
          class: [context.data.class, className]
        },
        context.children
      )
    }
  }
}

export default styled
