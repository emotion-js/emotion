/*
Vendored from babel-plugin-macros v3.1.0
https://github.com/kentcdodds/babel-plugin-macros/blob/v3.1.0/src/index.js
The MIT License (MIT) — Copyright (c) 2020 Kent C. Dodds

Only `createMacro` and `MacroError` are vendored — @emotion/babel-plugin never
used the config-loading (cosmiconfig) or module-resolution features of
babel-plugin-macros.

The `isBabelMacro` and `options` properties stamped on the wrapper are part of
the babel-plugin-macros interop contract: the real babel-plugin-macros package
checks `macro.isBabelMacro` and destructures `configName` from `macro.options`
when users consume our `/macro` entrypoints (e.g. `@emotion/react/macro`)
through it, such as in Create React App. `options` must always be an object.
*/

export class MacroError extends Error {
  constructor(message /*: string */) {
    super(message)
    this.name = 'MacroError'
    /* istanbul ignore else */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export function createMacro(macro /*: Function */, options /*: Object */ = {}) {
  if (options.configName === 'options') {
    throw new Error(
      `You cannot use the configName "options". It is reserved for babel-plugin-macros.`
    )
  }
  macroWrapper.isBabelMacro = true
  macroWrapper.options = options
  return macroWrapper

  function macroWrapper(args /*: Object */) {
    const { source, isBabelMacrosCall } = args
    if (!isBabelMacrosCall) {
      throw new MacroError(
        `The macro you imported from "${source}" is being executed outside the context of compilation with babel-plugin-macros (or @emotion/babel-plugin). ` +
          `This indicates that you don't have the babel plugin "babel-plugin-macros" (or "@emotion/babel-plugin") configured correctly. ` +
          `Please see the documentation for how to configure babel-plugin-macros properly: ` +
          'https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md'
      )
    }
    return macro(args)
  }
}
