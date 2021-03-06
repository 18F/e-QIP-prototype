import { checkValue, hasYesOrNo } from 'models/validate'
import cityCountry from 'models/shared/locations/cityCountry'
import name from 'models/shared/name'
import foreignPassportTravel from 'models/foreignPassportTravel'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignPassport = {
  Country: { presence: true, country: true },
  Issued: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Location: {
    presence: true,
    location: { validator: cityCountry },
  },
  Name: {
    presence: true,
    model: { validator: name },
  },
  Number: { presence: true, hasValue: true },
  Expiration: (value, attributes) => {
    const dateLimits = {}
    if (attributes.Issued) dateLimits.earliest = attributes.Issued
    return { presence: true, date: dateLimits }
  },
  Used: { presence: true, hasValue: { validator: hasYesOrNo } },
  Countries: (value, attributes) => (
    checkValue(attributes.Used, 'Yes')
      ? {
        presence: true,
        accordion: {
          validator: foreignPassportTravel,
          ignoreBranch: true,
        },
      } : {}
  ),
}

export default foreignPassport
