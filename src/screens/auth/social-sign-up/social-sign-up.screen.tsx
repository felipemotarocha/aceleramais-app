import React, { FunctionComponent, useRef } from 'react'
import { Keyboard, StyleSheet, Image, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'

// Components
import Header from '~components/common/header/header.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import { ImagePickerButton } from '../sign-up/sign-up.styles'

// Utilities
import Colors from '~constants/colors.constants'
import UserHelpers from '~helpers/user.helpers'
import { SocialSignUpScreenRouteProp } from '~navigators/auth/auth-stack.navigator.types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    marginVertical: 10
  }
})

interface SocialSignUpProps {
  profileImageUri?: string
  handlePickImagePress: () => Promise<void>
  handleContinuePress: (data: { userName: string }) => void
}

const SocialSignUp: FunctionComponent<SocialSignUpProps> = ({
  profileImageUri,
  handlePickImagePress,
  handleContinuePress
}) => {
  const userNameRef = useRef<any>()

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<{ userName: string; lastName?: string }>()

  const {
    params: { lastName, profileImageUrl }
  } = useRoute<SocialSignUpScreenRouteProp>()

  return (
    <DismissKeyboard>
      <View style={{ backgroundColor: Colors.background, flex: 1 }}>
        <Header showBack>Complete seu cadastro</Header>
        <View style={{ marginTop: 20 }}>
          <ImagePickerButton
            onPress={handlePickImagePress}
            showBackground={!profileImageUri && !profileImageUrl}>
            {profileImageUri ? (
              <Image
                source={{
                  uri: profileImageUri
                }}
                resizeMode="cover"
                style={{ borderRadius: 200, flex: 1 }}
              />
            ) : profileImageUrl ? (
              <Image
                source={{
                  uri: profileImageUrl
                }}
                resizeMode="cover"
                style={{ borderRadius: 200, flex: 1 }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Feather
                  name="camera"
                  size={72}
                  color={Colors.input.placeholder}
                />
              </View>
            )}
          </ImagePickerButton>
        </View>
        <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}>
          <View style={styles.container}>
            {isEmpty(lastName) && (
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                shouldUnregister
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    style={styles.input}
                    placeholder="Digite seu sobrenome"
                    accessibilityLabel="Digite seu sobrenome"
                    textContentType="familyName"
                    autoCompleteType="name"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    hasError={!!errors.lastName}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => userNameRef.current?.focus()}
                  />
                )}
                name="lastName"
              />
            )}

            {errors.lastName?.type === 'required' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Sobrenome é obrigatório.
              </TextMedium>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 30,
                validate: {
                  alreadyExists: async (value) =>
                    await UserHelpers.checkIfUserNameAlreadyExists(value)
                },
                pattern: /^(?!.\.\.)(?!.\.$)[^\W][\w.]{0,29}$/
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  ref={userNameRef}
                  style={styles.input}
                  placeholder="Digite seu nome de usuário"
                  accessibilityLabel="Digite seu nome de usuário"
                  textContentType="nickname"
                  autoCompleteType="username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => onChange(value.trim())}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.userName}
                  blurOnSubmit={false}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              )}
              name="userName"
            />

            {errors.userName?.type === 'required' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Nome de usuário é obrigatório.
              </TextMedium>
            )}

            {errors.userName?.type === 'alreadyExists' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Esse nome de usuário já está sendo utilizado.
              </TextMedium>
            )}

            {errors.userName?.type === 'maxLength' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                O tamanho máximo é de 30 caracteres.
              </TextMedium>
            )}

            <CustomButton
              variant="primary"
              style={{ marginTop: 10 }}
              onPress={handleSubmit(handleContinuePress)}>
              Continuar
            </CustomButton>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </DismissKeyboard>
  )
}

export default SocialSignUp
