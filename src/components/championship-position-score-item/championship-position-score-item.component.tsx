import React, { FunctionComponent, useEffect } from 'react'
import {
  Controller,
  FieldValues,
  useFormContext,
  UseFormReset,
  UseFormSetValue
} from 'react-hook-form'
import { View, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  position: {
    borderWidth: 2,
    borderColor: Colors.input.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 3.5,
    marginHorizontal: 10
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

interface ChampionshipPositionScoreItemProps {
  position: number
  points: number
  handleRemovePress: (
    position: number,
    setValue: UseFormSetValue<FieldValues>,
    reset: UseFormReset<FieldValues>
  ) => Promise<void>
}

const ChampionshipPositionScoreItem: FunctionComponent<
  ChampionshipPositionScoreItemProps
> = ({ position, points, handleRemovePress }) => {
  const { control, formState, setValue, reset } = useFormContext()

  useEffect(() => {
    setValue(position.toString(), points.toString())
  }, [position, points])

  return (
    <View style={styles.container}>
      <View
        style={[styles.position, formState.errors?.[position] && styles.error]}>
        <TextSemiBold
          numberOfLines={1}
          style={[
            { fontSize: 12, flex: 1, textAlignVertical: 'center' },
            formState.errors?.[position] && styles.errorText
          ]}>
          {position}º Lugar
        </TextSemiBold>
      </View>

      <View style={styles.input}>
        <Controller
          defaultValue={points.toString()}
          control={control}
          rules={{ required: true }}
          name={position.toString()}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <CustomInput
                placeholder="Pontos"
                defaultValue={points.toString()}
                keyboardType="numeric"
                onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ''))}
                onBlur={onBlur}
                value={value}
                hasError={!!formState.errors?.[position]}
              />
            )
          }}
        />
      </View>

      <Pressable
        style={styles.remove}
        onPress={() => handleRemovePress(position, setValue, reset)}
        accessibilityLabel={`Remove ${position}`}>
        <AntDesign
          name="close"
          size={24}
          color={
            formState.errors?.[position] ? Colors.error : Colors.textSecondary
          }
        />
      </Pressable>
    </View>
  )
}

export default ChampionshipPositionScoreItem
