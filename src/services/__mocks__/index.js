import { getQueryValue } from '../api'

const api = {
  listAttachments: () => new Promise(res => res({ data: [] })),
}

export {
  api,
  getQueryValue,
}
