import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

// Screens
import ChampionshipBasicInfoScreen, { BasicInfoForm } from './basic-info.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  clear,
  updateBasicInfo
} from '~store/championship-creation/championship-creation.slice'

// Utilities
import { ChampionshipBasicInfoScreenNavigationProp } from '~navigators/app/championships/new-championship/new-championship.types'

interface ChampionshipsBasicInfoContainerProps {}

const ChampionshipsBasicInfoContainer: FunctionComponent<
  ChampionshipsBasicInfoContainerProps
> = () => {
  const { basicInfo, isEdit } = useAppSelector(
    (state) => state.championshipCreation
  )

  const [image, setImage] = useState<
    | {
        uri: string
        type?: string
      }
    | undefined
  >(basicInfo?.image || undefined)

  const dispatch = useAppDispatch()
  const navigation = useNavigation<ChampionshipBasicInfoScreenNavigationProp>()

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
        await dispatch(updateBasicInfo({ ...data, image }))

        return navigation.navigate('Championship Tracks')
      }

      await dispatch(updateBasicInfo(data))

      return navigation.navigate('Championship Tracks')
    },
    [dispatch, image, navigation]
  )

  const headerTitle = isEdit ? 'Editar Campeonato' : 'Novo Campeonato'

  useEffect(() => {
    return () => dispatch(clear()) as any
  }, [])

  return (
    <ChampionshipBasicInfoScreen
      headerTitle={headerTitle}
      imageUri={image?.uri}
      defaultValues={basicInfo as any}
      handlePickImagePress={handlePickImagePress}
      handleSubmit={handleSubmit}
    />
  )
}

export default ChampionshipsBasicInfoContainer
