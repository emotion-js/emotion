/// <reference types="jest" />

interface Flags {
  development: boolean
}

declare global {
  function gate(
    flags: Flags,
    exec: ({ test }: { test: typeof globalThis.test }) => void
  ): void
}

export {}
