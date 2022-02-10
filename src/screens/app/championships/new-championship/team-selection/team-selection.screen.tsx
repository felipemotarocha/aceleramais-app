import React, { FunctionComponent } from 'react'
import { Control, Controller, useForm, UseFormReset } from 'react-hook-form'
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import { isEmpty } from 'lodash'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Redux
import { _Team } from '~store/championship-creation/championship-creation.slice'

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
    padding: 20,
    paddingBottom: 0
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
  teams: _Team[]
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
  handleAddTeamPress: (
    data: {
      teamName: string
      teamColor: string
    },
    reset: UseFormReset<{
      teamName: string
      teamColor: string
    }>
  ) => void
  renderTeamItem: ListRenderItem<_Team> | null | undefined
  handleSubmit: () => void
}

const ChampionshipTeamSelectionScreen: FunctionComponent<
  ChampionshipTeamSelectionScreenProps
> = ({
  teams,
  renderColorItem,
  renderTeamItem,
  handleAddTeamPress,
  handleSubmit
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit,
    reset,
    watch
  } = useForm<{ teamName: string; teamColor: string }>({
    defaultValues: {
      teamName: '',
      teamColor: Colors.text
    }
  })

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
                onSubmitEditing={_handleSubmit((data) => {
                  handleAddTeamPress(data, reset)
                })}
                blurOnSubmit={false}
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
          <CustomButton
            variant="outlined"
            style={{ flex: 1 }}
            onPress={_handleSubmit((data) => {
              handleAddTeamPress(data, reset)
            })}>
            Adicionar
          </CustomButton>
        </View>

        <View style={{ flex: 1, marginTop: 20 }}>
          <FlatList
            data={teams}
            renderItem={renderTeamItem}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          {isEmpty(teams) ? (
            <CustomButton variant="outlined" onPress={handleSubmit}>
              Pular
            </CustomButton>
          ) : (
            <CustomButton variant="primary" onPress={handleSubmit}>
              Avançar
            </CustomButton>
          )}
        </View>
      </View>
    </View>
  )
}

export default ChampionshipTeamSelectionScreen
