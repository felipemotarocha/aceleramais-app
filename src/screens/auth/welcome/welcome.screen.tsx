import React, { FunctionComponent } from 'react'
import { Image, StyleSheet } from 'react-native'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'

// Styles
import { Buttons, Container, Content } from './welcome.styles'

const styles = StyleSheet.create({
  button: { marginVertical: 7.5 }
})

interface WelcomeScreenProps {}

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = () => {
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
          <CustomButton variant="primary" style={styles.button}>
            Cadastre-se gratuitamente
          </CustomButton>

          <CustomButton variant="outlined" style={styles.button}>
            Entrar com e-mail e senha
          </CustomButton>

          <CustomButton variant="outlined" style={styles.button}>
            Continuar com o Google
          </CustomButton>

          <CustomButton variant="outlined" style={styles.button}>
            Continuar com a Apple
          </CustomButton>
        </Buttons>
      </Content>
    </Container>
  )
}

export default WelcomeScreen
