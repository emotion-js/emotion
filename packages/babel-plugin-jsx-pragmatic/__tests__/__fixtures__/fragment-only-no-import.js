// When using Emotion, React does not need to be in scope except
// when using fragment shorthand. This plugin should add a react
// import when using the `fragment` option, so we can ignore the
// linting error here.
// eslint-disable-next-line react/react-in-jsx-scope
const F = () => <></>
