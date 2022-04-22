import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import Colors from '~constants/colors.constants'

import TextBold from '../text-bold/text-bold.component'

interface CustomBottomModalProps {
  header: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomBottomModal: React.FunctionComponent<CustomBottomModalProps> = ({
  children,
  header,
  isVisible,
  setIsVisible
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection={['up', 'left', 'right', 'down']}
      style={styles.view}>
      <View style={styles.content}>
        <TextBold style={{ fontSize: 16 }}>{header}</TextBold>

        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    padding: 20
  }
})

export default CustomBottomModal
