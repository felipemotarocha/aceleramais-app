import React, { FunctionComponent } from 'react'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form'
import { View, StyleSheet, ListRenderItem } from 'react-native'
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
  handleAddPress: (data: { points: string }) => void
  renderItem: ListRenderItem<_ScoringSystem> | null | undefined
}

const ChampionshipScoringSystemSelectionScreen: FunctionComponent<
  ChampionshipScoringSystemSelectionScreenProps
> = ({ scoringSystem, handleAddPress, renderItem }) => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useFormContext<{ points: string }>()

  const methods = useForm()

  return (
    <View style={styles.container}>
      <Header showBack>Sistema de Pontuação</Header>
      <View style={styles.content}>
        <Controller
          rules={{ required: true }}
          control={control}
          name="points"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder={`Pontos ${scoringSystem.length + 1}º Lugar`}
              onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ''))}
              onBlur={onBlur}
              value={value}
              hasError={!!errors?.points}
              keyboardType="numeric"
              onSubmitEditing={handleSubmit(handleAddPress)}
              blurOnSubmit={false}
            />
          )}
        />

        {errors.points && (
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
          style={{ marginVertical: 20 }}
          onPress={handleSubmit(handleAddPress)}>
          Adicionar
        </CustomButton>

        <FormProvider {...methods}>
          <KeyboardAwareFlatList
            data={scoringSystem}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.position}
          />
        </FormProvider>

        <View style={{ marginTop: 20 }}>
          <CustomButton variant="primary">Avançar</CustomButton>
        </View>
      </View>
    </View>
  )
}

export default ChampionshipScoringSystemSelectionScreen
