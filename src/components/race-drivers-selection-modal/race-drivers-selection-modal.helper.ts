import { ChampionshipDriver } from '~types/championship.types'
import { RaceClassificationItem } from '~types/race.types'

const RaceDriversSelectionModalHelper = {
  generateInitialAvailableDrivers: (
    championshipDrivers: ChampionshipDriver[],
    raceClassification: RaceClassificationItem[]
  ) => {
    const drivers: RaceClassificationItem[] = []

    for (const driver of championshipDrivers) {
      const driverOnRaceClassification = raceClassification.find((item) =>
        item.isRegistered
          ? item?.user?.id === driver?.user?.id
          : item?.id === driver?.id
      )

      if (driverOnRaceClassification) {
        drivers.push(driverOnRaceClassification)

        continue
      }

      drivers.push({
        ...driver,
        position: 0
      })
    }

    return drivers.sort((a, b) => {
      if (a.position === 0) return 1
      if (b.position === 0) return -1

      return a.position - b.position
    })
  }
}

export default RaceDriversSelectionModalHelper
