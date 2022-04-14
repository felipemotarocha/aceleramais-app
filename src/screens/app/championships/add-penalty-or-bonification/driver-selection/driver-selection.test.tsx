import * as React from 'react'
import Colors from '~constants/colors.constants'

import { fireEvent, render, waitFor } from '~helpers/test.helpers'
import PenaltyOrBonificationDriverSelectionContainer from './driver-selection.container'

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        type: 'bonification'
      }
    })
  }
})

describe('Penalty or Bonification Driver Selection Screen', () => {
  it('should render', async () => {
    const initialState = {
      racePenaltiesAndBonifications: {
        championshipDrivers: [
          {
            id: 'a584c71e-126d-4669-af46-67ae7e5b0e58',
            firstName: 'Charles',
            lastName: 'Leclerc',
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '622bedfbe669549ffd44d2bd'
            },
            isRegistered: false,
            bonifications: [],
            penalties: []
          },
          {
            user: {
              firstName: 'Felipe',
              lastName: 'Rocha',
              userName: 'felipe.rocha',
              profileImageUrl:
                'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/YaWOZoE596acPgLsg7CrAChrQjT2.jpeg',
              id: 'YaWOZoE596acPgLsg7CrAChrQjT2'
            },
            team: {
              name: 'Mercedes',
              color: '#03BFB5',
              id: '622bedfbe669549ffd44d2bb'
            },
            isRegistered: true
          }
        ]
      }
    }
    const { getByText, queryAllByLabelText } = render(
      <PenaltyOrBonificationDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    await waitFor(async () => {
      getByText(/adicionar bonificação/i)

      await fireEvent.press(getByText(/avançar/i))

      getByText(/selecione o piloto/i)

      getByText('Felipe')
      getByText('ROCHA')
      getByText(/felipe.rocha/i)

      getByText('Charles')
      getByText('LECLERC')

      await fireEvent.press(getByText(/felipe.rocha/i))

      expect(queryAllByLabelText(/selected/i)).toHaveLength(1)
    })
  })
})
