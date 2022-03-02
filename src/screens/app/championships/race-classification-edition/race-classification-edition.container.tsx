import { useRoute } from '@react-navigation/native'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'

// Screens
import RaceClassificationEditionScreen from './race-classification-edition.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
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

  const [driversSelectionModalIsVisible, setDriversSelectionModalIsVisible] =
    useState(false)

  const { raceClassification } = useAppSelector(
    (state) => state.raceClassificationReducer
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRaceClassification(race))

    return () => {
      dispatch(clear())
    }
  }, [race, dispatch])

  const handleEditDriversPress = useCallback(
    () => setDriversSelectionModalIsVisible((prevState) => !prevState),
    []
  )

  return (
    <RaceClassificationEditionScreen
      raceClassification={raceClassification}
      driversSelectionModalIsVisible={driversSelectionModalIsVisible}
      setDriversSelectionModalIsVisible={setDriversSelectionModalIsVisible}
      handleEditDriversPress={handleEditDriversPress}
    />
  )
}

export default RaceClassificationEditionContainer
