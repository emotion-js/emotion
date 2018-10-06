import * as React from 'react';

/**
 * @desc Utility type for getting props type of React component.
 */
export type PropsOf<Tag extends React.ComponentType<any>> =
  Tag extends React.SFC<infer Props> ?
  Props :
  Tag extends React.ComponentClass<infer Props> ?
  Props :
  never
  ;

export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>;
