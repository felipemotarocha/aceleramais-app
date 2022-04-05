import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'

import { cleanup, render, waitFor } from '~helpers/test.helpers'
import RaceClassificationEditionContainer from './race-classification-edition.container'
import { API_URL } from '~constants/config.constants'

const axiosMock = new MockAdapter(axios)

describe('Race Classification Edition', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render with empty classification', async () => {
    axiosMock.onGet(`${API_URL}/api/raceClassification`).reply(200, {
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
    })

    const { getByText } = render(<RaceClassificationEditionContainer />)

    await waitFor(async () => {
      getByText(/editar resultados da corrida/i)
      getByText(/bahrain international circuit/i)
      getByText(/penalizações e bonificações/i)
    })
  })

  // it('should render with a populated classification', async () => {
  //   const initialState: {
  //     raceClsasificationEdition: RaceClassificationEditionSliceInitialState
  //   } = {
  //     raceClsasificationEdition: {
  //       loading: false,
  //       error: null,
  //       raceClassification: {
  //         id: '622bf07c3e649a39e43234a5',
  //         race: {
  //           championship: '622bedfbe669549ffd44d2ba',
  //           track: {
  //             name: 'Bahrain International Circuit',
  //             countryCode: 'BH',
  //             countryName: 'Bahrain',
  //             id: '61fdd80633035841deb311e9'
  //           },
  //           startDate: '2022-03-12T00:46:40.596Z',
  //           isCompleted: true,
  //           id: '622bedfbe669549ffd44d2ce'
  //         },
  //         classification: [
  //           {
  //             position: 1,
  //             user: {
  //               firstName: 'Felipe',
  //               lastName: 'Rocha',
  //               userName: 'felipe.rocha',
  //               profileImageUrl:
  //                 'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/YaWOZoE596acPgLsg7CrAChrQjT2.jpeg',
  //               id: 'YaWOZoE596acPgLsg7CrAChrQjT2'
  //             },
  //             team: {
  //               championship: '622bedfbe669549ffd44d2ba',
  //               name: 'Mercedes',
  //               color: '#03BFB5',
  //               id: '622bedfbe669549ffd44d2bb'
  //             },
  //             isRegistered: true
  //           },
  //           {
  //             position: 2,
  //             id: 'afbf4b0f-26d8-443d-bcba-50009edcb216',
  //             firstName: 'Max',
  //             lastName: 'Verstappen',
  //             team: {
  //               championship: '622bedfbe669549ffd44d2ba',
  //               name: 'Red Bull',
  //               color: '#002776',
  //               id: '622bedfbe669549ffd44d2bc'
  //             },
  //             isRegistered: false
  //           }
  //         ]
  //       }
  //     }
  //   }

  //   const { getByText, queryByText } = render(
  //     <RaceClassificationEditionContainer />,
  //     {
  //       preloadedState: initialState
  //     }
  //   )

  //   await waitFor(async () => {
  //     getByText(/editar resultados da corrida/i)
  //     getByText(/bahrain international circuit/i)

  //     // getByText('1º')
  //     getByText('Felipe')
  //     getByText('ROCHA')
  //     getByText(/@felipe.rocha/i)

  //     // getByText('2º')
  //     getByText('Max')
  //     getByText('VERSTAPPEN')

  //     getByText(/penalizações e bonificações/i)

  //     expect(queryByText(/adicionar pilotos/i)).toBeNull()
  //   })
  // })
})
