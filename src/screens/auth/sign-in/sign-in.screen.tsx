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
import Loading from '~components/common/loading/loading.component'

// Styles
import { Container } from './sign-in.styles'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppSelector } from '~store'

const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
})

export type SignInFormData = {
  email: string
  password: string
}

interface SignInScreenProps {
  handleSubmit: (data: SignInFormData) => void
}

const SignInScreen: FunctionComponent<SignInScreenProps> = ({
  handleSubmit
}) => {
  const {
    control,
    handleSubmit: _handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { loading } = useAppSelector((state) => state.user)

  const emailInputRef = useRef<any>(null)
  const passwordInputRef = useRef<any>(null)

  const handleOnSubmitEditting = useCallback(
    (input: 'emailInputRef' | 'passwordInputRef') => {
      return {
        emailInputRef: () => passwordInputRef?.current?.focus(),
        passwordInputRef: () => Keyboard.dismiss()
      }[input]
    },

    [emailInputRef, passwordInputRef]
  )

  return (
    <>
      {loading && <Loading />}
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

            {errors.password && (
              <TextMedium style={{ fontSize: 12, color: Colors.error }}>
                Senha é obrigatória.
              </TextMedium>
            )}

            <CustomButton
              variant="primary"
              style={{ marginTop: 10 }}
              onPress={_handleSubmit(handleSubmit)}>
              Entrar
            </CustomButton>
          </Container>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    </>
  )
}

export default SignInScreen
