import React, { FunctionComponent, useEffect, useState } from 'react'

// Components
import ChampionshipEntryRequestModal from './championship-entry-request-modal.component'

// Utilities
import Team from '~types/team.types'
import api from '~api/axios.api'
import ChampionshipEditionHelpers from '~screens/app/championships/championship-edition/championship-edition.helpers'
import ChampionshipHelpers from '~helpers/championship.helpers'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { editChampionship } from '~store/championship-creation/championship-creation.actions'
import { _Team } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipEntryRequestModalContainerProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChampionshipEntryRequestModalContainer: FunctionComponent<
  ChampionshipEntryRequestModalContainerProps
> = ({ isVisible, setIsVisible, ...rest }) => {
  const [populatedTeams, setPopulatedTeams] = useState<Team[]>([])

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const fetchTeams = async () => {
    const { data } = await api.get(
      `/api/team?championship=${championshipDetails!.id}`
    )

    setPopulatedTeams(data)
  }

  useEffect(() => {
    fetchTeams()

    return () => {
      setPopulatedTeams([])
    }
  }, [isVisible])

  const handleSubmit = async (data: { team?: _Team }) => {
    console.log({ data })
    try {
      const { data: _data } = await api.get(
        `/api/championship/${championshipDetails!.id}?full_populate=true`
      )

      const reducerData = ChampionshipEditionHelpers.generateReducerData({
        ..._data,
        pendentDrivers: [
          ..._data.pendentDrivers.map((item) => ({
            user: item.user.id,
            team: item?.team?.id
          })),
          { user: currentUser!.id, team: data?.team?.id }
        ]
      })

      const _payload = ChampionshipHelpers.generateUpsertPayload({
        ...reducerData,
        admins: [{ user: currentUser!.id, isCreator: true }]
      })

      await dispatch(editChampionship(championshipDetails!.id, _payload))

      setIsVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ChampionshipEntryRequestModal
      {...rest}
      teams={populatedTeams}
      handleSubmit={handleSubmit}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  )
}

export default ChampionshipEntryRequestModalContainer
