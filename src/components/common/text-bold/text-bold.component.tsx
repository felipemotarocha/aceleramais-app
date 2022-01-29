import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

interface TextBoldProps extends TextProps {}

const TextBold: FunctionComponent<TextBoldProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={[rest.style, { fontFamily: 'Poppins_700Bold' }]}>
      {children}
    </Text>
  )
}

export default TextBold
