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
