import React, { FunctionComponent, useMemo } from 'react'
import { useAppSelector } from '~store'

// Components
import ChampionshipDetailsHeader from './championship-details-header.component'

// Utilities
import { ChampionshipAdmin } from '~types/championship.types'
interface ChampionshipDetailsHeaderContainerProps {
  name: string
  platform: string
  description?: string
  avatarImageUrl?: string
  admins: ChampionshipAdmin[]
}

const ChampionshipDetailsHeaderContainer: FunctionComponent<
  ChampionshipDetailsHeaderContainerProps
> = ({ admins, ...rest }) => {
  const { currentUser } = useAppSelector((state) => state.user)

  const editButtonIsToBeShown = useMemo(
    () => admins.some((admin) => admin.user === currentUser?.id),
    [admins, currentUser]
  )
  return (
    <ChampionshipDetailsHeader
      editButtonIsToBeShown={editButtonIsToBeShown}
      {...rest}
    />
  )
}

export default ChampionshipDetailsHeaderContainer
