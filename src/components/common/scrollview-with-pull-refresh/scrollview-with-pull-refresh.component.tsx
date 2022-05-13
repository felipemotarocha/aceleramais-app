import * as React from 'react'
import { useRef } from 'react'
import { ScrollView, ScrollViewProps, RefreshControl } from 'react-native'
import { differenceInSeconds } from 'date-fns'

// Utilities
import Colors from '~constants/colors.constants'
import { showError } from '~helpers/flash-message.helpers'

export interface ScrollViewWithPullRefreshProps extends ScrollViewProps {
  refetch: () => void
  refreshing: boolean
  refetchInterval?: number
}

const ScrollViewWithPullRefresh: React.FC<ScrollViewWithPullRefreshProps> = (
  props
) => {
  const { refetch, refreshing, refetchInterval = 5 } = props

  const lastRefresh = useRef<Date | null>()

  const handleRefresh = async () => {
    if (!lastRefresh.current) {
      lastRefresh.current = new Date()
      return await refetch()
    }

    const secondsSinceLastRefresh = differenceInSeconds(
      new Date(),
      lastRefresh.current
    )

    if (secondsSinceLastRefresh > refetchInterval) {
      lastRefresh.current = new Date()
      return await refetch()
    }

    return showError(
      `Por favor, aguarde ${
        refetchInterval - secondsSinceLastRefresh
      } segundos para atualizar novamente.`
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={Colors.primary}
          colors={[`${Colors.primary}`]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      {...props}
    />
  )
}

export default ScrollViewWithPullRefresh
