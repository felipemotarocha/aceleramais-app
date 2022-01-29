import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

interface TextMediumProps extends TextProps {}

const TextMedium: FunctionComponent<TextMediumProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={[rest.style, { fontFamily: 'Poppins_500Medium' }]}>
      {children}
    </Text>
  )
}

export default TextMedium
