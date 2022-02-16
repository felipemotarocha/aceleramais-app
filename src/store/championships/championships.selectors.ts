import { ChampionshipsSliceInitialState } from './championships.slice'

export const selectedFilteredChampionships = ({
  state,
  admin
}: {
  state: ChampionshipsSliceInitialState
  admin?: string
}) => {
  if (state.filterBy === 'admin') {
    return state.championships.filter((championship) =>
      championship.admins.some((_admin) => _admin.user === admin)
    )
  }
}
