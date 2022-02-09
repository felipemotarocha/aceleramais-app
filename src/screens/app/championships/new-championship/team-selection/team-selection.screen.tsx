import React, { FunctionComponent } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import { View, StyleSheet, FlatList } from 'react-native'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import TeamsConstants from '~constants/teams.constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    padding: 20
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonsRow: {
    width: '100%',
    flexDirection: 'row'
  },
  colorLine: {
    height: '100%',
    borderRadius: 5,
    borderWidth: 3,
    marginRight: 10
  }
})

interface ChampionshipTeamSelectionScreenProps {
  renderColorItem: ({
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
    // eslint-disable-next-line no-undef
  }) => JSX.Element
  handleAddTeamPress: (data: { teamName: string; teamColor: string }) => void
}

const ChampionshipTeamSelectionScreen: FunctionComponent<
  ChampionshipTeamSelectionScreenProps
> = ({ renderColorItem, handleAddTeamPress }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<{ teamName: string; teamColor: string }>()

  const watchColor = watch('teamColor')

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Times</Header>
      <View style={styles.content}>
        <View style={styles.inputRow}>
          <View style={[styles.colorLine, { borderColor: watchColor }]} />
          <Controller
            rules={{ required: true }}
            name="teamName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Nome"
                style={{ flex: 1 }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                hasError={!!errors?.teamName}
                autoCorrect={false}
              />
            )}
          />
        </View>

        {errors.teamName && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            O nome é obrigatório.
          </TextMedium>
        )}

        <FlatList
          data={TeamsConstants.predefinedColors}
          horizontal
          style={{ flexGrow: 0, marginVertical: 15 }}
          contentContainerStyle={{
            flexGrow: 0,
            width: '100%',
            justifyContent: 'space-between'
          }}
          renderItem={({ item }) => renderColorItem({ item, control })}
          keyExtractor={(item) => item}
        />

        <View style={styles.buttonsRow}>
          <CustomButton variant="outlined" style={{ flex: 1, marginRight: 15 }}>
            Personalizar Cor
          </CustomButton>
          <CustomButton
            variant="outlined"
            style={{ flex: 1 }}
            onPress={handleSubmit(handleAddTeamPress)}>
            Adicionar
          </CustomButton>
        </View>
      </View>
    </View>
  )
}

export default ChampionshipTeamSelectionScreen
