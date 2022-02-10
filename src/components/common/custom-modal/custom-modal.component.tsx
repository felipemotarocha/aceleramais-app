import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons'

// Components
import TextBold from '../text-bold/text-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

interface CustomModalProps {
  title: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomModal: FunctionComponent<CustomModalProps> = ({
  children,
  title,
  isVisible,
  setIsVisible
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      animationIn={'slideInUp'}
      style={{
        margin: 0,
        paddingTop: Platform.OS === 'ios' ? insets.top + 25 : 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }}
      hasBackdrop={false}
      swipeDirection="down"
      onSwipeComplete={() => setIsVisible(false)}
      backdropOpacity={0.3}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            accessibilityLabel="Back"
            name="close"
            size={25}
            color={Colors.text}
            onPress={() => setIsVisible(false)}
          />

          <TextBold style={{ fontSize: 16, alignSelf: 'center' }}>
            {title}
          </TextBold>

          <View></View>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  header: {
    width: '100%',
    backgroundColor: Colors.backgroundSecondary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default CustomModal
