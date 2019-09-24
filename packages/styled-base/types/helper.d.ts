import * as React from 'react'

/**
 * @desc Utility type for getting props type of React component.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>
