import axiosMock from 'axios'
import React from 'react'

import { render, waitFor } from '~helpers/test.helpers'
import RaceClassificationEditionContainer from './race-classification-edition.container'

describe('Race Classification Edition', () => {
  it('should render with empty classification', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: {
        id: '622bf07c3e649a39e43234a5',
        race: {
          championship: '622bedfbe669549ffd44d2ba',
          track: {
            name: 'Bahrain International Circuit',
            countryCode: 'BH',
            countryName: 'Bahrain',
            id: '61fdd80633035841deb311e9'
          },
          startDate: '2022-03-12T00:46:40.596Z',
          isCompleted: true,
          id: '622bedfbe669549ffd44d2ce'
        },
        classification: []
      }
    })

    const { getByText } = render(<RaceClassificationEditionContainer />)

    await waitFor(async () => {
      getByText(/editar resultados da corrida/i)

      getByText(/bahrain international circuit/i)
      getByText(/adicionar pilotos/i)

      getByText(/penalizações e bonificações/i)
    })
  })
})
