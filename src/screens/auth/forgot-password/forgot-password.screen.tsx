import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Keyboard, StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validator from 'validator'

// Components
import Header from '~components/common/header/header.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import Loading from '~components/common/loading/loading.component'

// Styles
import { Container } from './forgot-password.styles'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppSelector } from '~store'

const styles = StyleSheet.create({
  input: {
    marginVertical: 10
  }
})

interface ForgotPasswordScreenProps {
  handleSubmit: (data: { email: string }) => void
}

const ForgotPasswordScreen: FunctionComponent<ForgotPasswordScreenProps> = ({
  handleSubmit
}) => {
  const {
    control,
    handleSubmit: _handleSubmit,
    formState: { errors }
  } = useForm<{ email: string }>({
    defaultValues: {
      email: ''
    }
  })

  const { loading } = useAppSelector((state) => state.user)

  const emailInputRef = useRef<any>(null)

  const handleOnSubmitEditting = useCallback(
    (input: 'emailInputRef') => {
      return {
        emailInputRef: () => Keyboard.dismiss()
      }[input]
    },

    [emailInputRef]
  )

  return (
    <>
      {loading && <Loading />}
      <Header showBack>Esqueci minha senha</Header>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.background }}
        bounces={false}>
        <DismissKeyboard>
          <Container>
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

            <CustomButton
              variant="primary"
              style={{ marginTop: 10 }}
              onPress={_handleSubmit(handleSubmit)}>
              Enviar e-mail de recuperação
            </CustomButton>
          </Container>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    </>
  )
}

export default ForgotPasswordScreen
