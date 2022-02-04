import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, StyleSheet, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Components
import DismissKeyboard from '~components/common/dismiss-keyboard/dismiss-keyboard.component'
import Header from '~components/common/header/header.component'
import ImagePicker from '~components/common/image-picker/image-picker.component'
import TextBold from '~components/common/text-bold/text-bold.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'

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

interface ChampionshipBasicInfoScreenProps {
  imageUri?: string
  handlePickImagePress: () => Promise<void>
  handleSubmit: (data: BasicInfoForm) => void
}

type BasicInfoForm = {
  title: string
  platform: string
  description: string
}

const ChampionshipBasicInfoScreen: FunctionComponent<
  ChampionshipBasicInfoScreenProps
> = ({ imageUri, handlePickImagePress, handleSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit
  } = useForm<BasicInfoForm>()

  const titleInputRef = useRef<any>(null)
  const platformInputRef = useRef<any>(null)
  const descriptionInputRef = useRef<any>(null)

  const handleOnSubmitEditting = useCallback(
    (
      input:
        | 'titleInputRef'
        | 'platformInputRef'
        | 'descriptionInputRef'
        | 'emailInputRef'
        | 'passwordInputRef'
    ) => {
      return {
        titleInputRef: () => platformInputRef?.current?.focus(),
        platformInputRef: () => descriptionInputRef?.current?.focus()
      }[input]
    },

    [titleInputRef, platformInputRef, descriptionInputRef]
  )

  return (
    <View style={styles.container}>
      <Header showBack>Novo Campeonato</Header>

      <KeyboardAwareScrollView
        enableAutomaticScroll={Platform.OS === 'ios'}
        enableOnAndroid
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <DismissKeyboard>
          <View style={styles.content}>
            <ImagePicker
              imageUri={imageUri}
              handlePickImagePress={handlePickImagePress}
            />

            <TextBold style={{ fontSize: 16, textAlign: 'center' }}>
              Dados do Campeonato
            </TextBold>

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={{ marginTop: 15 }}
                  placeholder="Título"
                  accessibilityLabel="Título"
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.title}
                  blurOnSubmit={false}
                  onSubmitEditing={handleOnSubmitEditting('titleInputRef')}
                  ref={titleInputRef}
                />
              )}
              name="title"
            />

            {errors.title && (
              <TextMedium
                style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
                O título é obrigatório.
              </TextMedium>
            )}

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={{ marginTop: 15 }}
                  placeholder="Plataforma"
                  accessibilityLabel="Plataforma"
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.platform}
                  blurOnSubmit={false}
                  onSubmitEditing={handleOnSubmitEditting('platformInputRef')}
                  ref={platformInputRef}
                  autoCorrect={false}
                />
              )}
              name="platform"
            />

            {errors.platform && (
              <TextMedium
                style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
                A plataforma é obrigatória.
              </TextMedium>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  style={{
                    marginTop: 15,
                    height: 120,
                    maxHeight: 120,
                    textAlignVertical: 'top'
                  }}
                  placeholder="Descrição"
                  accessibilityLabel="Descrição"
                  returnKeyType="default"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  hasError={!!errors.description}
                  blurOnSubmit={false}
                  onSubmitEditing={handleOnSubmitEditting(
                    'descriptionInputRef'
                  )}
                  ref={descriptionInputRef}
                  multiline
                />
              )}
              name="description"
            />

            <CustomButton
              variant="primary"
              style={{ marginTop: 15 }}
              onPress={_handleSubmit(handleSubmit)}>
              Avançar
            </CustomButton>
          </View>
        </DismissKeyboard>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ChampionshipBasicInfoScreen
