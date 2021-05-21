import css from './css'

/*
type Keyframes = {|
  name: string,
  styles: string,
  anim: 1,
  toString: () => string
|} & string
*/

export const keyframes = (...args) /*: Keyframes */ => {
  let insertable = css(...args)
  const name = `animation-${insertable.name}`
  return {
    name,
    styles: `@keyframes ${name}{${insertable.styles}}`,
    anim: 1,
    toString() {
      return `_EMO_${this.name}_${this.styles}_EMO_`
    }
  }
}
