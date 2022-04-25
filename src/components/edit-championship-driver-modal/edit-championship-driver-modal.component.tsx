import * as React from 'react'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, StyleSheet, Pressable } from 'react-native'
import ChampionshipTeamsModal from '~components/championship-teams-modal/championship-teams-modal.component'

// Components
import CustomBottomModal from '~components/common/custom-bottom-modal/custom-bottom-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverItem from '~components/driver-item/driver-item.component'
import { useAppSelector, useAppDispatch } from '~store'

// Redux
import {
  updateDrivers,
  _Driver,
  _Team
} from '~store/championship-creation/championship-creation.slice'

interface EditChampionshipDriverModalProps {
  driver: _Driver
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type EditDriverForm = {
  userName?: string
  fullName?: string
  team?: _Team
}

const EditChampionshipDriverModal: React.FunctionComponent<
  EditChampionshipDriverModalProps
> = ({ isVisible, driver, setIsVisible }) => {
  const {
    control,
    setValue,
    reset,
    handleSubmit: _handleSubmit
  } = useForm<EditDriverForm>({
    defaultValues: {
      team: driver?.team,
      fullName: `${driver?.firstName} ${driver?.lastName}`,
      userName: driver?.userName
    }
  })

  const [teamsModalIsVisible, setTeamsModalIsVisible] = useState(false)

  const { teams, drivers } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  const handleTeamChange = (team: _Team) => {
    setValue('team', team)
  }

  const handleDismiss = () => {
    reset()
  }

  const handleSubmit = useCallback(
    (data: EditDriverForm) => {
      const newDrivers = drivers.map((item) =>
        item.id === driver.id
          ? {
              ...item,
              team: data.team,
              firstName: data?.fullName?.split(' ')?.[0],
              lastName: data?.fullName?.split(' ')?.[1]
            }
          : item
      )

      dispatch(updateDrivers(newDrivers))
      setIsVisible(false)

      setValue('team', data?.team)
      setValue('fullName', data?.fullName)
    },
    [dispatch, reset, drivers]
  )

  const teamInputIsToBeShown = teams.length > 0

  return (
    <CustomBottomModal
      header="Editar Piloto"
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onDismiss={handleDismiss}>
      <DriverItem profileImageUrl={driver?.profileImageUrl}>
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
                {driver.firstName}{' '}
                <TextSemiBold>{driver.lastName?.toUpperCase()}</TextSemiBold>
              </TextMedium>
            </View>
            {driver.userName && (
              <View style={{ marginTop: 2 }}>
                <TextRegular style={{ fontSize: 10 }} numberOfLines={1}>
                  @{driver?.userName}
                </TextRegular>
              </View>
            )}
          </View>
        </View>
      </DriverItem>

      <View style={{ width: '100%' }}>
        {!driver?.userName && (
          <Controller
            name="fullName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomInput
                placeholder="Nome e sobrenome"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                style={{ marginTop: 20 }}
              />
            )}
          />
        )}

        {(driver?.team || teamInputIsToBeShown) && (
          <Pressable onPress={() => setTeamsModalIsVisible(true)}>
            <Controller
              control={control}
              name="team"
              render={({ field: { value } }) => (
                <CustomInput
                  pointerEvents="none"
                  placeholder="Time"
                  editable={false}
                  value={value?.name}
                  style={{ marginTop: 15 }}
                />
              )}
            />
          </Pressable>
        )}

        <CustomButton
          variant="primary"
          style={{ marginTop: 20 }}
          onPress={_handleSubmit(handleSubmit)}>
          Salvar
        </CustomButton>

        <CustomButton variant="outlined" style={{ marginTop: 15 }}>
          Cancelar
        </CustomButton>
      </View>

      <ChampionshipTeamsModal
        teams={teams}
        isVisible={teamsModalIsVisible}
        setIsVisible={setTeamsModalIsVisible}
        handleTeamChange={handleTeamChange}
      />
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

export default EditChampionshipDriverModal
