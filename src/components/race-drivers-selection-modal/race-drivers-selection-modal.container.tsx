import React, { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'
import { isEmpty } from 'lodash'

// Components
import RaceDriversSelectionModal from './race-drivers-selection-modal.component'

// Utilities
import Championship from '~types/championship.types'
import { RaceClassificationItem } from '~types/race.types'
import RaceDriversSelectionModalHelper from './race-drivers-selection-modal.helper'
import { API_URL } from '~constants/config.constants'

interface RaceDriversSelectionModalContainerProps {
  championship: string
  raceClassification: RaceClassificationItem[]
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModalContainer: FunctionComponent<
  RaceDriversSelectionModalContainerProps
> = ({ championship, raceClassification, isVisible, setIsVisible }) => {
  const [selectedDrivers, setSelectedDrivers] = useState<
    RaceClassificationItem[]
  >([])

  useEffect(() => {
    const generateInitialSelectedDrivers = async () => {
      const { data }: { data: Championship } = await axios.get(
        `${API_URL}/api/championship/${championship}`
      )

      const _selectedDrivers =
        RaceDriversSelectionModalHelper.generateInitialSelectedDrivers(
          data.drivers,
          raceClassification
        )

      setSelectedDrivers(_selectedDrivers)
    }

    if (isEmpty(selectedDrivers)) {
      generateInitialSelectedDrivers()
    }
  }, [selectedDrivers])

  return (
    <RaceDriversSelectionModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  )
}

export default RaceDriversSelectionModalContainer
