import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import ChampionshipDetailsHeader from './championship-details-header.component'
import ChampionshipEntryRequestModal from '~components/championship-entry-request-modal/championship-entry-request-modal.container'

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
  teams: string[]
}

const ChampionshipDetailsHeaderContainer: FunctionComponent<
  ChampionshipDetailsHeaderContainerProps
> = ({ admins, championship, drivers, teams, ...rest }) => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const [
    requestEntryConfirmationModalIsVisible,
    setRequestEntryConfirmationModalIsVisible
  ] = useState(false)

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

  const handleRequestEntryPress = useCallback(
    () => setRequestEntryConfirmationModalIsVisible(true),
    []
  )

  return (
    <>
      <ChampionshipDetailsHeader
        editButtonIsToBeShown={editButtonIsToBeShown}
        entryRequestButtonIsToBeShown={entryRequestButtonIsToBeShown}
        handleEditPress={handleEditPress}
        handleRequestEntryPress={handleRequestEntryPress}
        {...rest}
      />

      <ChampionshipEntryRequestModal
        isVisible={requestEntryConfirmationModalIsVisible}
        setIsVisible={setRequestEntryConfirmationModalIsVisible}
      />
    </>
  )
}

export default ChampionshipDetailsHeaderContainer
