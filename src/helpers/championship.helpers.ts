import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import Championship, {
  Bonification,
  ChampionshipDriver,
  ChampionshipPendentDriver,
  ChampionshipUpsertDto,
  Penalty,
  ScoringSystem
} from '~types/championship.types'
import Race from '~types/race.types'
import Team from '~types/team.types'
import User from '~types/user.types'

const ChampionshipHelpers = {
  generatePayload: (championship: Championship): ChampionshipUpsertDto => {
    const { name, description, platform, avatarImageUrl } = championship

    const drivers = championship.drivers.map((driver) => {
      const penalties = driver.penalties!.map((item) => ({
        penalty: (item.penalty as Penalty).id,
        race: item.race
      }))

      const bonifications = driver.bonifications!.map((item) => ({
        bonification: (item.bonification as Bonification).id,
        race: item.race
      }))
      if (driver.isRegistered) {
        return {
          ...driver,
          user: (driver.user as User)!.id,
          team: (driver?.team as Team)?.id,
          penalties,
          bonifications
        }
      }

      return {
        ...driver,
        team: (driver?.team as Team)?.id,
        penalties,
        bonifications
      } as any
    })

    const races = (championship.races as Race[]).map((race) => ({
      id: race.id,
      track: race.track.id,
      startDate: race.startDate
    }))

    const scoringSystem = (championship.scoringSystem as ScoringSystem)
      .scoringSystem

    const pendentDrivers = championship.pendentDrivers.map((driver) => ({
      user: (driver.user as User).id,
      team: (driver.team as Team).id
    }))

    const admins = championship.admins.map((admin) => ({
      user: admin.user.id,
      isCreator: admin.isCreator
    }))

    const bonifications = championship.bonifications as Bonification[]

    const penalties = championship.penalties as Bonification[]

    const teams = championship.teams as Team[]

    return {
      name,
      description,
      platform,
      avatarImageUrl,
      drivers,
      pendentDrivers,
      races,
      scoringSystem,
      admins,
      bonifications,
      penalties,
      teams
    }
  },
  generateUpsertPayload: (
    dto: Omit<
      ChampionshipCreationSliceInitialState,
      'isEdit' | 'error' | 'loading' | 'tracks'
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

    const drivers = dto.drivers.map((item) => {
      const driver: ChampionshipDriver = {
        penalties: item.penalties!.map((item) => ({
          penalty: item.penalty.id,
          race: item.race
        })),
        bonifications: item.bonifications!.map((item) => ({
          bonification: item.bonification.id,
          race: item.race
        })),
        isRemoved: item.isRemoved,
        team: item.team?.id,
        isRegistered: false
      }

      if (item.isRegistered) {
        driver.isRegistered = true
        driver.user = item.id
      }

      if (!item.isRegistered) {
        driver.id = item.id
        driver.firstName = item.firstName
        driver.lastName = item.lastName
        driver.isRegistered = false
      }

      return driver
    })

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
