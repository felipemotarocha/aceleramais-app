import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { API_URL } from '~constants/config.constants'
import { _Driver } from '~store/championship-creation/championship-creation.slice'
import { DriverSelectionForm } from './driver-selection.container'

const ChampionshipDriverSelectionUtils = {
  generateNewDriversAfterAddition: async ({
    data,
    drivers
  }: {
    data: DriverSelectionForm
    drivers: _Driver[]
  }) => {
    if (data.isRegistered) {
      const { data: driver } = await axios.get(
        `${API_URL}/api/user?userName=${data.userName}`
      )

      const newDrivers = [
        ...drivers,
        {
          ...data,
          id: driver.id,
          profileImageUrl: driver?.profileImageUrl,
          firstName: driver.firstName,
          lastName: driver.lastName,
          isRemoved: false
        }
      ]

      return newDrivers
    }

    const firstName = data.fullName!.split(' ')[0]
    const lastName = data.fullName!.split(' ')[1]

    const newDrivers = [
      ...drivers,
      {
        id: uuidv4(),
        firstName,
        lastName,
        team: data.team,
        isRegistered: false,
        isRemoved: false
      }
    ]

    return newDrivers
  }
}

export default ChampionshipDriverSelectionUtils
