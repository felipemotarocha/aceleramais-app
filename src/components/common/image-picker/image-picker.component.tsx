import React, { FunctionComponent } from 'react'
import { View, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

// Styles
import { ImagePickerButton } from './image-picker.styles'

// Utilities
import Colors from '~constants/colors.constants'

interface ImagePickerProps {
  imageUri?: string
  handlePickImagePress: () => Promise<void>
}

const ImagePicker: FunctionComponent<ImagePickerProps> = ({
  imageUri,
  handlePickImagePress
}) => {
  return (
    <ImagePickerButton
      onPress={handlePickImagePress}
      showBackground={!imageUri}>
      {imageUri ? (
        <Image
          source={{
            uri: imageUri
          }}
          resizeMode="cover"
          style={{ borderRadius: 200, flex: 1 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Feather name="camera" size={72} color={Colors.input.placeholder} />
        </View>
      )}
    </ImagePickerButton>
  )
}

export default ImagePicker
