// @flow

export const PLACEHOLDER_REGEX = /xxx(\S)xxx/gm
export const makePlaceholder = (p1: string | number): string => `xxx${p1}xxx`
