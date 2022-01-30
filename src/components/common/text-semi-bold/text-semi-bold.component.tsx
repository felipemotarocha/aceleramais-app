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
        { fontFamily: 'Poppins_600SemiBold', color: Colors.text },
        rest.style
      ]}>
      {children}
    </Text>
  )
}

export default TextSemiBold
