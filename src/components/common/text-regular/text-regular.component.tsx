import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

interface TextRegularProps extends TextProps {}

const TextRegular: FunctionComponent<TextRegularProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={[rest.style, { fontFamily: 'Poppins_400Regular' }]}>
      {children}
    </Text>
  )
}

export default TextRegular
