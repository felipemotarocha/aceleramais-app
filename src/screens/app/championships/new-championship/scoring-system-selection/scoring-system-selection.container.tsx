import React, { FunctionComponent, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

// Screen
import ChampionshipScoringSystemSelectionScreen from './scoring-system-selection.screen'

// Components
import ChampionshipPositionScoreItem from '~components/championship-position-score-item/championship-position-score-item.component'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  updateScoringSystem,
  _ScoringSystem
} from '~store/championship-creation/championship-creation.slice'
import { View } from 'react-native'

interface ChampionshipScoringSystemSelectionContainerProps {}

const ChampionshipScoringSystemSelectionContainer: FunctionComponent<
  ChampionshipScoringSystemSelectionContainerProps
> = () => {
  const { scoringSystem } = useAppSelector(
    (state) => state.championshipCreation
  )

  const methods = useForm<{ points: string }>()

  const dispatch = useAppDispatch()

  const renderItem = useCallback(
    ({ item }: { item: _ScoringSystem }) => (
      <View style={{ marginBottom: 15 }}>
        <ChampionshipPositionScoreItem {...item} />
      </View>
    ),
    []
  )

  const handleAddPress = useCallback(
    async (data: { points: string }) => {
      const newPosition = scoringSystem.length + 1

      const newScoringSystem = [
        ...scoringSystem,
        { position: newPosition, points: parseInt(data.points) }
      ]

      await dispatch(updateScoringSystem(newScoringSystem))

      methods.reset()
    },
    [dispatch, scoringSystem, methods]
  )

  return (
    <FormProvider {...methods}>
      <ChampionshipScoringSystemSelectionScreen
        scoringSystem={scoringSystem}
        handleAddPress={handleAddPress}
        renderItem={renderItem}
      />
    </FormProvider>
  )
}

export default ChampionshipScoringSystemSelectionContainer
