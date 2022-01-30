import React, { FunctionComponent, useMemo } from 'react'
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native'

import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.input.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.input.background
  },
  normal: {
    color: Colors.textSecondary
  },
  error: {
    color: Colors.error,
    borderColor: Colors.error
  }
})

interface CustomInputProps extends TextInputProps {
  hasError?: boolean
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  hasError = false,
  ...rest
}) => {
  const stateStyle = useMemo(() => {
    if (hasError) return styles.error

    return styles.normal
  }, [hasError])

  return (
    <View>
      <TextInput
        {...rest}
        style={[rest.style, styles.base, stateStyle]}
        placeholderTextColor={hasError ? Colors.error : Colors.textSecondary}
        selectionColor={Colors.primary}
      />
    </View>
  )
}

export default CustomInput
