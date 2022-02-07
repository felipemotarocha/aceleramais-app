import React, { FunctionComponent, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'

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

interface ChampionshipScoringSystemSelectionContainerProps {}

const ChampionshipScoringSystemSelectionContainer: FunctionComponent<
  ChampionshipScoringSystemSelectionContainerProps
> = () => {
  const { scoringSystem } = useAppSelector(
    (state) => state.championshipCreation
  )

  const methods = useForm<{ points: string }>()

  const dispatch = useAppDispatch()

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

  const handleRemovePress = useCallback(
    async (position: number) => {
      const newScoringSystem: _ScoringSystem[] = scoringSystem.reduce(
        (acc, current) => {
          if (current.position < position) {
            acc.push(current)

            return acc
          }

          if (current.position === position) {
            return acc
          }

          if (current.position > position) {
            acc.push({ ...current, position: current.position - 1 })

            return acc
          }

          return acc
        },
        [] as _ScoringSystem[]
      )

      await dispatch(updateScoringSystem(newScoringSystem))
    },
    [scoringSystem]
  )

  const renderItem = useCallback(
    ({ item }: { item: _ScoringSystem }) => (
      <View style={{ marginBottom: 15 }}>
        <ChampionshipPositionScoreItem
          {...item}
          handleRemovePress={handleRemovePress}
        />
      </View>
    ),
    [scoringSystem, handleRemovePress]
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
