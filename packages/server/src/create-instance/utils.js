// @flow

export function generateStyleTag(
  cssKey: string,
  ids: string,
  styles: string,
  nonceString: string
) {
  return `<style data-emotion="${cssKey} ${ids.substring(
    1
  )}"${nonceString}>${styles}</style>`
}
