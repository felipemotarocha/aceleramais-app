import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'
import { UseFormReset, FieldValues, UseFormSetValue } from 'react-hook-form'

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

const ChampionshipScoringSystemSelectionContainer: FunctionComponent = () => {
  const { scoringSystem } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  const handleAddPress = useCallback(
    async (
      data: { points: string },
      resetForm: UseFormReset<{
        points: string
      }>
    ) => {
      const newPosition = scoringSystem.length + 1

      const newScoringSystem = [
        ...scoringSystem,
        { position: newPosition, points: parseInt(data.points) }
      ]

      await dispatch(updateScoringSystem(newScoringSystem))

      resetForm()
    },
    [dispatch, scoringSystem]
  )

  const handleRemovePress = useCallback(
    async (
      position: number,
      setValue: UseFormSetValue<FieldValues>,
      reset: UseFormReset<FieldValues>
    ) => {
      reset()

      const newScoringSystem: _ScoringSystem[] = scoringSystem.reduce(
        (acc, current) => {
          if (current.position < position) {
            acc.push(current)

            setValue(current.position.toString(), current.points.toString())

            return acc
          }

          if (current.position === position) {
            return acc
          }

          if (current.position > position) {
            acc.push({ ...current, position: current.position - 1 })

            setValue(
              (current.position - 1).toString(),
              current.points.toString()
            )

            return acc
          }

          return acc
        },
        [] as _ScoringSystem[]
      )

      await dispatch(updateScoringSystem(newScoringSystem))
    },
    [dispatch, scoringSystem]
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
    [scoringSystem, handleRemovePress, dispatch]
  )

  const handleSubmit = useCallback((data: { [position: string]: string }) => {
    console.log({ data })
  }, [])

  return (
    <ChampionshipScoringSystemSelectionScreen
      scoringSystem={scoringSystem}
      handleAddPress={handleAddPress}
      renderItem={renderItem}
      handleSubmit={handleSubmit}
    />
  )
}

export default ChampionshipScoringSystemSelectionContainer
