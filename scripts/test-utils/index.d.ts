/// <reference types="jest" />

interface Flags {
  production: boolean
}

declare global {
  namespace jest {
    interface It {
      gate(flags: Flags): It
    }
  }
}

export {}
