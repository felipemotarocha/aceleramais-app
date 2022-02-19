import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})

const Loading: FunctionComponent = () => {
  return (
    <Modal visible transparent>
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </Modal>
  )
}

export default Loading
