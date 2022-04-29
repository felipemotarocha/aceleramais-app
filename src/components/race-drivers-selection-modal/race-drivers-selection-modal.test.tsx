import React from 'react'
import MockHelpers from '~helpers/mock.helpers'

import { render, waitFor, fireEvent } from '~helpers/test.helpers'
import RaceDriversSelectionModalContainer from './race-drivers-selection-modal.container'

describe('Race Drivers Selection Modal', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  const raceClassification = {
    id: '622bf07c3e649a39e43234a5',
    championship: '622bedfbe669549ffd44d2ba',

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
    classification: [
      {
        position: 1,
        user: {
          firstName: 'Felipe',
          lastName: 'Rocha',
          userName: 'felipe.rocha',
          profileImageUrl:
            'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/YaWOZoE596acPgLsg7CrAChrQjT2.jpeg',
          id: 'YaWOZoE596acPgLsg7CrAChrQjT2'
        },
        scores: true,
        team: {
          championship: '622bedfbe669549ffd44d2ba',
          name: 'Mercedes',
          color: '#03BFB5',
          id: '622bedfbe669549ffd44d2bb'
        },
        isRegistered: true
      },
      {
        position: 2,
        id: 'afbf4b0f-26d8-443d-bcba-50009edcb216',
        firstName: 'Max',
        lastName: 'Verstappen',
        team: {
          championship: '622bedfbe669549ffd44d2ba',
          name: 'Red Bull',
          color: '#002776',
          id: '622bedfbe669549ffd44d2bc'
        },
        scores: false,
        isRegistered: false
      }
    ]
  }

  const drivers = [
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
      isRegistered: true,
      bonifications: [],
      penalties: []
    },
    {
      id: 'afbf4b0f-26d8-443d-bcba-50009edcb216',
      firstName: 'Max',
      lastName: 'Verstappen',
      team: {
        name: 'Red Bull',
        color: '#002776',
        id: '622bedfbe669549ffd44d2bc'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    }
  ]

  it('should render with no race classification', async () => {
    axiosMock.onGet().reply(200, {
      drivers
    })

    const { getByText, queryByText } = render(
      <RaceDriversSelectionModalContainer
        championship="622bedfbe669549ffd44d2ba"
        isVisible
        raceClassification={{ classification: [] } as any}
        setIsVisible={() => {}}
      />
    )

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText(/@felipe.rocha/i)

      expect(queryByText('1º')).toBeNull()

      getByText('Max')
      getByText('VERSTAPPEN')

      expect(queryByText('2º')).toBeNull()
    })
  })

  it('should render with a race classification', async () => {
    axiosMock.onGet().reply(200, {
      drivers
    })

    const { getByText } = render(
      <RaceDriversSelectionModalContainer
        championship="622bedfbe669549ffd44d2ba"
        isVisible
        raceClassification={raceClassification as any}
        setIsVisible={() => {}}
      />
    )

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText(/@felipe.rocha/i)
      getByText('1º')

      getByText('Max')
      getByText('VERSTAPPEN')
      getByText('2º')
      getByText(/não pontua/i)
    })
  })

  it('should update the driver position on press', async () => {
    axiosMock.onGet().reply(200, {
      drivers
    })

    const { getByText, queryByText } = render(
      <RaceDriversSelectionModalContainer
        championship="622bedfbe669549ffd44d2ba"
        isVisible
        raceClassification={{ classification: [] } as any}
        setIsVisible={() => {}}
      />
    )

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText(/@felipe.rocha/i)

      getByText('Max')
      getByText('VERSTAPPEN')
    })

    await fireEvent.press(getByText(/@felipe.rocha/i))

    await waitFor(async () => {
      getByText('1º')
      expect(queryByText('2º')).toBeNull()
    })

    await fireEvent.press(getByText('VERSTAPPEN'))

    await waitFor(async () => {
      getByText('2º')
    })

    await fireEvent.press(getByText(/@felipe.rocha/i))

    await waitFor(async () => {
      expect(queryByText('2º')).toBeNull()
    })
  })

  it('should edit driver on long press', async () => {
    axiosMock.onGet().reply(200, {
      drivers
    })

    const { getByText, getByDisplayValue } = render(
      <RaceDriversSelectionModalContainer
        championship="622bedfbe669549ffd44d2ba"
        isVisible
        raceClassification={{ classification: [] } as any}
        setIsVisible={() => {}}
      />
    )

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText(/@felipe.rocha/i)

      getByText('Max')
      getByText('VERSTAPPEN')
    })

    await fireEvent(getByText(/@felipe.rocha/i), 'onLongPress')

    await waitFor(async () => {
      getByText(/editar piloto/i)
      getByText(/pontua nos campeonatos?/i)
      getByDisplayValue(/sim/i)
    })
  })

  it('should select all drivers', async () => {
    axiosMock.onGet().reply(200, {
      drivers
    })

    const { getByText } = render(
      <RaceDriversSelectionModalContainer
        championship="622bedfbe669549ffd44d2ba"
        isVisible
        raceClassification={{ classification: [] } as any}
        setIsVisible={() => {}}
      />
    )

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText(/@felipe.rocha/i)

      getByText('Max')
      getByText('VERSTAPPEN')
    })

    await fireEvent.press(getByText(/selecionar todos/i))

    await waitFor(async () => {
      getByText('1º')
      getByText('2º')
    })
  })
})
