import React from 'react'
import MockAdapter from 'axios-mock-adapter'

import api from '~api/axios.api'
import { render, waitFor, fireEvent } from '~helpers/test.helpers'
import { API_URL } from '~constants/config.constants'

import PenaltyOrBonificationSelectionContainer from './penalty-or-bonification-selection.container'

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

describe('Penalty or Bonification Selection Screen', () => {
  const axiosMock = new MockAdapter(api)

  beforeAll(() => {
    axiosMock.reset()
  })

  it('should render and select a bonification', async () => {
    await axiosMock
      .onGet(
        `${API_URL}/api/bonification?championship=620d62cb4e71a03355490930`
      )
      .reply(200, [
        {
          id: '62589c0b72b7eebe6fd221c6',
          name: 'Volta mais rápida',
          points: 1,
          championship: '620d62cb4e71a03355490930'
        }
      ])

    const { getByText, queryAllByLabelText } = render(
      <PenaltyOrBonificationSelectionContainer />,
      {
        preloadedState: {
          racePenaltiesAndBonifications: {
            selectedDriver: {
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
            }
          },
          championshipDetails: {
            championshipDetails: {
              id: '620d62cb4e71a03355490930'
            }
          }
        }
      }
    )

    await waitFor(async () => {
      getByText(/charles/i)
      getByText(/leclerc/i)

      getByText(/volta mais rápida/i)
      getByText('+1 ponto')

      await fireEvent.press(getByText(/volta mais rápida/i))

      expect(queryAllByLabelText(/selected/i)).toHaveLength(1)
    })
  })
})
