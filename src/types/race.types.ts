import Track from './track.types'

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
  user?: string
  id?: string
  firstName?: string
  lastName?: string
  team?: string
  isRegistered: boolean
}

export interface RaceClassification {
  id: string
  race: Race
  classification: RaceClassificationItem[]
}

export default Race
