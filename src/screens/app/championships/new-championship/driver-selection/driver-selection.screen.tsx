import React, { FunctionComponent, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import CheckBox from 'expo-checkbox'
import { Controller, useFormContext } from 'react-hook-form'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import ChampionshipTeamsModal from '~components/championship-teams-modal/championship-teams-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import UserHelpers from '~helpers/user.helpers'
import { _Team } from '~store/championship-creation/championship-creation.slice'
import { DriverSelectionForm } from './driver-selection.container'

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

interface ChampionshipDriverSelectionScreenProps {
  teams: _Team[]
  teamInputIsToBeShown: boolean
  handleTeamChange: (team: _Team) => void
  handleAddPress: (data: DriverSelectionForm) => void
}

const ChampionshipDriverSelectionScreen: FunctionComponent<
  ChampionshipDriverSelectionScreenProps
> = ({ teams, teamInputIsToBeShown, handleTeamChange, handleAddPress }) => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit,
    watch
  } = useFormContext()

  const watchIsRegistered = watch('isRegistered')

  const [teamsModalIsVisible, setTeamsModalIsVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Pilotos</Header>
      <DismissKeyboard>
        <View style={styles.content}>
          {watchIsRegistered ? (
            <Controller
              name="userName"
              control={control}
              shouldUnregister
              rules={{
                required: true,
                validate: {
                  alreadyExists: async (value) =>
                    value &&
                    value.length > 3 &&
                    !(await UserHelpers.checkIfUserNameAlreadyExists(value!))
                }
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <CustomInput
                  placeholder="Nome de usuário"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
          ) : (
            <Controller
              name="fullName"
              control={control}
              rules={{ required: true }}
              shouldUnregister
              render={({ field: { onChange, value, onBlur } }) => (
                <CustomInput
                  placeholder="Nome e sobrenome"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
          )}

          {errors.userName?.type === 'required' && (
            <TextMedium
              style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
              Nome de usuário é obrigatório.
            </TextMedium>
          )}

          {errors.userName?.type === 'alreadyExists' && (
            <TextMedium
              style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
              Por favor, insira um nome de usuário válido.
            </TextMedium>
          )}

          {errors.fullName?.type === 'required' && (
            <TextMedium
              style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
              O nome e sobrenome são obrigatórios.
            </TextMedium>
          )}

          {teamInputIsToBeShown && (
            <Pressable onPress={() => setTeamsModalIsVisible(true)}>
              <Controller
                control={control}
                name="team"
                shouldUnregister
                render={({ field: { value } }) => (
                  <CustomInput
                    pointerEvents="none"
                    placeholder="Time"
                    editable={false}
                    style={{ marginTop: 15 }}
                    value={value?.name}
                  />
                )}
              />
            </Pressable>
          )}

          <Controller
            control={control}
            name="isRegistered"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15
                }}>
                <CheckBox
                  disabled={false}
                  value={value}
                  onValueChange={onChange}
                  color={Colors.primary}
                  style={{ borderRadius: 50 }}
                />
                <TextRegular style={{ fontSize: 12, marginLeft: 7 }}>
                  Piloto possui conta no Sim Racer
                </TextRegular>
              </View>
            )}
          />

          <CustomButton
            variant="outlined"
            style={{ marginTop: 15 }}
            onPress={_handleSubmit(handleAddPress as any)}>
            Adicionar
          </CustomButton>
        </View>
      </DismissKeyboard>
      <ChampionshipTeamsModal
        teams={teams}
        isVisible={teamsModalIsVisible}
        setIsVisible={setTeamsModalIsVisible}
        handleTeamChange={handleTeamChange}
      />
    </View>
  )
}

export default ChampionshipDriverSelectionScreen