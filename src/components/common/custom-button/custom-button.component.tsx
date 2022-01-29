import React, { FunctionComponent, useMemo } from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

import TextSemiBold from '../text-semi-bold/text-semi-bold.component'

import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  base: {
    borderRadius: 50,
    color: Colors.text,
    flex: 1
  },
  primary: {
    backgroundColor: Colors.primary
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.textSecondary
  }
})

interface CustomButtonProps extends PressableProps {
  variant: 'primary' | 'outlined'
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  variant
}) => {
  const variantStyles = useMemo(() => {
    return {
      primary: styles.primary,
      outlined: styles.outlined
    }[variant]
  }, [variant])

  return (
    <Pressable
      style={[styles.base, variantStyles]}
      accessibilityLabel="Press the button">
      <TextSemiBold style={{ fontSize: 12 }}>{children}</TextSemiBold>
    </Pressable>
  )
}

export default CustomButton
