import React, { FunctionComponent, useCallback, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

// Screens
import SignUpScreen, { SignUpFormData } from './sign-up.screen'

// Utilities
import { FirebaseError } from '~types/firebase.types'
import { API_URL } from '~constants/config.constants'
import { emailIsAlreadyInUse } from '~helpers/auth.helpers'

// Redux
import { createUser } from '~store/user/user.actions'

const SignUpContainer: FunctionComponent = () => {
  const [profileImage, setProfileImage] = useState<
    | {
        uri: string
        type: string
      }
    | undefined
  >(undefined)

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

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      )

      await dispatch(
        createUser({
          ...data,
          id: user.uid,
          provider: user.providerId,
          profileImage: profileImage
        })
      )
    } catch ({ code }) {
      if (code === FirebaseError.emailAlreadyInUse) {
        return emailIsAlreadyInUse()
      }
    }
  }

  const checkIfUsernameAlreadyExists = async (userName: string) => {
    try {
      await axios.get(`${API_URL}/api/user?userName=${userName}`)

      return false
    } catch (_) {
      return true
    }
  }

  return (
    <SignUpScreen
      profileImageUri={profileImage?.uri}
      handleSubmit={handleSubmit}
      checkIfUsernameAlreadyExists={checkIfUsernameAlreadyExists}
      handlePickImagePress={handlePickImagePress}
    />
  )
}

export default SignUpContainer
