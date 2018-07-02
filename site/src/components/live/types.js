// @flow
export type Scope = { [string]: mixed }

export type Compiler = (code: string) => Promise<string>
