import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// Screens
import ChampionshipDriverSelectionScreen from './driver-selection.screen'

// Redux
import { useAppSelector } from '~store'

// Utilities
import { _Team } from '~store/championship-creation/championship-creation.slice'

export type DriverSelectionForm = {
  userName?: string
  fullName?: string
  team?: _Team
  isRegistered: boolean
}

interface ChampionshipDriverSelectionContainerProps {}

const ChampionshipDriverSelectionContainer: FunctionComponent<
  ChampionshipDriverSelectionContainerProps
> = () => {
  const methods = useForm<DriverSelectionForm>({
    defaultValues: { isRegistered: false }
  })

  const { teams } = useAppSelector((state) => state.championshipCreation)

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

  const handleAddPress = useCallback((data: DriverSelectionForm) => {
    console.log({ data })
  }, [])

  return (
    <FormProvider {...methods}>
      <ChampionshipDriverSelectionScreen
        teams={teams}
        teamInputIsToBeShown={teamInputIsToBeShown}
        handleTeamChange={handleTeamChange}
        handleAddPress={handleAddPress}
      />
    </FormProvider>
  )
}

export default ChampionshipDriverSelectionContainer
