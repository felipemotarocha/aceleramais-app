import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

import Colors from '~constants/colors.constants'

interface TextBoldProps extends TextProps {}

const TextBold: FunctionComponent<TextBoldProps> = ({ children, ...rest }) => {
  return (
    <Text
      {...rest}
      style={[
        rest.style,
        { fontFamily: 'Poppins_700Bold', color: Colors.text }
      ]}>
      {children}
    </Text>
  )
}

export default TextBold
