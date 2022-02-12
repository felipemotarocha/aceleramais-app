import React, { FunctionComponent, useRef } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReset
} from 'react-hook-form'
import { ListRenderItem, Platform, StyleSheet, View } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

// Components
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'
import { _Bonification } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipBonificationSelectionScreenProps {
  bonifications: _Bonification[]
  renderItem: ListRenderItem<any> | null | undefined
  handleAddPress: (
    data: {
      points: string
      name: string
    },
    reset: UseFormReset<{
      points: string
      name: string
    }>
  ) => void
}

const ChampionshipBonificationSelectionScreen: FunctionComponent<
  ChampionshipBonificationSelectionScreenProps
> = ({ bonifications, handleAddPress, renderItem }) => {
  const { control, formState, reset, handleSubmit } =
    useForm<{ points: string; name: string }>()

  const methods = useForm()

  const pointsInputRef = useRef<any>()

  console.log(methods.getValues())

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Bonificações</Header>
      <View style={styles.content}>
        <TextMedium style={{ marginBottom: 10, fontSize: 12 }}>
          Aqui você pode adicionar bonificações, como pontos extras por volta
          mais rápida.
        </TextMedium>
        <Controller
          rules={{ required: true }}
          control={control}
          name="name"
          shouldUnregister
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Nome"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              hasError={!!formState?.errors?.name}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => pointsInputRef.current.focus()}
            />
          )}
        />

        {formState?.errors.name && (
          <TextMedium
            style={{
              fontSize: 12,
              color: Colors.error,
              marginTop: 5
            }}>
            O nome é obrigatório.
          </TextMedium>
        )}

        <Controller
          rules={{ required: true }}
          control={control}
          name="points"
          shouldUnregister
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              style={{ marginTop: 15 }}
              placeholder="Pontos"
              onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ''))}
              onBlur={onBlur}
              value={value}
              hasError={!!formState?.errors?.points}
              keyboardType="numeric"
              blurOnSubmit={false}
              returnKeyType="done"
              ref={pointsInputRef}
              onSubmitEditing={handleSubmit((data) => {
                handleAddPress(data, reset)
              })}
            />
          )}
        />

        {formState?.errors.points && (
          <TextMedium
            style={{
              fontSize: 12,
              color: Colors.error,
              marginTop: 5
            }}>
            Os pontos são obrigatórios.
          </TextMedium>
        )}

        <CustomButton
          variant="outlined"
          style={{ marginTop: 20 }}
          onPress={handleSubmit((data) => {
            handleAddPress(data, reset)
          })}>
          Adicionar
        </CustomButton>

        <FormProvider {...methods}>
          <KeyboardAwareFlatList
            enableOnAndroid={true}
            data={bonifications}
            renderItem={renderItem}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={Platform.OS === 'ios'}
            contentContainerStyle={{ paddingTop: 20 }}
          />

          <View style={{ marginTop: 20 }}>
            <CustomButton
              variant="primary"
              disabled={bonifications.length === 0}
              onPress={methods.handleSubmit(() => {})}>
              Avançar
            </CustomButton>
          </View>
        </FormProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    padding: 20
  }
})

export default ChampionshipBonificationSelectionScreen
