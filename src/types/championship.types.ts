import Race from './race.types'
import Team from './team.types'
import User from './user.types'

export interface ChampionshipDriver {
  user?: User
  id?: string
  firstName?: string
  lastName?: string
  team?: Team
  isRegistered: boolean
  bonifications?: {
    bonification: Bonification
    race: string
  }[]
  penalties?: {
    penalty: Penalty
    race: string
  }[]
}

export interface ChampionshipAdmin {
  user: User
  isCreator: boolean
}

export interface ChampionshipDriverStandingsItem {
  user?: User
  id?: string
  firstName?: string
  lastName?: string
  profileImageUrl?: string
  team?: Team
  position: number
  points: number
  isRegistered: boolean
}

export interface ChampionshipTeamStandingsItem {
  team: Team
  position: number
  points: number
}

export interface ChampionshipDriverStandings {
  id: string
  championship: string
  standings: ChampionshipDriverStandingsItem[]
}

export interface ChampionshipTeamStandings {
  id: string
  championship: string
  standings: ChampionshipTeamStandingsItem[]
}

interface Championship {
  id: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  admins: ChampionshipAdmin[]
  races: string[]
  teams: string[]
  drivers: ChampionshipDriver[]
  driverStandings: ChampionshipDriverStandings
  teamStandings: ChampionshipTeamStandings
  scoringSystem: string
  bonifications: string[]
  penalties: string[]
  nextRaces: Race[]
}

export interface Bonification {
  id: string
  name: string
  points: number
}

export interface Penalty {
  id: string
  name: string
  points: number
}

export default Championship
