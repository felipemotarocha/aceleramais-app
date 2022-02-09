import React, { FunctionComponent, useCallback } from 'react'
import { Control, Controller, UseFormReset } from 'react-hook-form'
import { Pressable, StyleSheet, View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'

// Components
import ChampionshipTeamItem from '~components/championship-team-item/championship-team-item.component'

// Screens
import ChampionshipTeamSelectionScreen from './team-selection.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  updateTeams,
  _Team
} from '~store/championship-creation/championship-creation.slice'

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
    (
      data: { teamName: string; teamColor: string },
      reset: UseFormReset<{
        teamName: string
        teamColor: string
      }>
    ) => {
      dispatch(
        updateTeams([
          ...teams,
          { id: uuidv4(), name: data.teamName, color: data.teamColor }
        ])
      )

      reset()
    },
    [dispatch, teams]
  )

  const handleRemoveTeamPress = useCallback(
    (teamId: string) => {
      const newTeams = teams.filter((team) => team.id !== teamId)

      dispatch(updateTeams(newTeams))
    },

    [teams, dispatch]
  )

  const renderTeamItem = useCallback(
    ({ item }: { item: _Team }) => (
      <View style={{ marginBottom: 20 }}>
        <ChampionshipTeamItem
          team={item}
          handleRemovePress={handleRemoveTeamPress}
        />
      </View>
    ),
    [teams]
  )

  return (
    <ChampionshipTeamSelectionScreen
      teams={teams}
      renderColorItem={renderColorItem}
      handleAddTeamPress={handleAddTeamPress}
      renderTeamItem={renderTeamItem}
    />
  )
}

export default ChampionshipTeamSelectionContainer
