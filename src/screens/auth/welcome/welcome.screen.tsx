import React, { FunctionComponent } from 'react'
import { Image, StyleSheet } from 'react-native'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'
import SignInWithGoogleButton from '~components/common/sign-in-with-google-button/sign-in-with-google-button.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Styles
import { Buttons, Container, Content } from './welcome.styles'

const styles = StyleSheet.create({
  button: { marginVertical: 7.5 }
})

interface WelcomeScreenProps {
  handleSignUpPress: () => void
  handleSignInWithEmailAndPasswordPress: () => void
}

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = ({
  handleSignUpPress,
  handleSignInWithEmailAndPasswordPress
}) => {
  return (
    <Container>
      <Image
        source={{
          uri: 'https://sim-racer.s3.sa-east-1.amazonaws.com/unsplash_RNl62zcpSy0.png'
        }}
        style={{ resizeMode: 'cover', flex: 1 }}
      />

      <Content>
        <TextBold style={{ fontSize: 18, textAlign: 'center' }}>
          Campeonatos do Automobilismo Virtual na palma da sua mão. De graça.
        </TextBold>

        <Buttons>
          <CustomButton
            variant="primary"
            style={styles.button}
            onPress={handleSignUpPress}>
            Cadastre-se gratuitamente
          </CustomButton>

          <CustomButton
            variant="outlined"
            style={styles.button}
            onPress={handleSignInWithEmailAndPasswordPress}>
            Entrar com e-mail e senha
          </CustomButton>

          <SignInWithGoogleButton style={styles.button}>
            Continuar com o Google
          </SignInWithGoogleButton>

          <CustomButton variant="outlined" style={styles.button}>
            Continuar com a Apple
          </CustomButton>
        </Buttons>
      </Content>
    </Container>
  )
}

export default WelcomeScreen
