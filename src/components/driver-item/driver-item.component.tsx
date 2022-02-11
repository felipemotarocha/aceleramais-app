import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image } from 'react-native'

interface DriverItemProps {
  profileImageUrl?: string
}

const DriverItem: FunctionComponent<DriverItemProps> = ({
  profileImageUrl,
  children
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ flex: 1, borderRadius: 45 }}
          source={{
            uri:
              profileImageUrl ||
              'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
          }}
        />
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
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
    marginRight: 10
  }
})

export default DriverItem
