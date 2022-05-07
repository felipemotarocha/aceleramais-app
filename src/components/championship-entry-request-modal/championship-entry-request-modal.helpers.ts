import ChampionshipHelpers from '~helpers/championship.helpers'
import ChampionshipEditionHelpers from '~screens/app/championships/championship-edition/championship-edition.helpers'
import Championship from '~types/championship.types'
import Team from '~types/team.types'
import User from '~types/user.types'

const ChampionshipEntryRequestModalHelpers = {
  generateSubmitPayload: (params: {
    championship: Championship
    driver: User
    team?: string
  }) => {
    const { championship, driver, team } = params

    const reducerData = ChampionshipEditionHelpers.generateReducerData({
      ...championship,
      pendentDrivers: [
        ...championship.pendentDrivers.map((item) => ({
          user: (item.user as User).id,
          team: (item?.team as Team)?.id
        })),
        { user: driver.id, team }
      ]
    })

    return ChampionshipHelpers.generateUpsertPayload({
      ...reducerData,
      admins: [{ user: driver!.id, isCreator: true }]
    })
  }
}

export default ChampionshipEntryRequestModalHelpers
