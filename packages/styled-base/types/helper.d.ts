import * as React from 'react'

/**
 * @desc Utility type for getting props type of React component.
 */
export type PropsOf<
  Tag extends React.ComponentType<any>
> = Tag extends React.SFC<infer Props>
  ? Props & React.Attributes
  : Tag extends React.ComponentClass<infer Props>
    ? (Tag extends new (...args: Array<any>) => infer Instance
        ? Props & React.ClassAttributes<Instance>
        : never)
    : never

export type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never
export type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>
