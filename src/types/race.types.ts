import Team from './team.types'
import Track from './track.types'
import User from './user.types'

interface Race {
  id: string
  track: Track
  championship: string
  startDate: string
  isCompleted: boolean
  classification: string
}

export interface RaceClassificationItem {
  position: number
  user?: User
  id?: string
  firstName?: string
  lastName?: string
  team?: Team
  isRegistered: boolean
  isRemoved: boolean
}

export interface RaceClassification {
  id: string
  race: Race
  championship: string
  classification: RaceClassificationItem[]
}

export default Race
