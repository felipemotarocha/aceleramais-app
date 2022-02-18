import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'

// Redux
import { _Team } from '~store/championship-creation/championship-creation.slice'

// Utilities
import Colors from '~constants/colors.constants'

interface ChampionshipTeamItemProps {
  team: _Team
  handleRemovePress: (id: string) => void
}

const ChampionshipTeamItem: FunctionComponent<ChampionshipTeamItemProps> = ({
  team: { id, name, color },
  handleRemovePress
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.circle, { borderColor: color }]}></View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.colorLine, { borderColor: color }]}></View>
          <TextMedium style={{ fontSize: 12 }}>{name}</TextMedium>
        </View>
      </View>

      <Pressable
        style={{ justifyContent: 'center' }}
        onPress={() => handleRemovePress(id)}
        accessibilityLabel={`Remove ${name}`}>
        <AntDesign name="close" size={24} color={Colors.textSecondary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 3
  },
  colorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 8,
    height: 15
  }
})

export default ChampionshipTeamItem
