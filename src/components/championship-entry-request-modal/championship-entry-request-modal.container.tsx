import React, { FunctionComponent, useEffect, useState } from 'react'
import { batch } from 'react-redux'

// Components
import ChampionshipEntryRequestModal from './championship-entry-request-modal.component'
import Loading from '~components/common/loading/loading.component'

// Utilities
import Team from '~types/team.types'
import api from '~api/axios.api'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { _Team } from '~store/championship-creation/championship-creation.slice'
import {
  getChampionshipDetails,
  requestChampionshipEntry
} from '~store/championship-details/championship-details-actions'

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

  const { loading } = useAppSelector((state) => state.championshipCreation)

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
    try {
      setIsVisible(false)

      batch(async () => {
        await dispatch(
          requestChampionshipEntry({
            championship: championshipDetails!.id,
            driver: currentUser!.id,
            team: data.team?.id
          })
        )
        await dispatch(getChampionshipDetails(championshipDetails!.id))
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <ChampionshipEntryRequestModal
        {...rest}
        teams={populatedTeams}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  )
}

export default ChampionshipEntryRequestModalContainer
