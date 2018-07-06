// @flow

import { createInlineTests } from './util'

const cases = {
  'does not change to a call expression when': {
    code: `
    styled.View\`color: hotpink;\`
    styled.View({})
    `
  },
  'other name with emotion-primitives': {
    code: `
    import someOtherName from 'emotion-primitives'
    someOtherName.View\`color: hotpink;\`
    someOtherName.View({})
    `
  }
}

createInlineTests('styled inline', cases)
