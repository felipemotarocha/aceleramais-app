import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { UseFormReset } from 'react-hook-form'

// Components
import ChampionshipBonificationSelectionItem from '~components/championship-bonification-selection-item/championship-bonification-selection-item.component'

// Screens
import ChampionshipBonificationSelectionScreen from './bonification-selection.screen'

// Utilities
import { ChampionshipBonificationsScreenNavigationProp } from '~navigators/app/championships/new-championship/new-championship.types'

// Redux
import {
  updateBonifications,
  _Bonification
} from '~store/championship-creation/championship-creation.slice'
import { useAppDispatch, useAppSelector } from '~store'
import { useNavigation } from '@react-navigation/native'

interface ChampionshipBonificationSelectionContainerProps {}

const ChampionshipBonificationSelectionContainer: FunctionComponent<
  ChampionshipBonificationSelectionContainerProps
> = () => {
  const { bonifications } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  const navigation =
    useNavigation<ChampionshipBonificationsScreenNavigationProp>()

  const handleAddPress = useCallback(
    (
      data: { points: string; name: string },
      reset: UseFormReset<{
        points: string
        name: string
      }>
    ) => {
      const newBonifications = [
        ...bonifications,
        {
          id: uuidv4(),
          points: parseInt(data.points),
          name: data.name
        }
      ]

      dispatch(updateBonifications(newBonifications))

      reset()
    },
    [dispatch, bonifications]
  )

  const handleRemovePress = useCallback(
    (id: string) => {
      const newBonifications = bonifications.filter((item) => item.id !== id)

      dispatch(updateBonifications(newBonifications))
    },
    [dispatch, bonifications]
  )

  const renderItem = useCallback(
    ({ item }: { item: _Bonification }) => (
      <View style={{ marginBottom: 15 }}>
        <ChampionshipBonificationSelectionItem
          {...item}
          handleRemovePress={handleRemovePress}
        />
      </View>
    ),
    [bonifications, dispatch]
  )

  const handleAdvancePress = useCallback(
    (data: { [key: string]: { name: string; points: string } }) => {
      const newBonifications: _Bonification[] = Object.keys(data).map(
        (key) => ({
          id: key,
          name: data[key].name,
          points: parseInt(data[key].points)
        })
      )

      dispatch(updateBonifications(newBonifications))

      navigation.navigate('Championship Penalties')
    },
    [dispatch, bonifications, navigation]
  )

  return (
    <ChampionshipBonificationSelectionScreen
      bonifications={bonifications}
      handleAddPress={handleAddPress}
      renderItem={renderItem}
      handleAdvancePress={handleAdvancePress}
    />
  )
}

export default ChampionshipBonificationSelectionContainer
