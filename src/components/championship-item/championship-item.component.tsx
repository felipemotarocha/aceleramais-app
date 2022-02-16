import { format } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Race from '~types/race.types'

interface ChampionshipItemProps {
  name: string
  platform: string
  nextRace: Race
  avatarImageUrl?: string
}

const ChampionshipItem: FunctionComponent<ChampionshipItemProps> = ({
  name,
  platform,
  nextRace,
  avatarImageUrl
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ flex: 1, borderRadius: 75 }}
          source={{
            uri:
              avatarImageUrl ||
              'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
          }}
        />
      </View>

      <View style={styles.right}>
        <TextSemiBold style={{ flex: 1 }} numberOfLines={2}>
          {name}
        </TextSemiBold>

        <TextRegular style={{ fontSize: 12, flex: 1 }}>
          <TextMedium style={{ fontSize: 12 }}>Plataforma: </TextMedium>{' '}
          {platform}
        </TextRegular>

        <TextRegular style={{ fontSize: 12, flex: 1 }}>
          <TextMedium style={{ fontSize: 12 }}>Próxima Corrida: </TextMedium>{' '}
          {format(new Date(nextRace.startDate), 'dd/MM/yyyy, HH:mm')}
        </TextRegular>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    elevation: 3,
    width: 75,
    height: 75,
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 10
  },
  right: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default ChampionshipItem
