import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Keyboard, StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Components
import Header from '~components/common/header/header.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Styles
import { Container } from './sign-up.styles'

// Utilities
import Colors from '~constants/colors.constants'

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
  handleSubmit: (data: SignUpFormData) => void
}

const SignUpScreen: FunctionComponent<SignUpScreenProps> = ({
  handleSubmit
}) => {
  const {
    control,
    handleSubmit: _handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: ''
    }
  })

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
      <Header showBack>Crie sua conta</Header>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.background }}
        bounces={false}>
        <DismissKeyboard>
          <Container>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  textContentType="name"
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
                  textContentType="name"
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
                  placeholder="Digite seu e-mail"
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

            {errors.email && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                E-mail é obrigatório.
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
                  placeholder="Digite sua senha"
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

            {errors.password && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Senha é obrigatória.
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
                  placeholder="Digite seu nome de usuário"
                  textContentType="nickname"
                  autoCompleteType="username"
                  autoCapitalize="none"
                  onChangeText={onChange}
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

            {errors.userName && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Nome de usuário é obrigatório.
              </TextMedium>
            )}

            <CustomButton
              variant="primary"
              style={{ marginTop: 10 }}
              onPress={_handleSubmit(handleSubmit)}>
              Criar Conta
            </CustomButton>
          </Container>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    </>
  )
}

export default SignUpScreen
