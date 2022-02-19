import * as React from 'react'

const isBrowser = typeof document !== 'undefined'

const useInsertionEffect = React['useInsertion' + 'Effect']
  ? React['useInsertion' + 'Effect']
  : function useInsertionEffect(create) {
      create()
    }

export default function useInsertionEffectMaybe(create) {
  if (!isBrowser) {
    return create()
  }
  useInsertionEffect(create)
}
