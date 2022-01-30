import React, { FunctionComponent, useMemo } from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

import TextSemiBold from '../text-semi-bold/text-semi-bold.component'

import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  base: {
    borderRadius: 50,
    color: Colors.text,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  primary: {
    backgroundColor: Colors.primary
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.textSecondary
  },
  disabled: {
    backgroundColor: Colors.button.disabled
  }
})

interface CustomButtonProps extends PressableProps {
  variant: 'primary' | 'outlined'
  disabled?: boolean
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  variant,
  disabled = false,
  ...rest
}) => {
  const variantStyles = useMemo(() => {
    return {
      primary: styles.primary,
      outlined: styles.outlined
    }[variant]
  }, [variant])

  return (
    <Pressable
      {...rest}
      onPress={disabled ? () => {} : rest.onPress}
      style={[
        styles.base,
        variantStyles,
        disabled && styles.disabled,
        rest.style as any
      ]}
      accessibilityLabel="Press the button">
      <TextSemiBold style={{ fontSize: 12 }}>{children}</TextSemiBold>
    </Pressable>
  )
}

export default CustomButton
