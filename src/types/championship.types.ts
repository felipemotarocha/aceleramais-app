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
  races: string[] | Race[]
  teams: string[] | Team[]
  drivers: ChampionshipDriver[]
  driverStandings: ChampionshipDriverStandings
  teamStandings: ChampionshipTeamStandings
  scoringSystem: string | ScoringSystem
  bonifications: string[] | Bonification
  penalties: string[] | Penalty
  nextRaces: Race[]
}

export interface ScoringSystem {
  id: string
  position: number
  points: number
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

export interface ChampionshipUpsertDto {
  name?: string
  description?: string
  platform?: string
  admins: {
    user: string
    isCreator: boolean
  }[]
  races?: {
    id?: string
    startDate: string
    track: string
  }[]
  drivers: {
    user?: string
    userName?: string
    team?: string
    isRegistered: boolean
  }[]
  teams: {
    id: string
    name: string
    color?: string
  }[]
  bonifications: {
    race: string
    name: string
    points: number
  }[]
  penalties: {
    race: string
    name: string
    points: number
  }[]
  scoringSystem: {
    [key: string]: number
  }
  avatarImage?: any
  avatarImageUrl?: string
}

export default Championship
