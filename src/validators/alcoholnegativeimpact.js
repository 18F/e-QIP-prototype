import { validateModel, hasYesOrNo } from 'models/validate'
import alcoholNegativeImpact from 'models/alcoholNegativeImpact'

export const validateNegativeImpact = data => (
  validateModel(data, alcoholNegativeImpact) === true
)

export const validateNegativeImpacts = (data) => {
  const negativeImpactsModel = {
    HasImpacts: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasImpacts && attributes.HasImpacts.value === 'Yes') {
        return { presence: true, accordion: { validator: alcoholNegativeImpact } }
      }
      return {}
    },
  }

  return validateModel(data, negativeImpactsModel) === true
}

export default class NegativeImpactsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateNegativeImpacts(this.data)
  }
}

export class NegativeImpactValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateNegativeImpact(this.data)
  }
}
