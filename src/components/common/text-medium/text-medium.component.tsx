import React, { FunctionComponent } from 'react'
import { Text, TextProps } from 'react-native'

import Colors from '~constants/colors.constants'

interface TextMediumProps extends TextProps {}

const TextMedium: FunctionComponent<TextMediumProps> = ({
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        { fontFamily: 'Poppins_500Medium', color: Colors.text },
        rest.style
      ]}>
      {children}
    </Text>
  )
}

export default TextMedium
