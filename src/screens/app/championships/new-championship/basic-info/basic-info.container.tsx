import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import * as ImagePicker from 'expo-image-picker'

// Screens
import ChampionshipBasicInfoScreen, { BasicInfoForm } from './basic-info.screen'

// Redux
import { useAppDispatch } from '~store'
import {
  clear,
  updateBasicInfo
} from '~store/championship-creation/championship-creation.slice'

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

  const dispatch = useAppDispatch()

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

  const handleSubmit = useCallback(
    async (data: BasicInfoForm) => {
      if (image) {
        return await dispatch(updateBasicInfo({ ...data, image }))
      }

      return await dispatch(updateBasicInfo(data))
    },
    [dispatch, image]
  )

  useEffect(() => {
    return () => dispatch(clear()) as any
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
