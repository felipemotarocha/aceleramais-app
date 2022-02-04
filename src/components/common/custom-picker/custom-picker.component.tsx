import React, { FunctionComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  picker: {
    backgroundColor: Colors.input.background,
    borderRadius: 10,
    marginVertical: 10
  },
  item: {
    borderRadius: 10,
    backgroundColor: '#000000'
  }
})

interface CustomPickerProps {
  selectedValue?: any
  onValueChange?: (itemValue: any, itemIndex: number) => void
}

const CustomPicker: FunctionComponent<CustomPickerProps> = ({
  children,
  selectedValue,
  onValueChange
}) => {
  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      itemStyle={styles.item}>
      <Picker.Item
        style={styles.item}
        label="Playstation"
        value="Playstation"
      />
      <Picker.Item style={styles.item} label="Xbox" value="Xbox" />
    </Picker>
  )
}

export default CustomPicker
