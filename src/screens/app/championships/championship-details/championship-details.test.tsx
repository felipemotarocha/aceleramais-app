import React from 'react'
import axiosMock from 'axios'

import { render, waitFor } from '~helpers/test.helpers'

import ChampionshipDetailsContainer from './championship-details.container'
import ChampionshipDetailsStubs from './championship-details.stubs'

describe('Championship Details', () => {
  beforeEach(() => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: ChampionshipDetailsStubs.validResponse
    })
  })

  it('should render the header', async () => {
    const { getByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => getByText(/psgl sim racing league/i))
    await waitFor(async () => getByText(/plataforma/i))
    await waitFor(async () => getByText(/descrição/i))
    await waitFor(async () => getByText(/join us./i))
  })
})
