import React, { FunctionComponent, useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/native'

// Screens
import SocialSignUp from './social-sign-up.screen'

// Utilities
import { SocialSignUpScreenRouteProp } from '~navigators/auth/auth-stack.navigator.types'
import { createUser, loginUser } from '~store/user/user.actions'

interface SocialSignUpContainerProps {}

const SocialSignUpContainer: FunctionComponent<
  SocialSignUpContainerProps
> = () => {
  const [profileImage, setProfileImage] = useState<
    | {
        uri: string
        type: string
      }
    | undefined
  >(undefined)

  const {
    params: {
      id,
      firstName,
      lastName,
      email,
      provider,
      profileImageUrl,
      authToken
    }
  } = useRoute<SocialSignUpScreenRouteProp>()

  const dispatch = useDispatch()

  const handlePickImagePress = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri, type: result.type! })
    }
  }, [])

  const handleContinuePress = useCallback(
    async (data: { userName: string }) => {
      const basePayload = {
        id,
        firstName,
        lastName,
        email,
        provider,
        userName: data.userName
      }

      if (profileImage) {
        await dispatch(createUser({ ...basePayload, profileImage }))

        return await dispatch(loginUser(id, authToken))
      }

      await dispatch(createUser({ ...basePayload, profileImageUrl }))

      return await dispatch(loginUser(id, authToken))
    },
    [id, firstName, lastName, email, provider, profileImageUrl, dispatch]
  )

  return (
    <SocialSignUp
      handlePickImagePress={handlePickImagePress}
      profileImageUri={profileImage?.uri}
      handleContinuePress={handleContinuePress}
    />
  )
}

export default SocialSignUpContainer
