import Track from './track.types'

interface Race {
  id: string
  track: Track
  championship: string
  startDate: string
  isCompleted: boolean
  classification: string
}

export default Race
