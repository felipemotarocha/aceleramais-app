import React, { FunctionComponent, useCallback } from 'react'
import { View, StyleSheet, Image, Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import TextMedium from '~components/common/text-medium/text-medium.component'
import { ChampionshipListScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'
import { updateFilterBy } from '~store/championships/championships.slice'

interface ChampionshipsHeaderProps {}

const ChampionshipsHeader: FunctionComponent<ChampionshipsHeaderProps> = () => {
  const insets = useSafeAreaInsets()

  const { currentUser } = useAppSelector((state) => state.user)
  const { filterBy } = useAppSelector((state) => state.championships)

  const dispatch = useAppDispatch()

  const navigation = useNavigation<ChampionshipListScreenNavigationProp>()

  const handlePlusPress = useCallback(
    () => navigation.navigate('New Championship'),
    [navigation]
  )

  const handleCreatedByYouPress = useCallback(() => {
    if (filterBy === 'admin') {
      return dispatch(updateFilterBy(undefined))
    }

    dispatch(updateFilterBy('admin'))
  }, [filterBy, dispatch])

  const handleCompletedPress = useCallback(() => {
    if (filterBy === 'completed') {
      return dispatch(updateFilterBy(undefined))
    }

    dispatch(updateFilterBy('completed'))
  }, [filterBy, dispatch])

  return (
    <View
      style={{
        paddingTop:
          Platform.OS === 'android' ? insets.top + 10 : insets.top + 25,
        ...styles.container
      }}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `${
                  currentUser?.profileImageUrl
                }?${new Date().toISOString()}`,
                cache: 'reload',
                headers: { 'Cache-Control': 'no-cache' }
              }}
              style={styles.image}
            />
          </View>
          <TextBold style={{ fontSize: 16 }}>Seus Campeonatos</TextBold>
        </View>

        <Pressable style={styles.right} onPress={handlePlusPress}>
          <Ionicons name="add-sharp" size={32} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <Pressable
          accessibilityLabel="Criados por você"
          style={[styles.button, filterBy === 'admin' && styles.pressedButton]}
          onPress={handleCreatedByYouPress}>
          <TextMedium
            style={{
              fontSize: 10,
              color: filterBy === 'admin' ? Colors.text : Colors.primary
            }}>
            Criados por você
          </TextMedium>
        </Pressable>

        <Pressable
          accessibilityLabel="Finalizados"
          style={[
            { ...styles.button, marginLeft: 16 },
            filterBy === 'completed' && styles.pressedButton
          ]}
          onPress={handleCompletedPress}>
          <TextMedium
            style={{
              fontSize: 10,
              color: filterBy === 'completed' ? Colors.text : Colors.primary
            }}>
            Finalizados
          </TextMedium>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.backgroundSecondary
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 55
  },
  imageContainer: {
    elevation: 3,
    width: 55,
    height: 55,
    borderRadius: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 12
  },
  right: {
    justifyContent: 'center'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    color: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15
  },
  pressedButton: {
    backgroundColor: Colors.primary
  }
})

export default ChampionshipsHeader
