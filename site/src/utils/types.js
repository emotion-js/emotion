export type Location = {
  hash: string,
  key: string,
  pathname: string
}

export type Match = {
  isExact: boolean,
  params: Object,
  path: string,
  url: string
}

export type HASTText = {
  type: 'text',
  value: string
}

export type HASTElement = {
  type: 'element',
  tagName: string,
  properties: Object,
  children: Array<HASTElement | HASTText>
}

export type HASTRoot = {
  type: 'root',
  children: Array<HASTElement | HASTText>
}
