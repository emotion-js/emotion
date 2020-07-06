module.exports = () => {
  return {
    presets: [
      [require.resolve('@babel/preset-env'), { loose: true }],
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve(
        'babel-plugin-add-basic-constructor-for-react-components'
      ),
      require.resolve('babel-plugin-fix-dce-for-classes-with-statics'),
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('babel-plugin-codegen'),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        { version: require('@babel/runtime/package.json').version }
      ],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true }
      ]
    ]
  }
}
