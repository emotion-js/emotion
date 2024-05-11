import * as React from 'react'

const isBrowser = typeof document !== 'undefined'

const syncFallback = create => create()

const useInsertionEffect = React['useInsertion' + 'Effect']
  ? React['useInsertion' + 'Effect']
  : false

export const useInsertionEffectAlwaysWithSyncFallback = !isBrowser
  ? syncFallback
  : useInsertionEffect || syncFallback

export const useInsertionEffectWithLayoutFallback =
  useInsertionEffect || React.useLayoutEffect
