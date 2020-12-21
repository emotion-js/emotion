import hoistNonReactStatics$1 from 'hoist-non-react-statics'

// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = function(targetComponent, sourceComponent) {
  return hoistNonReactStatics$1(targetComponent, sourceComponent)
}

export default hoistNonReactStatics
