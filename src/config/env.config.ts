import * as Updates from 'expo-updates'

export const getEnvironment = () => {
  if (Updates.releaseChannel.startsWith('production')) {
    return {
      env: 'production',
      API_URL: 'https://aceleramais-production.herokuapp.com',
      FIREBASE_CONFIG: {
        apiKey: 'AIzaSyDL4qI8LKb7-MQCWpf8BYmtP41QPxZCBoY',
        authDomain: 'aceleramais-production-352314.firebaseapp.com',
        projectId: 'aceleramais-production-352314',
        storageBucket: 'aceleramais-production-352314.appspot.com',
        messagingSenderId: '116952032771',
        appId: '1:116952032771:web:26aebe149f5b80cba41036',
        measurementId: 'G-CEX5Q2QXHG'
      },
      GOOGLE_EXPO_CLIENT_ID:
        '116952032771-ak6mt9dkmkp0kui3am0rbh77dt7lvl65.apps.googleusercontent.com',
      ANDROID_CLIENT_ID:
        '116952032771-km9e0u63fenub9umn843c5da4eidt4vd.apps.googleusercontent.com',
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
