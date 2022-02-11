import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// Components
import ChampionshipDriverSelectionItem from '~components/championship-driver-selection-item/championship-driver-selection-item.component'

// Screens
import ChampionshipDriverSelectionScreen from './driver-selection.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'

// Utilities
import {
  updateDrivers,
  _Driver,
  _Team
} from '~store/championship-creation/championship-creation.slice'
import ChampionshipDriverSelectionUtils from './driver-selection.utils'

export type DriverSelectionForm = {
  userName?: string
  fullName?: string
  team?: _Team
  isRegistered: boolean
}

const ChampionshipDriverSelectionContainer: FunctionComponent = () => {
  const methods = useForm<DriverSelectionForm>({
    defaultValues: { isRegistered: false }
  })

  const { teams, drivers } = useAppSelector(
    (state) => state.championshipCreation
  )
  const dispatch = useAppDispatch()

  const teamInputIsToBeShown = teams.length > 0

  const watchIsRegistered = methods.watch('isRegistered')

  useEffect(() => {
    methods.setValue('fullName', undefined)
    methods.setValue('userName', undefined)
  }, [watchIsRegistered])

  const handleTeamChange = useCallback(
    (team: _Team) => {
      methods.setValue('team', team)
    },
    [methods]
  )

  const handleAddPress = useCallback(
    async (data: DriverSelectionForm) => {
      const newDrivers =
        await ChampionshipDriverSelectionUtils.generateNewDriversAfterAddition({
          data,
          drivers
        })

      dispatch(updateDrivers(newDrivers))

      methods.reset()
    },
    [dispatch, drivers, methods]
  )

  const handleRemovePress = useCallback(
    (driver) => {
      const newDrivers = drivers.filter((_driver) => _driver.id !== driver.id)

      dispatch(updateDrivers(newDrivers))
    },
    [dispatch, drivers]
  )

  const renderItem = useCallback(
    ({ item }: { item: _Driver }) => (
      <ChampionshipDriverSelectionItem
        driver={item}
        handleRemovePress={handleRemovePress}
      />
    ),
    [dispatch, handleRemovePress]
  )

  return (
    <FormProvider {...methods}>
      <ChampionshipDriverSelectionScreen
        teams={teams}
        drivers={drivers}
        teamInputIsToBeShown={teamInputIsToBeShown}
        handleTeamChange={handleTeamChange}
        handleAddPress={handleAddPress}
        renderDriverItem={renderItem}
      />
    </FormProvider>
  )
}

export default ChampionshipDriverSelectionContainer
