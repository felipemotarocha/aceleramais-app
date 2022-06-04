import React, { FunctionComponent, useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'

// Screens
import SocialSignUp from './social-sign-up.screen'

// Components
import Loading from '~components/common/loading/loading.component'

// Utilities
import { SocialSignUpScreenRouteProp } from '~navigators/auth/auth-stack.navigator.types'
import { createUser, loginUser } from '~store/user/user.actions'
import { useAppSelector } from '~store'

interface SocialSignUpContainerProps {}

const SocialSignUpContainer: FunctionComponent<
  SocialSignUpContainerProps
> = () => {
  const { loading } = useAppSelector((state) => state.user)

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
    async (data: { userName: string; lastName?: string }) => {
      const basePayload = {
        id,
        firstName,
        lastName: (isEmpty(lastName) ? data?.lastName : lastName)!,
        email,
        provider,
        userName: data.userName
      }

      if (profileImage) {
        await dispatch(createUser({ ...basePayload, authToken, profileImage }))

        return await dispatch(loginUser(id, authToken))
      }

      await dispatch(createUser({ ...basePayload, authToken, profileImageUrl }))

      return await dispatch(loginUser(id, authToken))
    },
    [id, firstName, lastName, email, provider, profileImageUrl, dispatch]
  )

  return (
    <>
      {loading && <Loading />}

      <SocialSignUp
        handlePickImagePress={handlePickImagePress}
        profileImageUri={profileImage?.uri}
        handleContinuePress={handleContinuePress}
      />
    </>
  )
}

export default SocialSignUpContainer
