import React, { FunctionComponent, useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import ChampionshipBasicInfoScreen from './basic-info.screen'

interface ChampionshipsBasicInfoContainerProps {}

const ChampionshipsBasicInfoContainer: FunctionComponent<
  ChampionshipsBasicInfoContainerProps
> = () => {
  const [image, setImage] = useState<
    | {
        uri: string
        type: string
      }
    | undefined
  >(undefined)

  const handlePickImagePress = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage({ uri: result.uri, type: result.type! })
    }
  }, [])

  const handleSubmit = useCallback((data) => {
    console.log({ data })
  }, [])

  return (
    <ChampionshipBasicInfoScreen
      imageUri={image?.uri}
      handlePickImagePress={handlePickImagePress}
      handleSubmit={handleSubmit}
    />
  )
}

export default ChampionshipsBasicInfoContainer
