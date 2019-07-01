import address from 'models/shared/locations/address'

const unauthorizedTech = {
  // TODO >= DOB, <= NOW
  Date: { presence: true, date: true },
  Incident: { presence: true, hasValue: true },
  Location: { presence: true, location: { validator: address } },
  Action: { presence: true, hasValue: true },
}

export default unauthorizedTech
