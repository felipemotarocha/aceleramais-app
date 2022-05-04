import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'

// Components
import ChampionshipEntryRequestModal from './championship-entry-request-modal.component'

// Utilities
import Team from '~types/team.types'
import api from '~api/axios.api'

// Redux
import { useAppSelector } from '~store'
// import { editChampionship } from '~store/championship-creation/championship-creation.actions'

interface ChampionshipEntryRequestModalContainerProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChampionshipEntryRequestModalContainer: FunctionComponent<
  ChampionshipEntryRequestModalContainerProps
> = ({ isVisible, ...rest }) => {
  const [populatedTeams, setPopulatedTeams] = useState<Team[]>([])

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  // const dispatch = useAppDispatch()

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

  const handleSubmit = useCallback(() => {}, [])

  return (
    <ChampionshipEntryRequestModal
      {...rest}
      teams={populatedTeams}
      handleSubmit={handleSubmit}
      isVisible={isVisible}
    />
  )
}

export default ChampionshipEntryRequestModalContainer
