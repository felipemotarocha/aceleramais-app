import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import CheckBox from 'expo-checkbox'
import { Controller, useForm } from 'react-hook-form'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'

// Utilities
import Colors from '~constants/colors.constants'
import UserHelpers from '~helpers/user.helpers'

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

interface ChampionshipDriverSelectionScreenProps {}

const ChampionshipDriverSelectionScreen: FunctionComponent<
  ChampionshipDriverSelectionScreenProps
> = () => {
  const {
    control,
    formState: { errors },
    watch
  } = useForm<{
    userName?: string
    fullName?: string
    team?: string
    isRegistered: boolean
  }>({ defaultValues: { isRegistered: false }, mode: 'onChange' })

  const watchIsRegistered = watch('isRegistered')

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

          <CustomInput
            placeholder="Time"
            editable={false}
            style={{ marginTop: 15 }}
          />

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
        </View>
      </DismissKeyboard>
    </View>
  )
}

export default ChampionshipDriverSelectionScreen
