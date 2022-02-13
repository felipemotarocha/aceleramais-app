import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { UseFormReset } from 'react-hook-form'

// Components
import ChampionshipPenaltySelectionItem from '~components/championship-bonification-selection-item/championship-bonification-selection-item.component'

// Screens
import ChampionshipPenaltySelectionScreen from './penalty-selection.screen'

// Redux
import {
  updatePenalties,
  _Penalty
} from '~store/championship-creation/championship-creation.slice'
import { useAppDispatch, useAppSelector } from '~store'

interface ChampionshipPenaltySelectionContainerProps {}

const ChampionshipPenaltySelectionContainer: FunctionComponent<
  ChampionshipPenaltySelectionContainerProps
> = () => {
  const { penalties } = useAppSelector((state) => state.championshipCreation)

  const dispatch = useAppDispatch()

  const handleAddPress = useCallback(
    (
      data: { points: string; name: string },
      reset: UseFormReset<{
        points: string
        name: string
      }>
    ) => {
      const newPenalties = [
        ...penalties,
        {
          id: uuidv4(),
          points: parseInt(data.points),
          name: data.name
        }
      ]

      dispatch(updatePenalties(newPenalties))

      reset()
    },
    [dispatch, penalties]
  )

  const handleRemovePress = useCallback(
    (id: string) => {
      const newPenalties = penalties.filter((item) => item.id !== id)

      dispatch(updatePenalties(newPenalties))
    },
    [dispatch, penalties]
  )

  const renderItem = useCallback(
    ({ item }: { item: _Penalty }) => (
      <View style={{ marginBottom: 15 }}>
        <ChampionshipPenaltySelectionItem
          {...item}
          handleRemovePress={handleRemovePress}
        />
      </View>
    ),
    [penalties, dispatch]
  )

  const handleAdvancePress = useCallback(
    (data: { [key: string]: { name: string; points: string } }) => {
      const newPenalties: _Penalty[] = Object.keys(data).map((key) => ({
        id: key,
        name: data[key].name,
        points: parseInt(data[key].points)
      }))

      dispatch(updatePenalties(newPenalties))
    },
    [dispatch, penalties]
  )

  return (
    <ChampionshipPenaltySelectionScreen
      penalties={penalties}
      handleAddPress={handleAddPress}
      renderItem={renderItem}
      handleAdvancePress={handleAdvancePress}
    />
  )
}

export default ChampionshipPenaltySelectionContainer
