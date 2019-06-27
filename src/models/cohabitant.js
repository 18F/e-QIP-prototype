import name from 'models/shared/name'
import birthplaceWithoutCounty from 'models/shared/locations/birthplaceWithoutCounty'
import foreignBornDocument from 'models/foreignBornDocument'

import { countryString } from 'validators/location'
import { DEFAULT_LATEST } from 'constants/dateLimits'

export const otherName = {
  OtherName: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  // TODO from must be >= person's DOB, to <= NOW
  DatesUsed: { presence: true, daterange: true },
}

const cohabitant = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  // TODO >= 200 years ago, <= NOW
  Birthdate: {
    presence: true,
    date: true,
  },
  BirthPlace: {
    presence: true,
    location: { validator: birthplaceWithoutCounty },
  },
  SSN: {
    presence: true,
    ssn: true,
  },
  // TODO country
  Citizenship: {
    presence: true,
    country: true,
  },
  OtherNames: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.Birthdate) dateLimits.earliest = attributes.Birthdate

    return {
      presence: true,
      branchCollection: {
        validator: otherName,
        ...dateLimits,
      },
    }
  },
  // TODO date >= DOB and person's DOB, <= NOW
  CohabitationBegan: {
    presence: true, date: true,
  },
  ForeignBornDocument: (value, attributes = {}) => {
    if (attributes.BirthPlace
      && attributes.BirthPlace.country
      && countryString(attributes.BirthPlace.country) !== 'United States') {
      return {
        presence: true,
        model: { validator: foreignBornDocument },
      }
    }

    return {}
  },
}

export default cohabitant
