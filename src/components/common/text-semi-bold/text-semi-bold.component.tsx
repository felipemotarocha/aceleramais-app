import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

import Colors from '~constants/colors.constants'

interface TextSemiBoldProps extends TextProps {}

const TextSemiBold: FunctionComponent<TextSemiBoldProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        rest.style,
        { fontFamily: 'Poppins_600SemiBold', color: Colors.text }
      ]}>
      {children}
    </Text>
  )
}

export default TextSemiBold
