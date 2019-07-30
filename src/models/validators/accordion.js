import { validate } from 'validate.js'
import { validateModel } from 'models/validate'

const accordionValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const {
    validator, length, ignoreBranch, itemsValidator,
  } = options
  if (!validator) return 'Invalid validator'

  const { items, branch } = value
  // Validate branch
  if (!ignoreBranch && (!branch || !branch.value || branch.value !== 'No')) {
    return 'Invalid branch'
  }

  if (!items || (items && items.length < 1)) return 'No items'

  // Validate item length
  if (length) {
    const lengthErrors = validateModel({ items }, { items: { length } }, { ...globalOptions })
    if (lengthErrors !== true) return lengthErrors
  }

  let itemErrors
  for (let i = 0; i < items.length; i += 1) {
    const { Item } = items[i]
    if (!Item) return 'No item'

    itemErrors = validateModel(Item, validator, { ...globalOptions, ...options })
    if (itemErrors !== true) return itemErrors
  }

  // Optional function to test against all of the items
  if (itemsValidator) {
    const itemsErrors = itemsValidator(items)
    if (itemsErrors) return itemsErrors
  }

  return null
}

export default accordionValidator
