import React, { FunctionComponent, useMemo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { View, StyleSheet, ListRenderItem, Platform } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

// Components
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { _ScoringSystem } from '~store/championship-creation/championship-creation.slice'

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

interface ChampionshipScoringSystemSelectionScreenProps {
  scoringSystem: _ScoringSystem[]
  handleAddPress: (data: { points: string }, resetForm: any) => void
  renderItem: ListRenderItem<_ScoringSystem> | null | undefined
  handleSubmit: (data: { [position: string]: string }) => void
}

const ChampionshipScoringSystemSelectionScreen: FunctionComponent<
  ChampionshipScoringSystemSelectionScreenProps
> = ({ scoringSystem, handleAddPress, renderItem, handleSubmit }) => {
  const {
    control,
    formState,
    reset,
    handleSubmit: _handleAddPress
  } = useForm<{ points: string }>()

  const defaultValues = useMemo(() => {
    let _defaultValues: { [key: string]: string } = {}

    for (const item of scoringSystem) {
      _defaultValues = {
        ..._defaultValues,
        [item.position]: item.points.toString()
      }
    }

    return _defaultValues
  }, [scoringSystem])

  const methods = useForm({ defaultValues })

  return (
    <View style={styles.container}>
      <Header showBack>Sistema de Pontuação</Header>
      <View style={styles.content}>
        <TextMedium style={{ marginBottom: 10, fontSize: 12 }}>
          Coloque apenas as posições que pontuam.
        </TextMedium>
        <Controller
          rules={{ required: true }}
          control={control}
          name="points"
          shouldUnregister
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={`Pontos ${scoringSystem.length + 1}º Lugar`}
              onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ''))}
              onBlur={onBlur}
              value={value}
              hasError={!!formState?.errors?.points}
              keyboardType="numeric"
              onSubmitEditing={_handleAddPress((data) => {
                handleAddPress(data, reset)
              })}
              blurOnSubmit={false}
              returnKeyType="done"
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
          onPress={_handleAddPress((data) => {
            handleAddPress(data, reset)
          })}>
          Adicionar
        </CustomButton>

        <FormProvider {...methods}>
          <KeyboardAwareFlatList
            enableOnAndroid={true}
            data={scoringSystem}
            renderItem={renderItem}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.position}
            enableAutomaticScroll={Platform.OS === 'ios'}
            contentContainerStyle={{ paddingTop: 20 }}
          />

          <CustomButton
            variant="primary"
            disabled={scoringSystem.length === 0}
            onPress={methods.handleSubmit(handleSubmit)}>
            Avançar
          </CustomButton>
        </FormProvider>
      </View>
    </View>
  )
}

export default ChampionshipScoringSystemSelectionScreen
