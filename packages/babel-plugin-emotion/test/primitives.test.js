// @flow

import { createInlineTests } from './util'

const cases = {
  'does not change to a call expression when beginning with a upper case letter': {
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
  },
  'does not change call expressions': {
    code: `
    styled('SomeFakeComponent')\`color: hotpink;\`
    styled('SomeFakeComponent')({})
    `
  }
}

createInlineTests('styled inline', cases)
