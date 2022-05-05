import Race from './race.types'
import Team from './team.types'
import User from './user.types'

export interface ChampionshipDriver {
  user?: User
  id?: string
  firstName?: string
  lastName?: string
  team?: Omit<Team, 'championship'>
  isRegistered: boolean
  isRemoved: boolean
  bonifications?: {
    bonification: Bonification
    race: string
  }[]
  penalties?: {
    penalty: Penalty
    race: string
  }[]
}

export interface ChampionshipPendentDriver {
  user: User | string
  team?: Team | string
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
  team?: Omit<Team, 'championship'>
  position: number
  points: number
  isRegistered: boolean
}

export interface ChampionshipTeamStandingsItem {
  team?: Omit<Team, 'championship'>
  position: number
  points: number
}

export interface ChampionshipDriverStandings {
  id: string
  standings: ChampionshipDriverStandingsItem[]
}

export interface ChampionshipTeamStandings {
  id: string
  standings: ChampionshipTeamStandingsItem[]
}

interface Championship {
  id: string
  avatarImageUrl: string
  name: string
  description: string
  platform: string
  code: string
  admins: ChampionshipAdmin[]
  races: string[] | Race[]
  teams: string[] | Team[]
  drivers: ChampionshipDriver[]
  pendentDrivers: ChampionshipPendentDriver[]
  driverStandings: string | ChampionshipDriverStandings
  teamStandings: ChampionshipTeamStandings
  scoringSystem: string | ScoringSystem
  bonifications: string[] | Bonification[]
  penalties: string[] | Penalty[]
  nextRaces: Omit<Race, 'championship' | 'isCompleted' | 'classification'>[]
}

export interface ScoringSystem {
  id: string
  championship: string
  scoringSystem: { [key: number]: number }
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
  pendentDrivers: {
    user: string
    team?: string
  }[]
  teams: {
    id: string
    name: string
    color?: string
  }[]
  bonifications: {
    id: string
    name: string
    points: number
  }[]
  penalties: {
    id: string
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
