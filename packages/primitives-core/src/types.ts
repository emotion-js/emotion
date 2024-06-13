type NamedStyles<T> = { [P in keyof T]: unknown }

// This is based on the StyleSheet type from @types/react-native
export interface AbstractStyleSheet {
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): T

  flatten(style?: unknown[]): unknown
}
