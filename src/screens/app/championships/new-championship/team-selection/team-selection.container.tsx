import React, { FunctionComponent, useCallback } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Pressable, StyleSheet } from 'react-native'

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
      console.log({ data })
    },
    []
  )

  return (
    <ChampionshipTeamSelectionScreen
      renderColorItem={renderColorItem}
      handleAddTeamPress={handleAddTeamPress}
    />
  )
}

export default ChampionshipTeamSelectionContainer
