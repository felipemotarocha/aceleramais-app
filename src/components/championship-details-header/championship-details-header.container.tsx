import React, { FunctionComponent } from 'react'

import ChampionshipDetailsHeader from './championship-details-header.component'

interface ChampionshipDetailsHeaderContainerProps {
  name: string
  platform: string
  description?: string
  avatarImageUrl?: string
}

const ChampionshipDetailsHeaderContainer: FunctionComponent<
  ChampionshipDetailsHeaderContainerProps
> = (props) => {
  return <ChampionshipDetailsHeader {...props} />
}

export default ChampionshipDetailsHeaderContainer
