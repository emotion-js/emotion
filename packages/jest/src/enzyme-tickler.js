const tickledCssProps = new WeakMap()

export const getTickledClassName = cssProp => tickledCssProps.get(cssProp)

export const tickle = wrapper => {
  const isShallow = typeof wrapper.dive === 'function'

  wrapper.find('EmotionCssPropInternal').forEach(el => {
    const cssProp = el.props().css

    if (!cssProp) {
      return
    }

    const wrapped = (isShallow ? el.dive() : el.children()).first()
    tickledCssProps.set(cssProp, wrapped.props().className)
  })
  return wrapper
}
