// We need to use this version of Omit as it's distributive (Will preserve unions)
export type DistributiveOmit<T, U> = T extends any
  ? Pick<T, Exclude<keyof T, U>>
  : never
