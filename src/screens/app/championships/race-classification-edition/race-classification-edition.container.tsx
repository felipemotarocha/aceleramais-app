import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'

// Screens
import RaceClassificationEditionScreen from './race-classification-edition.screen'

// Redux
import { useAppDispatch } from '~store'
import { getRaceClassification } from '~store/race-classification/race-classification.actions'
import { clear } from '~store/race-classification/race-classification.slice'

// Utilities
import { RaceClassificationEditionScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'

interface RaceClassificationEditionContainerProps {}

const RaceClassificationEditionContainer: FunctionComponent<
  RaceClassificationEditionContainerProps
> = () => {
  const {
    params: { race }
  } = useRoute<RaceClassificationEditionScreenRouteProp>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRaceClassification(race))

    return () => {
      dispatch(clear())
    }
  }, [race, dispatch])

  return <RaceClassificationEditionScreen />
}

export default RaceClassificationEditionContainer
