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
import { createChampionship } from '~store/championship-creation/championship-creation.actions'

interface ChampionshipPenaltySelectionContainerProps {}

const ChampionshipPenaltySelectionContainer: FunctionComponent<
  ChampionshipPenaltySelectionContainerProps
> = () => {
  const { penalties, ...rest } = useAppSelector(
    (state) => state.championshipCreation
  )

  const { currentUser } = useAppSelector((state) => state.user)

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
    async (data: { [key: string]: { name: string; points: string } }) => {
      const newPenalties: _Penalty[] = Object.keys(data).map((key) => ({
        id: key,
        name: data[key].name,
        points: parseInt(data[key].points)
      }))

      await dispatch(updatePenalties(newPenalties))

      await dispatch(
        createChampionship({
          ...rest,
          penalties: newPenalties,
          admins: [{ user: currentUser!.id, isCreator: true }]
        })
      )
    },
    [dispatch, penalties, currentUser]
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
