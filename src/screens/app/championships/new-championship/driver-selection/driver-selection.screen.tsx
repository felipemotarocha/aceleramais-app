import React, { FunctionComponent, useState } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  ListRenderItem
} from 'react-native'
import CheckBox from 'expo-checkbox'
import { Controller, useFormContext } from 'react-hook-form'

// Components
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import ChampionshipTeamsModal from '~components/championship-teams-modal/championship-teams-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import UserHelpers from '~helpers/user.helpers'
import {
  _Driver,
  _Team
} from '~store/championship-creation/championship-creation.slice'
import { DriverSelectionForm } from './driver-selection.container'
import { isEmpty } from 'lodash'

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

interface ChampionshipDriverSelectionScreenProps {
  teams: _Team[]
  drivers: _Driver[]
  teamInputIsToBeShown: boolean
  handleTeamChange: (team: _Team | null) => void
  handleAddPress: (data: DriverSelectionForm) => void
  renderDriverItem: ListRenderItem<_Driver> | null | undefined
  handleSubmit: () => void
}

const ChampionshipDriverSelectionScreen: FunctionComponent<
  ChampionshipDriverSelectionScreenProps
> = ({
  teams,
  drivers,
  teamInputIsToBeShown,
  handleTeamChange,
  renderDriverItem,
  handleAddPress,
  handleSubmit
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit: _handleSubmit,
    watch
  } = useFormContext()

  const watchIsRegistered = watch('isRegistered')

  const [teamsModalIsVisible, setTeamsModalIsVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Pilotos</Header>

      <View style={styles.content}>
        {watchIsRegistered ? (
          <Controller
            name="userName"
            control={control}
            shouldUnregister
            rules={{
              required: true,
              validate: {
                alreadyExists: async (value) =>
                  value &&
                  value.length > 3 &&
                  !(await UserHelpers.checkIfUserNameAlreadyExists(value!)),
                alreadyAdded: (value) =>
                  value &&
                  drivers.every(
                    (driver) => driver.userName?.toLowerCase() !== value
                  )
              }
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Nome de usuário"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        ) : (
          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            shouldUnregister
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Nome e sobrenome"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        )}

        {errors.userName?.type === 'required' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Nome de usuário é obrigatório.
          </TextMedium>
        )}

        {errors.userName?.type === 'alreadyExists' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Por favor, insira um nome de usuário válido.
          </TextMedium>
        )}

        {errors.userName?.type === 'alreadyAdded' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            Este piloto já foi adicionado.
          </TextMedium>
        )}

        {errors.fullName?.type === 'required' && (
          <TextMedium
            style={{ fontSize: 12, color: Colors.error, marginTop: 5 }}>
            O nome e sobrenome são obrigatórios.
          </TextMedium>
        )}

        {teamInputIsToBeShown && (
          <Pressable onPress={() => setTeamsModalIsVisible(true)}>
            <Controller
              control={control}
              name="team"
              shouldUnregister
              render={({ field: { value } }) => (
                <CustomInput
                  pointerEvents="none"
                  placeholder="Time"
                  editable={false}
                  style={{ marginTop: 15 }}
                  value={value?.name}
                />
              )}
            />
          </Pressable>
        )}

        <Controller
          control={control}
          name="isRegistered"
          render={({ field: { onChange, value } }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15
              }}>
              <CheckBox
                disabled={false}
                value={value}
                onValueChange={onChange}
                color={Colors.primary}
                style={{ borderRadius: 50 }}
                accessibilityLabel="Piloto possui conta no Acelera+?"
              />
              <TextRegular style={{ fontSize: 12, marginLeft: 7 }}>
                Piloto possui conta no Acelera+
              </TextRegular>
            </View>
          )}
        />

        <CustomButton
          variant="outlined"
          style={{ marginTop: 15 }}
          onPress={_handleSubmit(handleAddPress as any)}>
          Adicionar
        </CustomButton>

        <TextRegular style={{ paddingTop: 15, fontSize: 12 }}>
          Toque e segure em um piloto para editá-lo.
        </TextRegular>

        <FlatList
          data={drivers}
          renderItem={renderDriverItem}
          style={{ marginTop: 15 }}
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        />

        {isEmpty(drivers) ? (
          <CustomButton variant="outlined" onPress={handleSubmit}>
            Pular
          </CustomButton>
        ) : (
          <CustomButton variant="primary" onPress={handleSubmit}>
            Avançar
          </CustomButton>
        )}
      </View>

      <ChampionshipTeamsModal
        teams={teams}
        isVisible={teamsModalIsVisible}
        setIsVisible={setTeamsModalIsVisible}
        handleTeamChange={handleTeamChange}
      />
    </View>
  )
}

export default ChampionshipDriverSelectionScreen
