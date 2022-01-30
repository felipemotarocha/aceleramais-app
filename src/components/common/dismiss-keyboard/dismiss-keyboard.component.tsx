import React, { FunctionComponent } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

const DismissKeyboard: FunctionComponent = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
