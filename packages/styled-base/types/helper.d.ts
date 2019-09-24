import * as React from 'react'

/**
 * @desc Utility type for getting props type of React component.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>

// We need to use this version of Omit as it's distributive (Will preserve unions)
export type Omit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never

export type MakeOptional<T, K extends string | number | symbol> = Omit<T, K> &
  Partial<Pick<T, Extract<keyof T, K>>>
