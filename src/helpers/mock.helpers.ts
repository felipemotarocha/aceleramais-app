import MockAdapter from 'axios-mock-adapter'

import api from '~api/axios.api'

const MockHelpers = {
  generateAxiosMock: () => {
    return new MockAdapter(api)
  }
}

export default MockHelpers
