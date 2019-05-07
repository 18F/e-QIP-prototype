import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'
import { militaryStatesValues } from 'constants/enums/militaryStates'
import postOfficeCities from 'constants/enums/postOfficeCities'

import { isPO, isUS } from 'helpers/location'
import { zipCodePattern, notPOBoxPattern } from 'constants/patterns'

const location = {
  street: (value, attributes, attributeName, options) => {
    if (options.allowPOBox) {
      return { presence: true }
    }

    return {
      presence: true,
      format: { pattern: notPOBoxPattern },
    }
  },
  city: (value, attributes = {}) => {
    if (isPO(attributes)) {
      return {
        presence: true,
        inclusion: postOfficeCities,
      }
    }

    return {
      presence: true,
      length: {
        minimum: 2,
        maximum: 100,
      },
    }
  },
  state: (value, attributes = {}) => {
    if (isPO(attributes)) {
      return {
        presence: true,
        inclusion: militaryStatesValues,
      }
    }

    if (isUS(attributes)) {
      return {
        presence: true,
        inclusion: [...usStatesValues, ...usTerritoriesValues],
      }
    }

    return { requireEmpty: true }
  },
  zipcode: {
    presence: true,
    format: { pattern: zipCodePattern },
    zipcode: true, // zipcode + state validator
  },
  country: { presence: true },
  county: { presence: true },
}

export default location
