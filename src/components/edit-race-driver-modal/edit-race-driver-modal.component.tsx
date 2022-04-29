import RNPickerSelect from 'react-native-picker-select'
import React, { FunctionComponent, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

// Components
import CustomBottomModal from '~components/common/custom-bottom-modal/custom-bottom-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverItem from '~components/driver-item/driver-item.component'

// Utilities
import { RaceClassificationItem } from '~types/race.types'
import Colors from '~constants/colors.constants'

interface EditRaceDriverModalProps {
  driver: RaceClassificationItem | null
  availableDrivers: RaceClassificationItem[]
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setAvailableDrivers: (
    value: React.SetStateAction<RaceClassificationItem[]>
  ) => void
}

const EditRaceDriverModal: FunctionComponent<EditRaceDriverModalProps> = ({
  driver,
  availableDrivers,
  isVisible,
  setAvailableDrivers,
  setIsVisible
}) => {
  const {
    control,

    formState: { errors },
    handleSubmit: _handleSubmit
  } = useForm<{ scores: boolean }>({
    defaultValues: { scores: driver?.scores }
  })

  const handleSubmit = useCallback(
    (data) => {
      setIsVisible(false)

      const newRaceClassification = availableDrivers.map((item) => {
        if (item.isRegistered && item.user!.id === driver?.user?.id) {
          return { ...item, scores: data.scores }
        }

        if (!item.isRegistered && item.id === driver?.id) {
          return { ...item, scores: data.scores }
        }

        return item
      })

      setAvailableDrivers(newRaceClassification)
    },
    [availableDrivers]
  )

  return (
    <CustomBottomModal
      header="Editar Piloto"
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <DriverItem profileImageUrl={driver?.user?.profileImageUrl}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              {driver?.team && (
                <View
                  style={[
                    styles.teamColorLine,
                    { borderColor: driver.team.color }
                  ]}></View>
              )}
              <TextMedium numberOfLines={1}>
                {driver?.firstName || driver?.user?.firstName}{' '}
                <TextSemiBold>
                  {(driver?.lastName || driver?.user?.lastName)?.toUpperCase()}
                </TextSemiBold>
              </TextMedium>
            </View>
            {driver?.user?.userName && (
              <View style={{ marginTop: 2 }}>
                <TextRegular style={{ fontSize: 10 }} numberOfLines={1}>
                  @{driver?.user?.userName}
                </TextRegular>
              </View>
            )}
          </View>
        </View>
      </DriverItem>

      <View style={{ width: '100%', marginTop: 15 }}>
        <TextSemiBold style={{ fontSize: 12 }}>
          Pontua nos campeonatos?
        </TextSemiBold>

        <View
          style={{
            marginTop: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.input.background,
            overflow: 'hidden',
            backgroundColor: Colors.input.background,
            paddingHorizontal: 15,
            paddingVertical: 10
          }}>
          <Controller
            control={control}
            name="scores"
            rules={{
              validate: (value) => value !== undefined && value !== null
            }}
            shouldUnregister
            render={({ field: { value, onChange } }) => {
              return (
                // TODO: create a component
                <RNPickerSelect
                  value={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  placeholder={{ label: 'Selecione uma opção...', value: null }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    placeholder: {
                      color: Colors.input.placeholder,
                      fontFamily: 'Poppins_500Medium'
                    },
                    inputAndroid: {
                      color: Colors.text,
                      fontFamily: 'Poppins_400Regular'
                    },
                    inputIOS: {
                      color: Colors.text,
                      fontFamily: 'Poppins_400Regular'
                    }
                  }}
                  items={[
                    { label: 'Sim', value: true },
                    { label: 'Não', value: false }
                  ]}></RNPickerSelect>
              )
            }}
          />
        </View>

        {errors.scores?.type === 'validate' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Essa opção é obrigatória.
          </TextMedium>
        )}

        <CustomButton
          variant="primary"
          style={{ marginTop: 15 }}
          onPress={() => _handleSubmit(handleSubmit)()}>
          Salvar
        </CustomButton>
        <CustomButton
          variant="outlined"
          style={{ marginTop: 10 }}
          onPress={() => setIsVisible(false)}>
          Cancelar
        </CustomButton>
      </View>
    </CustomBottomModal>
  )
}

const styles = StyleSheet.create({
  teamColorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  }
})

export default EditRaceDriverModal
