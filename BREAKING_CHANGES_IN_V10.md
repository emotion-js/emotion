# Breaking Changes

* Only supports react@16.3 and above(+ preact)
* functions in interpolations are stringified in css and cx calls(probably won't affect you very much, there's a warning about it in v9)
* `create-emotion-styled` is gone, use the new styled api and a provider
* The css prop doesn't work via the babel plugin. `jsx` can be manually imported from `@emotion/core` or [babel-plugin-jsx-pragmatic](https://github.com/jmm/babel-plugin-jsx-pragmatic) can be used. (should we make a babel preset to that?)
* MORE STUFF THAT I CAN'T REMEMBER RIGHT NOW
