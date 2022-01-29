import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

import Colors from '~constants/colors.constants'

interface TextRegularProps extends TextProps {}

const TextRegular: FunctionComponent<TextRegularProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        rest.style,
        { fontFamily: 'Poppins_400Regular', color: Colors.text }
      ]}>
      {children}
    </Text>
  )
}

export default TextRegular
