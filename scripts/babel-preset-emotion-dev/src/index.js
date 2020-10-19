module.exports = (api, options = {}) => {
  return {
    presets: [
      [require.resolve('@babel/preset-env'), { loose: true }],
      options.runtime === 'automatic'
        ? [
            require.resolve('@emotion/babel-preset-css-prop'),
            { runtime: 'automatic', development: options.development }
          ]
        : require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve(
        'babel-plugin-add-basic-constructor-for-react-components'
      ),
      require.resolve('babel-plugin-fix-dce-for-classes-with-statics'),
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('babel-plugin-codegen'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-transform-runtime'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true }
      ],
      options.useEmotionPlugin && [
        require.resolve('babel-plugin-emotion'),
        'sourceMap' in options ? { sourceMap: options.sourceMap } : {}
      ]
    ].filter(Boolean)
  }
}
