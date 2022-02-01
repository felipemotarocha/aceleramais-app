import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCnadeTROOVjZOWcAwBE-oJLc1nkxdh8eI',
  authDomain: 'sim-racer-app.firebaseapp.com',
  projectId: 'sim-racer-app',
  storageBucket: 'sim-racer-app.appspot.com',
  messagingSenderId: '418827833502',
  appId: '1:418827833502:web:aa8921c6e634252408ab8f',
  measurementId: 'G-DMXX0E487E'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()

export default app
