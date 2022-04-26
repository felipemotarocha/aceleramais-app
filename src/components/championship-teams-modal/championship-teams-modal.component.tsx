import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'

// Components
import CustomModal from '~components/common/custom-modal/custom-modal.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import CustomInput from '~components/common/custom-input/custom-input.component'

import { _Team } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipTeamsModalProps {
  teams: _Team[]
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  handleTeamChange: (team: _Team | null) => void
}

const ChampionshipTeamsModal: FunctionComponent<
  ChampionshipTeamsModalProps
> = ({ teams, isVisible, setIsVisible, handleTeamChange }) => {
  const { control, watch } = useForm<{ filter: string }>({ mode: 'onChange' })

  const watchFilter = watch('filter')

  const filteredTeams = useMemo(() => {
    const none = { id: uuidv4(), name: 'Nenhum', color: '#BBB' }
    if (!watchFilter) return [none, ...teams]

    return [
      none,
      ...teams.filter((team) =>
        team.name.toLowerCase().startsWith(watchFilter.toLowerCase())
      )
    ]
  }, [watchFilter])

  const handlePress = useCallback((team: _Team | null) => {
    handleTeamChange(team)
    setIsVisible(false)
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: _Team }) => (
      <Pressable
        onPress={() => handlePress(item.name === 'Nenhum' ? null : item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20
        }}>
        <View style={[styles.circle, { borderColor: item.color }]}></View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.colorLine, { borderColor: item.color }]}></View>
          <TextMedium style={{ fontSize: 12 }}>{item.name}</TextMedium>
        </View>
      </Pressable>
    ),
    []
  )

  return (
    <CustomModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      showHeader
      title="Selecionar Time">
      <View style={styles.container}>
        <Controller
          control={control}
          name="filter"
          render={({ field: { onChange, value, onBlur } }) => (
            <CustomInput
              placeholder="Buscar time..."
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />

        <FlatList
          style={{ zIndex: 10 }}
          contentContainerStyle={{ zIndex: 10 }}
          data={filteredTeams}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 3
  },
  colorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 8,
    height: 15
  }
})

export default ChampionshipTeamsModal
