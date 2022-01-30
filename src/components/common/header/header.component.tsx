import React, { FunctionComponent, useCallback } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

// Components
import TextBold from '../text-bold/text-bold.component'

// Styles
import { Container } from './header.styles'

// Utilities
import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
})

interface HeaderProps {
  showBack: boolean
  renderRight?: React.ReactNode
}

const Header: FunctionComponent<HeaderProps> = ({
  children,
  showBack,
  renderRight
}) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation])

  return (
    <Container
      style={{
        paddingTop: Platform.OS === 'android' ? insets.top : insets.top + 25,
        ...styles.container
      }}>
      {showBack && (
        <Feather
          accessibilityLabel="Back"
          name="chevron-left"
          size={25}
          color={Colors.text}
          onPress={handleBackPress}
        />
      )}
      <TextBold style={{ fontSize: 16 }}>{children}</TextBold>
      <View>{renderRight && renderRight}</View>
    </Container>
  )
}

export default Header
