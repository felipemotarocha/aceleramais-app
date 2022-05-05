import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import ChampionshipDetailsHeader from './championship-details-header.component'
import ChampionshipEntryRequestModal from '~components/championship-entry-request-modal/championship-entry-request-modal.container'

// Redux
import { useAppSelector } from '~store'

// Utilities
import { ChampionshipDetailsScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'
import User from '~types/user.types'

const ChampionshipDetailsHeaderContainer: FunctionComponent = () => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const [
    requestEntryConfirmationModalIsVisible,
    setRequestEntryConfirmationModalIsVisible
  ] = useState(false)

  const {
    id: championship,
    admins,
    drivers,
    pendentDrivers,
    ...rest
  } = useAppSelector((state) => state.championshipDetails.championshipDetails!)

  const { currentUser } = useAppSelector((state) => state.user)

  const editButtonIsToBeShown = useMemo(
    () => admins.some((admin) => admin.user.id === currentUser?.id),
    [admins, currentUser]
  )

  const entryWasRequested = useMemo(
    () =>
      pendentDrivers.some(
        (driver) => (driver.user as User).id === currentUser!.id
      ),
    [pendentDrivers, currentUser]
  )

  const entryRequestButtonIsToBeShown = useMemo(
    () =>
      drivers.every((driver) => driver?.user?.id !== currentUser?.id) &&
      admins.every((admin) => admin.user.id !== currentUser?.id) &&
      !entryWasRequested,
    [drivers, admins, currentUser, entryWasRequested]
  )

  const handleEditPress = useCallback(
    () => navigation.navigate('Championship Edition', { championship }),
    [navigation, championship]
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
        entryWasRequested={entryWasRequested}
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
