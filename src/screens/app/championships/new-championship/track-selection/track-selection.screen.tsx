import { isEmpty } from 'lodash'
import React, { FunctionComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

// Components
import Header from '~components/common/header/header.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'
import Track from '~types/track.types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    padding: 20
  }
})

interface ChampionshipTrackSelectionScreenProps {
  tracks: ({ isSelected: boolean } & Track)[]
  filteredTracks: ({ isSelected: boolean } & Track)[]
  noTrackIsSelected: boolean
  handleSearchChange: (value: string) => void
  handleSubmit: (data: { search: string }) => void
  renderItem: (
    track: Track & {
      isSelected: boolean
    }
    // eslint-disable-next-line no-undef
  ) => JSX.Element
}

const ChampionshipTrackSelectionScreen: FunctionComponent<
  ChampionshipTrackSelectionScreenProps
> = ({
  tracks,
  filteredTracks,
  noTrackIsSelected,
  handleSearchChange,
  handleSubmit,
  renderItem
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit
  } = useForm()

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Circuitos</Header>

      <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 }}>
        <Controller
          control={control}
          rules={{
            required: noTrackIsSelected
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Buscar Circuito..."
              onChangeText={(value) => {
                handleSearchChange(value)
                onChange(value)
              }}
              onBlur={onBlur}
              value={value}
              hasError={!!errors?.search}
            />
          )}
          name="search"
        />

        {errors.search && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Você precisa selecionar pelo menos 1 circuito para continuar.
          </TextMedium>
        )}
      </View>

      <FlatList
        renderItem={({ item }) => renderItem(item)}
        data={isEmpty(filteredTracks) ? tracks : filteredTracks}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20
        }}
      />

      <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 10 }}>
        <CustomButton
          variant="primary"
          onPress={_handleSubmit(handleSubmit as any)}>
          Avançar
        </CustomButton>
      </View>
    </View>
  )
}

export default ChampionshipTrackSelectionScreen
