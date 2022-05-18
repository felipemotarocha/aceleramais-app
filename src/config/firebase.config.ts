import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { FIREBASE_CONFIG } from '~constants/config.constants'

const app = initializeApp(FIREBASE_CONFIG)

export const auth = getAuth()

export default app
