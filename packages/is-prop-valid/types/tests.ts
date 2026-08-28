import isPropValid from '@emotion/is-prop-valid'

isPropValid('ref')

// @ts-expect-error
isPropValid()
// @ts-expect-error
isPropValid({})
// @ts-expect-error
isPropValid('ref', 'def')
