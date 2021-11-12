const tickledCssProps = new WeakMap()

export const getTickledClassName = cssProp => tickledCssProps.get(cssProp)

export const tickle = wrapper => {
  const isShallow = typeof wrapper.dive === 'function'

  wrapper.find('EmotionCssPropInternal').forEach(el => {
    const cssProp = el.props().css

    if (!cssProp) {
      return
    }

    const rendered = (isShallow ? el.dive() : el.children()).last()
    const unwrapped =
      rendered.type() === Symbol.for('react.fragment')
        ? rendered.children().last()
        : rendered
    tickledCssProps.set(cssProp, unwrapped.props().className)
  })
  return wrapper
}
