import React from 'react'
import axiosMock from 'axios'

import { render, waitFor } from '~helpers/test.helpers'
import RaceDriversSelectionModalContainer from './race-drivers-selection-modal.container'

describe('Race Drivers Selection Modal', () => {
  it('should render with no race classification', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: {
        drivers: [
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
      }
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
})
