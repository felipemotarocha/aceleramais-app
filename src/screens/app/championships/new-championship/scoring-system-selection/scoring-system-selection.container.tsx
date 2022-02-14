import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'
import { UseFormReset, FieldValues, UseFormSetValue } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

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

// Utilities
import ChampionshipScoringSystemUtils from './scoring-system-selection.utils'
import { ChampionshipScoringSystemScreenNavigationProp } from '~navigators/app/championships/new-championship/new-championship.types'

const ChampionshipScoringSystemSelectionContainer: FunctionComponent = () => {
  const { scoringSystem } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  const navigation =
    useNavigation<ChampionshipScoringSystemScreenNavigationProp>()

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
      const newScoringSystem =
        ChampionshipScoringSystemUtils.updateAfterPositionRemoval({
          scoringSystem,
          position,
          setValue,
          reset
        })

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

  const handleSubmit = useCallback(
    (data: { [position: string]: string }) => {
      const newScoringSystem: _ScoringSystem[] = Object.keys(data).map(
        (key) => ({
          position: parseInt(key),
          points: parseInt(data[key])
        })
      )

      dispatch(updateScoringSystem(newScoringSystem))

      navigation.navigate('Championship Drivers')
    },
    [dispatch, navigation]
  )

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
