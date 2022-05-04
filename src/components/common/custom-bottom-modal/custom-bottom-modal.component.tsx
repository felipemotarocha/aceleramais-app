import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import Colors from '~constants/colors.constants'

import TextBold from '../text-bold/text-bold.component'

interface CustomBottomModalProps extends Partial<ModalProps> {
  header: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomBottomModal: React.FunctionComponent<CustomBottomModalProps> = ({
  children,
  header,
  isVisible,
  setIsVisible,
  ...rest
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection={['down']}
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      style={styles.view}
      {...rest}>
      <View style={styles.content}>
        <TextBold
          style={{ fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
          {header}
        </TextBold>

        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
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
