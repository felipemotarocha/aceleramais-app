import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import React, { FunctionComponent, useCallback } from 'react'
import { View, StyleSheet, Image, Pressable } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Race from '~types/race.types'
import { ChampionshipListScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface ChampionshipItemProps {
  id: string
  name: string
  platform: string
  code: string
  nextRace: Race
  avatarImageUrl?: string
  goToDetailsOnPress: boolean
}

const ChampionshipItem: FunctionComponent<ChampionshipItemProps> = ({
  id,
  name,
  code,
  platform,
  nextRace,
  avatarImageUrl,
  goToDetailsOnPress
}) => {
  const navigation = useNavigation<ChampionshipListScreenNavigationProp>()

  const handlePress = useCallback(
    () => navigation.navigate('Championship Details', { championship: id }),
    [navigation]
  )
  return (
    <Pressable
      style={styles.container}
      onPress={goToDetailsOnPress ? handlePress : () => {}}>
      <View style={styles.imageContainer}>
        <Image
          style={{ flex: 1, borderRadius: 75 }}
          source={{
            uri:
              avatarImageUrl ||
              `https://${AWS_CLOUDFRONT_URL}/user-avatars/default.png`
          }}
        />
      </View>

      <View style={styles.right}>
        <TextSemiBold style={{ flex: 1 }} numberOfLines={2}>
          {name}
        </TextSemiBold>

        <TextRegular style={{ fontSize: 12, flex: 1 }}>
          <TextMedium style={{ fontSize: 12 }}>Código:</TextMedium> #{code}
        </TextRegular>

        <TextRegular style={{ fontSize: 12, flex: 1 }} numberOfLines={2}>
          <TextMedium style={{ fontSize: 12 }}>Plataforma:</TextMedium>{' '}
          {platform}
        </TextRegular>

        {nextRace ? (
          <TextRegular style={{ fontSize: 12, flex: 1 }}>
            <TextMedium style={{ fontSize: 12 }}>Próxima Corrida:</TextMedium>{' '}
            {format(new Date(nextRace.startDate), 'dd/MM/yyyy, HH:mm')}
          </TextRegular>
        ) : (
          <TextRegular style={{ fontSize: 12, flex: 1 }}>
            Todas as corridas foram concluídas.
          </TextRegular>
        )}
      </View>
    </Pressable>
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
