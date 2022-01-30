import React, { FunctionComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

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
  name: string
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
      name: '',
      userName: '',
      password: '',
      email: ''
    }
  })

  console.log({ errors })
  return (
    <>
      <Header showBack>Crie sua conta</Header>
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
                placeholder="Digite seu nome completo"
                textContentType="name"
                autoCompleteType="name"
                returnKeyType="next"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                hasError={!!errors.name}
                blurOnSubmit={false}
              />
            )}
            name="name"
          />

          {errors.name && (
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
    </>
  )
}

export default SignUpScreen
