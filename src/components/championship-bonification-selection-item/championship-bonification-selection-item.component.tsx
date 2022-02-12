import React, { FunctionComponent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { View, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'

// Utilities
import Colors from '~constants/colors.constants'

interface ChampionshipBonificationSelectionItemProps {
  id: string
  name: string
  points: number
  handleRemovePress: (id: string) => void
}

const ChampionshipBonificationSelectionItem: FunctionComponent<
  ChampionshipBonificationSelectionItemProps
> = ({ id, name, points, handleRemovePress }) => {
  const { control, formState } = useFormContext()

  return (
    <View style={styles.container}>
      <View style={[styles.input, { marginRight: 10, flex: 2 }]}>
        <Controller
          shouldUnregister
          defaultValue={name}
          control={control}
          rules={{ required: true }}
          name={`${id}/name`}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <CustomInput
                placeholder="Nome"
                defaultValue={name}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                hasError={!!formState.errors?.[`${id}/name`]}
              />
            )
          }}
        />
      </View>

      <View style={styles.input}>
        <Controller
          shouldUnregister
          defaultValue={points.toString()}
          control={control}
          rules={{ required: true }}
          name={`${id}/points`}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <CustomInput
                style={{ marginRight: 10 }}
                placeholder="Pontos"
                defaultValue={points.toString()}
                keyboardType="numeric"
                onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ''))}
                onBlur={onBlur}
                value={value}
                hasError={!!formState.errors?.[`${id}/points`]}
              />
            )
          }}
        />
      </View>

      <Pressable
        style={styles.remove}
        onPress={() => handleRemovePress(id)}
        accessibilityLabel={`Remove ${name}`}>
        <AntDesign
          name="close"
          size={24}
          color={formState.errors?.[name] ? Colors.error : Colors.textSecondary}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1
  },
  remove: {
    justifyContent: 'center'
  },
  error: {
    borderColor: Colors.error
  },
  errorText: {
    color: Colors.error
  }
})

export default ChampionshipBonificationSelectionItem
