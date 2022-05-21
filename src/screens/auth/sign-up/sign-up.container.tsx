import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import {
  CommonActions,
  useNavigation,
  useRoute
} from '@react-navigation/native'

// Screens
import SignUpScreen, { SignUpFormData } from './sign-up.screen'

// Utilities
import { FirebaseError } from '~types/firebase.types'
import { API_URL } from '~constants/config.constants'
import { emailIsAlreadyInUse } from '~helpers/auth.helpers'

// Redux
import {
  createUser,
  editUser,
  loginUser,
  refreshCurrentUser
} from '~store/user/user.actions'
import { SignUpScreenRouteProp } from '~navigators/auth/auth-stack.navigator.types'
import { showSuccess } from '~helpers/flash-message.helpers'

const SignUpContainer: FunctionComponent = () => {
  const { params } = useRoute<SignUpScreenRouteProp>()
  const navigation = useNavigation()

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
      quality: 0.3
    })

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri, type: result.type! })
    }
  }, [])

  useEffect(() => {
    if (params?.defaultValues?.profileImageUrl) {
      setProfileImage({
        uri: params?.defaultValues?.profileImageUrl,
        type: 'image/jpeg'
      })
    }
  }, [])

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      if (params.isEdit && params.defaultValues) {
        await dispatch(
          editUser({
            user: params.defaultValues.id,
            dto: { ...data, profileImage: profileImage }
          })
        )

        await dispatch(refreshCurrentUser(params.defaultValues.id))

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'User Profile', params: { userName: data.userName } }
            ]
          })
        )

        return showSuccess('Seu perfil foi editado com sucesso!')
      }

      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      )

      const authToken = await user.getIdToken()

      await dispatch(
        createUser({
          ...data,
          id: user.uid,
          provider: user.providerId,
          profileImage: profileImage,
          authToken
        })
      )

      await dispatch(loginUser(user.uid, authToken))
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
