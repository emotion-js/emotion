import { css as magic } from './index'

const styled = (tag, cls, vars = [], content) => {
  return {
    functional: true,
    render (h, context) {
      const className = magic(
        cls,
        vars.map(v => (v && typeof v === 'function' ? v(context.props) : v)),
        content
      )
      return h(tag, {
        ...context.data,
        class: [context.data.class, className]
      }, context.children)
    }
  }
}

export default styled
