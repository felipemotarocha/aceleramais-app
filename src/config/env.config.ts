import * as Updates from 'expo-updates'

export const getEnvironment = () => {
  if (Updates.releaseChannel.startsWith('production')) {
    return {
      env: 'production',
      API_URL: 'https://aceleramais-production.herokuapp.com',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCjWamIffDjvLSoFoY6jR9Py4dMrjB5yc0',
        authDomain: 'aceleramais-94101.firebaseapp.com',
        projectId: 'aceleramais-94101',
        storageBucket: 'aceleramais-94101.appspot.com',
        messagingSenderId: '20063332770',
        appId: '1:20063332770:web:69413a2b31199c3cf26afb',
        measurementId: 'G-CMMHHVG5ST'
      },
      GOOGLE_EXPO_CLIENT_ID:
        '20063332770-unph6kv7ar2pc595joqf0eokvehm75ed.apps.googleusercontent.com',
      ANDROID_CLIENT_ID:
        '20063332770-7kh2sqehdga65f8kgqok735bnqvhdv22.apps.googleusercontent.com',
      AWS_CLOUDFRONT_URL: 'd3g6qzm2mux0or.cloudfront.net'
    }
  }

  if (Updates.releaseChannel.startsWith('development')) {
    return {
      env: 'development',
      API_URL: 'https://aceleramais-development.herokuapp.com',
      GOOGLE_EXPO_CLIENT_ID:
        '878035662808-nr3s966ip9d6i2u2958a5ad2md0koo2n.apps.googleusercontent.com',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyCiPCh7T7RO9HwljOsPAOw8sczypuhc7qU',
        authDomain: 'aceleramais-development.firebaseapp.com',
        projectId: 'aceleramais-development',
        storageBucket: 'aceleramais-development.appspot.com',
        messagingSenderId: '878035662808',
        appId: '1:878035662808:web:8be3b5e29d7876670b64ad'
      },
      ANDROID_CLIENT_ID:
        '878035662808-v5tadrcl52kkld3tci4tqqfstdk6ueia.apps.googleusercontent.com',
      AWS_CLOUDFRONT_URL: 'dtz9w99dxalws.cloudfront.net'
    }
  }

  return {
    env: 'development',
    API_URL: 'http://192.168.15.19:5050',
    GOOGLE_EXPO_CLIENT_ID:
      '878035662808-nr3s966ip9d6i2u2958a5ad2md0koo2n.apps.googleusercontent.com',
    FIREBASE_CONFIG: {
      apiKey: 'AIzaSyCiPCh7T7RO9HwljOsPAOw8sczypuhc7qU',
      authDomain: 'aceleramais-development.firebaseapp.com',
      projectId: 'aceleramais-development',
      storageBucket: 'aceleramais-development.appspot.com',
      messagingSenderId: '878035662808',
      appId: '1:878035662808:web:8be3b5e29d7876670b64ad'
    },
    ANDROID_CLIENT_ID:
      '878035662808-v5tadrcl52kkld3tci4tqqfstdk6ueia.apps.googleusercontent.com',
    AWS_CLOUDFRONT_URL: 'dtz9w99dxalws.cloudfront.net'
  }
}
