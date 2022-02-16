import * as React from 'react'
import { useRef } from 'react'
import { FlatList, FlatListProps, RefreshControl } from 'react-native'
import { differenceInSeconds } from 'date-fns'

// Utilities
import { showError } from '~helpers/flash-message.helpers'
import Colors from '~constants/colors.constants'

export interface FlatListWithPullRefreshProps extends FlatListProps<any> {
  refetch: () => void
  refreshing: boolean
  refetchInterval?: number
}

const FlatListWithPullRefresh: React.FC<FlatListWithPullRefreshProps> = (
  props
) => {
  const { refetch, refreshing, refetchInterval = 30 } = props

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
    <FlatList
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

export default FlatListWithPullRefresh
