// This is based on the StyleSheet types from @types/react-native

type Falsy = undefined | null | false

interface RecursiveArray<T>
  extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> {}

type RegisteredStyle<T> = number & { __registeredStyleBrand: T }

type StyleProp<T> =
  | T
  | RegisteredStyle<T>
  | RecursiveArray<T | RegisteredStyle<T> | Falsy>
  | Falsy

type NamedStyles<T> = { [P in keyof T]: any }

export interface AbstractStyleSheet {
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): { [P in keyof T]: number }

  flatten<T>(style?: StyleProp<T>): T extends (infer U)[] ? U : T
}
