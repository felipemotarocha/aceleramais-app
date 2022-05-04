import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { UseFormReset } from 'react-hook-form'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

// Components
import ChampionshipPenaltySelectionItem from '~components/championship-bonification-selection-item/championship-bonification-selection-item.component'

// Screens
import ChampionshipPenaltySelectionScreen from './penalty-selection.screen'

// Utilities
import { showError, showSuccess } from '~helpers/flash-message.helpers'
import { Penalty } from '~types/championship.types'
import ChampionshipHelpers from '~helpers/championship.helpers'

// Redux
import {
  clear,
  updateDrivers,
  updatePenalties
} from '~store/championship-creation/championship-creation.slice'
import { useAppDispatch, useAppSelector } from '~store'
import {
  createChampionship,
  editChampionship
} from '~store/championship-creation/championship-creation.actions'

interface ChampionshipPenaltySelectionContainerProps {}

const ChampionshipPenaltySelectionContainer: FunctionComponent<
  ChampionshipPenaltySelectionContainerProps
> = () => {
  const { penalties, drivers, isEdit, ...rest } = useAppSelector(
    (state) => state.championshipCreation
  )

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const navigation = useNavigation()

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

      const newDrivers = drivers.map((driver) => {
        if (isEmpty(driver?.penalties)) return driver

        return {
          ...driver,
          penalties: driver.penalties?.filter((item) => item.penalty.id !== id)
        }
      })

      dispatch(updatePenalties(newPenalties))
      dispatch(updateDrivers(newDrivers))
    },
    [dispatch, penalties]
  )

  const renderItem = useCallback(
    ({ item }: { item: Penalty }) => (
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
      const newPenalties: Penalty[] = Object.keys(data).map((key) => ({
        id: key,
        name: data[key].name,
        points: parseInt(data[key].points)
      }))

      await dispatch(updatePenalties(newPenalties))

      const payload = {
        ...rest,
        drivers,
        penalties: newPenalties,
        admins: [{ user: currentUser!.id, isCreator: true }]
      }

      try {
        if (isEdit) {
          const _payload = ChampionshipHelpers.generateUpsertPayload(payload)

          await dispatch(editChampionship(championshipDetails!.id, _payload))
        } else {
          await dispatch(createChampionship(payload))
        }

        await dispatch(clear())

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Championship List' }]
          })
        )

        showSuccess(
          `O campeonato foi ${isEdit ? 'editado' : 'criado'} com sucesso.`
        )
      } catch (error) {
        showError(error as any)
      }
    },
    [dispatch, penalties, currentUser, championshipDetails]
  )

  return (
    <ChampionshipPenaltySelectionScreen
      penalties={penalties}
      handleAddPress={handleAddPress}
      renderItem={renderItem}
      handleAdvancePress={handleAdvancePress}
      loading={rest.loading}
    />
  )
}

export default ChampionshipPenaltySelectionContainer
