import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validator from 'validator'
import { Feather } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'

// Components
import Header from '~components/common/header/header.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import Loading from '~components/common/loading/loading.component'

// Styles
import { Container, ImagePickerButton } from './sign-up.styles'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppSelector } from '~store'
import { SignUpScreenRouteProp } from '~navigators/auth/auth-stack.navigator.types'

const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
})

export type SignUpFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  userName: string
}

interface SignUpScreenProps {
  profileImageUri?: string
  handleSubmit: (data: SignUpFormData) => void
  checkIfUsernameAlreadyExists: (userName: string) => Promise<boolean>
  handlePickImagePress: () => Promise<void>
}

const SignUpScreen: FunctionComponent<SignUpScreenProps> = ({
  profileImageUri,
  handleSubmit,
  checkIfUsernameAlreadyExists,
  handlePickImagePress
}) => {
  const { params } = useRoute<SignUpScreenRouteProp>()

  const {
    control,
    handleSubmit: _handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    defaultValues: params?.defaultValues || {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: ''
    }
  })

  const { loading } = useAppSelector((state) => state.user)

  const userNameInputRef = useRef<any>(null)
  const firstNameInputRef = useRef<any>(null)
  const lastNameInputRef = useRef<any>(null)
  const emailInputRef = useRef<any>(null)
  const passwordInputRef = useRef<any>(null)

  const handleOnSubmitEditting = useCallback(
    (
      input:
        | 'userNameInputRef'
        | 'firstNameInputRef'
        | 'lastNameInputRef'
        | 'emailInputRef'
        | 'passwordInputRef'
    ) => {
      return {
        firstNameInputRef: () => lastNameInputRef?.current?.focus(),
        lastNameInputRef: () => emailInputRef?.current?.focus(),
        emailInputRef: () => passwordInputRef?.current?.focus(),
        passwordInputRef: () => userNameInputRef?.current?.focus(),
        userNameInputRef: () => Keyboard.dismiss()
      }[input]
    },

    [
      userNameInputRef,
      firstNameInputRef,
      lastNameInputRef,
      emailInputRef,
      passwordInputRef
    ]
  )

  return (
    <>
      {loading && <Loading />}
      <Header showBack>
        {params?.isEdit ? 'Editar perfil' : 'Crie sua conta'}
      </Header>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: Colors.background }}
        bounces={false}>
        <DismissKeyboard>
          <Container>
            <ImagePickerButton
              onPress={handlePickImagePress}
              showBackground={!profileImageUri}>
              {profileImageUri ? (
                <Image
                  source={{
                    uri: `${profileImageUri}?${new Date().toISOString()}`
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
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  accessibilityLabel="Digite seu nome"
                  textContentType="givenName"
                  autoCompleteType="name"
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.firstName}
                  blurOnSubmit={false}
                  onSubmitEditing={handleOnSubmitEditting('firstNameInputRef')}
                  ref={firstNameInputRef}
                />
              )}
              name="firstName"
            />

            {errors.firstName && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Seu nome é obrigatório.
              </TextMedium>
            )}

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={styles.input}
                  placeholder="Digite seu sobrenome"
                  accessibilityLabel="Digite seu sobrenome"
                  textContentType="familyName"
                  autoCompleteType="name"
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.lastName}
                  blurOnSubmit={false}
                  onSubmitEditing={handleOnSubmitEditting('lastNameInputRef')}
                  ref={lastNameInputRef}
                />
              )}
              name="lastName"
            />

            {errors.lastName && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Seu sobrenome é obrigatório.
              </TextMedium>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                validate: {
                  isValid: (value) => validator.isEmail(value)
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  editable={!params?.isEdit}
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  accessibilityLabel="Digite seu e-mail"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.email}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  onSubmitEditing={handleOnSubmitEditting('emailInputRef')}
                  ref={emailInputRef}
                />
              )}
              name="email"
            />

            {errors.email?.type === 'required' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                E-mail é obrigatório.
              </TextMedium>
            )}

            {errors.email?.type === 'isValid' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Por favor, insira um e-mail válido.
              </TextMedium>
            )}

            {!params?.isEdit && (
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 6
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    accessibilityLabel="Digite sua senha"
                    textContentType="password"
                    autoCompleteType="password"
                    returnKeyType="next"
                    secureTextEntry
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    hasError={!!errors.password}
                    blurOnSubmit={false}
                    onSubmitEditing={handleOnSubmitEditting('passwordInputRef')}
                    ref={passwordInputRef}
                  />
                )}
                name="password"
              />
            )}

            {errors.password?.type === 'required' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Senha é obrigatória.
              </TextMedium>
            )}

            {errors.password?.type === 'minLength' && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                A senha deve ter no mínimo 6 caracteres.
              </TextMedium>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 30,
                validate: {
                  alreadyExists: async (value) => {
                    return (
                      value === params?.defaultValues?.userName ||
                      (await checkIfUsernameAlreadyExists(value))
                    )
                  }
                },
                pattern: /^(?!.\.\.)(?!.\.$)[^\W][\w.]{0,29}$/
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
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
                  ref={userNameInputRef}
                  onSubmitEditing={handleOnSubmitEditting('userNameInputRef')}
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
              onPress={_handleSubmit(handleSubmit)}>
              {params?.isEdit ? 'Salvar' : 'Criar Conta'}
            </CustomButton>
          </Container>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    </>
  )
}

export default SignUpScreen
