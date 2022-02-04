import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Image, Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Components
import TextBold from '~components/common/text-bold/text-bold.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { useAppSelector } from '~store'
import TextMedium from '~components/common/text-medium/text-medium.component'

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
  }
})

interface ChampionshipsHeaderProps {}

const ChampionshipsHeader: FunctionComponent<ChampionshipsHeaderProps> = () => {
  const insets = useSafeAreaInsets()

  const { currentUser } = useAppSelector((state) => state.user)

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'android' ? insets.top : insets.top + 25,
        ...styles.container
      }}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: currentUser?.profileImageUrl! }}
              style={styles.image}
            />
          </View>
          <TextBold style={{ fontSize: 16 }}>Seus Campeonatos</TextBold>
        </View>

        <View style={styles.right}>
          <Ionicons name="add-sharp" size={32} color={Colors.textSecondary} />
        </View>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.button}>
          <TextMedium style={{ fontSize: 10, color: Colors.primary }}>
            Criados por você
          </TextMedium>
        </Pressable>

        <Pressable style={{ ...styles.button, marginLeft: 16 }}>
          <TextMedium
            style={{
              fontSize: 10,
              color: Colors.primary
            }}>
            Finalizados
          </TextMedium>
        </Pressable>
      </View>
    </View>
  )
}

export default ChampionshipsHeader
