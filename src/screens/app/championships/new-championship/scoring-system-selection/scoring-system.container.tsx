import React, { FunctionComponent, useCallback } from 'react'

// Components
import ChampionshipScoringSystemSelectionScreen from './scoring-system-selection.screen'

// Redux
import { useAppSelector } from '~store'
import { _ScoringSystem } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipScoringSystemSelectionContainerProps {}

const ChampionshipScoringSystemSelectionContainer: FunctionComponent<
  ChampionshipScoringSystemSelectionContainerProps
> = () => {
  const { scoringSystem } = useAppSelector(
    (state) => state.championshipCreation
  )

  const renderItem = useCallback(
    ({ item }: { item: _ScoringSystem }) => <></>,
    []
  )

  return (
    <ChampionshipScoringSystemSelectionScreen
      scoringSystem={scoringSystem}
      renderItem={renderItem}
    />
  )
}

export default ChampionshipScoringSystemSelectionContainer
