import React, { useMemo } from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'

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
  placeholder: {
    fontFamily: 'Poppins_500Medium'
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

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef<any, CustomInputProps>((props, ref) => {
  const { hasError, ...rest } = props

  const stateStyle = useMemo(() => {
    if (hasError) return styles.error

    return styles.normal
  }, [hasError])

  return (
    <TextInput
      {...rest}
      style={[
        rest.style,
        styles.base,
        stateStyle,
        !rest.value && styles.placeholder
      ]}
      ref={ref}
      placeholderTextColor={hasError ? Colors.error : Colors.textSecondary}
      selectionColor={Colors.primary}
    />
  )
})

export default CustomInput
