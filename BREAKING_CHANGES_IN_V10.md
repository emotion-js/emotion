# Breaking Changes

- Only supports react@16.3 and above(+ preact)
- functions in interpolations are stringified in css and cx calls(probably won't affect you very much, there's a warning about it in v9)
- `create-emotion-styled` is gone, use the new styled api and a provider
- The css prop doesn't work via the babel plugin. `jsx` can be manually imported from `@emotion/core` or [babel-plugin-jsx-pragmatic](https://github.com/jmm/babel-plugin-jsx-pragmatic) can be used. (should we make a babel preset for that?)
- MORE STUFF THAT I CAN'T REMEMBER RIGHT NOW
- emotion will not be stored on the global object so create-emotion only accepts 1 argument, the options
- channel and createBroadcast from emotion-theming no longer exist
- extractStatic is gone
- create-emotion-server accepts the cache instead of the emotion instance
- jest-emotion no longer accepts an emotion instance, only the options arg, it also requires a DOM now
