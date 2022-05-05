import { isEmpty } from 'lodash'
import React, { FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'

// Components
import CustomBottomModal from '~components/common/custom-bottom-modal/custom-bottom-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import ChampionshipTeamsModal from '~components/championship-teams-modal/championship-teams-modal.component'

// Utilities
import Team from '~types/team.types'
import { _Team } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipEntryRequestModalProps {
  isVisible: boolean
  teams: Team[]
  handleSubmit: (data: { team?: _Team }) => void
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChampionshipEntryRequestModal: FunctionComponent<
  ChampionshipEntryRequestModalProps
> = ({ isVisible, teams, setIsVisible, handleSubmit }) => {
  const {
    control,
    setValue,
    handleSubmit: _handleSubmit
  } = useForm<{ team?: _Team }>()

  const [teamsModalIsVisible, setTeamsModalIsVisible] = useState(false)

  const handleTeamChange = (team: _Team | null) => {
    setValue('team', team as any)
  }

  const header = isEmpty(teams)
    ? 'Deseja mesmo solicitar a entrada neste campeonato?'
    : 'Selecione o time com o qual você quer entrar (opcional)'

  return (
    <>
      <CustomBottomModal
        header={header}
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <View style={{ width: '100%' }}>
          {!isEmpty(teams) && (
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
                    style={{ marginBottom: 15 }}
                  />
                )}
              />
            </Pressable>
          )}

          <CustomButton
            variant="primary"
            onPress={() => _handleSubmit(handleSubmit)()}>
            Confirmar
          </CustomButton>
          <CustomButton
            variant="outlined"
            style={{ marginTop: 10 }}
            onPress={() => setIsVisible(false)}>
            Cancelar
          </CustomButton>
        </View>

        <ChampionshipTeamsModal
          isVisible={teamsModalIsVisible}
          setIsVisible={setTeamsModalIsVisible}
          teams={teams}
          handleTeamChange={handleTeamChange}
        />
      </CustomBottomModal>
    </>
  )
}

export default ChampionshipEntryRequestModal
