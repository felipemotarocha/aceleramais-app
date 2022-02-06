import { addDays } from 'date-fns'

import { _Race } from '~store/championship-creation/championship-creation.slice'
import ChampionshipRaceDateSelectionHelper from './race-date-selection.helper'

describe('Championship Race Date Selection Helper', () => {
  it('should sort races by start date', () => {
    const tracks = [
      {
        id: '1',
        countryCode: 'BR',
        name: 'Autódromo José Carlos Pace',
        countryName: 'Brasil',
        isSelected: true
      },
      {
        id: '2',
        countryCode: 'ES',
        name: 'Circuit de Barcelona-Catalunya',
        countryName: 'Espanha',
        isSelected: true
      },
      {
        id: '3',
        countryCode: 'CN',
        name: 'Shangai International Circuit',
        countryName: 'Shangai',
        isSelected: true
      }
    ]

    const races: _Race[] = [
      {
        id: '1',
        isCompleted: false,
        track: tracks[1],
        startDate: addDays(new Date(), 7).toISOString()
      },
      {
        id: '2',
        isCompleted: false,
        track: tracks[2],
        startDate: undefined
      },
      {
        id: '3',
        isCompleted: false,
        track: tracks[0],
        startDate: new Date().toISOString()
      }
    ]

    const result = ChampionshipRaceDateSelectionHelper.sortByStartDate(races)

    expect(result[0].id).toStrictEqual(races[2].id)
    expect(result[1].id).toStrictEqual(races[0].id)
    expect(result[2].id).toStrictEqual(races[1].id)
  })
})
