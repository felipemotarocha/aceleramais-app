import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

interface TextSemiBoldProps extends TextProps {}

const TextSemiBold: FunctionComponent<TextSemiBoldProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text {...rest} style={[rest.style, { fontFamily: 'Poppins_600SemiBold' }]}>
      {children}
    </Text>
  )
}

export default TextSemiBold
