module.exports = (api, options = {}) => {
  return {
    presets: [
      [require.resolve('@babel/preset-env'), { loose: true }],
      [
        require.resolve('@babel/preset-react'),
        options.runtime === 'automatic'
          ? {
              runtime: options.runtime,
              importSource: '@emotion/react',
              development: options.development
            }
          : {}
      ]
    ],
    plugins: [
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      require.resolve('babel-plugin-codegen'),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        { version: require('@babel/runtime/package.json').version }
      ],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true }
      ],
      options.useEmotionPlugin && [
        require.resolve('@emotion/babel-plugin'),
        {
          ...('sourceMap' in options && { sourceMap: options.sourceMap })
        }
      ]
    ].filter(Boolean)
  }
}
