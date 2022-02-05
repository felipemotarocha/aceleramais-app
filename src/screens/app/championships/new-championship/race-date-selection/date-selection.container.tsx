import 'react-native-get-random-values'
import { isEmpty } from 'lodash'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { View } from 'react-native'

// Components
import ChampionshipRaceDateSelection from './date-selection.screen'
import ChampionshipRaceDateItem from '~components/championship-race-date-item/championship-race-date-item.component'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { updateRaces } from '~store/championship-creation/championship-creation.slice'

// Utilities
import Track from '~types/track.types'

interface ChampionshipRaceDateSelectionContainerProps {}

const ChampionshipRaceDateSelectionContainer: FunctionComponent<
  ChampionshipRaceDateSelectionContainerProps
> = () => {
  const { races, tracks } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  // @ts-ignore
  useEffect(() => {
    if (isEmpty(races)) {
      const newRaces = tracks
        .filter((track) => track.isSelected)
        .map((track) => ({
          id: uuidv4(),
          startDate: undefined,
          isCompleted: false,
          track
        }))

      dispatch(updateRaces(newRaces))
    }

    return () => dispatch(updateRaces([]))
  }, [])

  const renderItem = useCallback(
    ({
      item: { startDate, track, isCompleted }
    }: {
      item: {
        startDate?: string | undefined
        track: Track
        isCompleted: boolean
      }
    }) => {
      return (
        <View style={{ marginVertical: 5 }}>
          <ChampionshipRaceDateItem race={{ startDate, track, isCompleted }} />
        </View>
      )
    },
    []
  )

  return <ChampionshipRaceDateSelection races={races} renderItem={renderItem} />
}

export default ChampionshipRaceDateSelectionContainer
