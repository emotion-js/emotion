export const extractCritical: (
  html: string
) => {
  html: string
  ids: any[]
  css: string
}
export const renderStylesToString: (html: string) => string
export const renderStylesToNodeStream: () => any
