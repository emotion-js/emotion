import * as React from 'react'

export type PropsOf<C extends React.ComponentType<any>> = C extends React.SFC<
  infer P
>
  ? P & React.Attributes
  : C extends React.ComponentClass<infer P>
    ? (C extends new (...args: Array<any>) => infer I
        ? P & React.ClassAttributes<I>
        : never)
    : never

export type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never
export type AddOptionalTo<T, U> = Omit<T, U> &
  Partial<Pick<T, Extract<keyof T, U>>>
