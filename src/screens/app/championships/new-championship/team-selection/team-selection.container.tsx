import React, { FunctionComponent, useCallback } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Pressable, StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector } from '~store'
import { updateTeams } from '~store/championship-creation/championship-creation.slice'

import ChampionshipTeamSelectionScreen from './team-selection.screen'

const styles = StyleSheet.create({
  colorItem: {
    width: 23,
    height: 23,
    borderRadius: 23
  }
})

interface ChampionshipTeamSelectionContainerProps {}

const ChampionshipTeamSelectionContainer: FunctionComponent<
  ChampionshipTeamSelectionContainerProps
> = () => {
  const { teams } = useAppSelector((state) => state.championshipCreation)

  const dispatch = useAppDispatch()

  const renderColorItem = useCallback(
    ({
      item,
      control
    }: {
      item: string
      control: Control<
        {
          teamName: string
          teamColor: string
        },
        object
      >
    }) => (
      <Controller
        name="teamColor"
        control={control}
        render={({ field: { onChange } }) => (
          <Pressable
            onPress={() => onChange(item)}
            style={[styles.colorItem, { backgroundColor: item }]}></Pressable>
        )}
      />
    ),
    []
  )

  const handleAddTeamPress = useCallback(
    (data: { teamName: string; teamColor: string }) => {
      dispatch(
        updateTeams([...teams, { name: data.teamName, color: data.teamColor }])
      )
    },
    [dispatch, teams]
  )

  return (
    <ChampionshipTeamSelectionScreen
      renderColorItem={renderColorItem}
      handleAddTeamPress={handleAddTeamPress}
    />
  )
}

export default ChampionshipTeamSelectionContainer
