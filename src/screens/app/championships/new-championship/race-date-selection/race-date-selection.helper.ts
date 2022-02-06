import { getTime } from 'date-fns'
import { _Race } from '~store/championship-creation/championship-creation.slice'

const ChampionshipRaceDateSelectionHelper = {
  sortByStartDate: (races: _Race[]) => {
    return [...races].sort((a, b) => {
      return (
        // @ts-ignore
        (a.startDate == null) - (b.startDate == null) ||
        getTime(new Date(a.startDate!)) - getTime(new Date(b.startDate!))
      )
    })
  }
}

export default ChampionshipRaceDateSelectionHelper
