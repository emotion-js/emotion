export type StylisElement = {
  parent: StylisElement | null
  children: StylisElement[] | string
  root: StylisElement | null
  type: string
  props: string[] | string
  value: string
  length: number
  return: string
  line: number
  column: number
}
export type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

export type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void
