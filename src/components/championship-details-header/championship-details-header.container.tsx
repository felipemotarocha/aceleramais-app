import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import ChampionshipDetailsHeader from './championship-details-header.component'

// Redux
import { useAppSelector } from '~store'

// Utilities
import { ChampionshipAdmin } from '~types/championship.types'
import { ChampionshipDetailsScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'
interface ChampionshipDetailsHeaderContainerProps {
  championship: string
  name: string
  platform: string
  description?: string
  avatarImageUrl?: string
  admins: ChampionshipAdmin[]
}

const ChampionshipDetailsHeaderContainer: FunctionComponent<
  ChampionshipDetailsHeaderContainerProps
> = ({ admins, championship, ...rest }) => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const { currentUser } = useAppSelector((state) => state.user)

  const editButtonIsToBeShown = useMemo(
    () => admins.some((admin) => admin.user === currentUser?.id),
    [admins, currentUser]
  )

  const handleEditPress = useCallback(
    () => navigation.navigate('Championship Edition', { championship }),
    [navigation]
  )

  return (
    <ChampionshipDetailsHeader
      editButtonIsToBeShown={editButtonIsToBeShown}
      handleEditPress={handleEditPress}
      {...rest}
    />
  )
}

export default ChampionshipDetailsHeaderContainer
