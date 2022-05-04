import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import {
  ChampionshipPendentDriver,
  ChampionshipUpsertDto
} from '~types/championship.types'

const ChampionshipHelpers = {
  generateUpsertPayload: (
    dto: Omit<
      ChampionshipCreationSliceInitialState,
      'isEdit' | 'error' | 'loading'
    > & {
      admins: { user: string; isCreator: boolean }[]
      pendentDrivers: ChampionshipPendentDriver[]
    }
  ): ChampionshipUpsertDto => {
    const { basicInfo, penalties, bonifications, admins, pendentDrivers } = dto

    const races = dto.races.map((item) => ({
      ...item,
      track: item.track.id,
      startDate: item!.startDate!
    }))

    const drivers = dto.drivers.map((item) =>
      item.isRegistered
        ? {
            user: item.id,
            isRegistered: true,
            team: item.team?.id,
            isRemoved: item.isRemoved
          }
        : {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            isRegistered: false,
            team: item.team?.id,
            isRemoved: item.isRemoved
          }
    )

    const teams = dto.teams.map((item) => ({
      id: item.id,
      color: item.color,
      name: item.name
    }))

    let scoringSystem = {}

    for (const item of dto.scoringSystem) {
      scoringSystem = { ...scoringSystem, [item.position]: item.points }
    }

    return {
      name: basicInfo?.title,
      description: basicInfo?.description,
      platform: basicInfo?.platform,
      avatarImage: basicInfo?.image,
      races,
      teams,
      drivers,
      pendentDrivers: pendentDrivers as { user: string; team?: string }[],
      scoringSystem,
      penalties,
      bonifications,
      admins
    }
  }
}

export default ChampionshipHelpers
