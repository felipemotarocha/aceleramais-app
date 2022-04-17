import {
  ChampionshipCreationSliceInitialState as Reducer,
  _Driver
} from '~store/championship-creation/championship-creation.slice'
import Championship, {
  Bonification,
  ScoringSystem
} from '~types/championship.types'
import Race from '~types/race.types'
import Team from '~types/team.types'

const ChampionshipEditionHelpers = {
  generateReducerData: (championship: Championship) => {
    const basicInfo: Reducer['basicInfo'] = {
      platform: championship?.platform,
      title: championship?.name,
      description: championship.description,
      image: {
        uri: championship?.avatarImageUrl,
        type: ''
      }
    }

    const races: Reducer['races'] = (championship.races as Race[]).map(
      (race) => ({
        ...race,
        track: {
          ...race.track,
          isSelected: true
        }
      })
    )

    const champScoringSystem = (championship.scoringSystem as ScoringSystem)
      .scoringSystem

    const scoringSystem: Reducer['scoringSystem'] = Object.keys(
      champScoringSystem
    ).map((key) => ({
      position: parseInt(key),
      points: champScoringSystem[key]
    }))

    const teams: Reducer['teams'] = (championship.teams as Team[]).map(
      ({ championship, ...rest }) => ({
        ...rest
      })
    )

    const drivers: Reducer['drivers'] = championship.drivers.map((driver) => {
      const _driver: _Driver = {
        id: (driver?.id || driver?.user?.id)!,
        isRegistered: driver.isRegistered,
        team: driver?.team as any,
        bonifications: driver.bonifications,
        penalties: driver.penalties
      }

      if (_driver.isRegistered) {
        _driver.userName = driver.user?.userName
        _driver.firstName = driver.user?.firstName
        _driver.lastName = driver.user?.lastName
        _driver.profileImageUrl = driver.user?.profileImageUrl
      } else {
        _driver.firstName = driver.firstName
        _driver.lastName = driver.lastName
      }

      return _driver
    })

    const bonifications: Reducer['bonifications'] =
      championship.bonifications as Bonification[]

    const penalties: Reducer['penalties'] =
      championship.penalties as Bonification[]

    return {
      basicInfo,
      races,
      scoringSystem,
      teams,
      drivers,
      bonifications,
      penalties
    }
  }
}

export default ChampionshipEditionHelpers
