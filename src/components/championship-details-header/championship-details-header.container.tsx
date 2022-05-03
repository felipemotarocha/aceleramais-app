import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import ChampionshipDetailsHeader from './championship-details-header.component'

// Redux
import { useAppSelector } from '~store'

// Utilities
import {
  ChampionshipAdmin,
  ChampionshipDriver
} from '~types/championship.types'
import { ChampionshipDetailsScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'

interface ChampionshipDetailsHeaderContainerProps {
  championship: string
  name: string
  platform: string
  code: string
  description?: string
  avatarImageUrl?: string
  admins: ChampionshipAdmin[]
  drivers: ChampionshipDriver[]
}

const ChampionshipDetailsHeaderContainer: FunctionComponent<
  ChampionshipDetailsHeaderContainerProps
> = ({ admins, championship, drivers, ...rest }) => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const { currentUser } = useAppSelector((state) => state.user)

  const editButtonIsToBeShown = useMemo(
    () => admins.some((admin) => admin.user.id === currentUser?.id),
    [admins, currentUser]
  )

  const entryRequestButtonIsToBeShown = useMemo(
    () =>
      drivers.every((driver) => driver?.user?.id !== currentUser?.id) &&
      admins.every((admin) => admin.user.id !== currentUser?.id),
    [drivers, admins, currentUser]
  )

  const handleEditPress = useCallback(
    () => navigation.navigate('Championship Edition', { championship }),
    [navigation]
  )

  return (
    <ChampionshipDetailsHeader
      editButtonIsToBeShown={editButtonIsToBeShown}
      entryRequestButtonIsToBeShown={entryRequestButtonIsToBeShown}
      handleEditPress={handleEditPress}
      {...rest}
    />
  )
}

export default ChampionshipDetailsHeaderContainer
