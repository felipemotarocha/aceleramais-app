const APP_VARIANT = process.env.APP_VARIANT || 'development'

function getEnvironment() {
  return {
    development: {
      name: '(DEV) Acelera+',
      package: 'com.aceleramais.dev',
      androidGoogleServicesFile: './google/google-services-development.json',
      iosGoogleServicesFile: './google/GoogleService-Info-development.plist',
      firebaseConfig: {
        apiKey: 'AIzaSyCiPCh7T7RO9HwljOsPAOw8sczypuhc7qU',
        authDomain: 'aceleramais-development.firebaseapp.com',
        projectId: 'aceleramais-development',
        storageBucket: 'aceleramais-development.appspot.com',
        messagingSenderId: '878035662808',
        appId: '1:878035662808:web:8be3b5e29d7876670b64ad',
        measurementId: 'G-VDPH5KX5CG'
      }
    },
    production: {
      name: 'Acelera+',
      package: 'com.aceleramais.app',
      androidGoogleServicesFile: './google/google-services-production.json',
      iosGoogleServicesFile: './google/GoogleService-Info-production.plist',
      firebaseConfig: {
        apiKey: 'AIzaSyDL4qI8LKb7-MQCWpf8BYmtP41QPxZCBoY',
        authDomain: 'aceleramais-production-352314.firebaseapp.com',
        projectId: 'aceleramais-production-352314',
        storageBucket: 'aceleramais-production-352314.appspot.com',
        messagingSenderId: '116952032771',
        appId: '1:116952032771:web:26aebe149f5b80cba41036',
        measurementId: 'G-CEX5Q2QXHG'
      }
    }
  }[APP_VARIANT]
}

const environment = getEnvironment()

export default {
  name: environment.name,
  slug: 'aceleramais',
  owner: 'aceleramais',
  plugins: ['expo-camera'],
  scheme: 'aceleramais',
  version: '1.0.0',
  icon: './assets/icon.png',
  sdkVersion: '44.0.0',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1C1C1C'
  },
  assetBundlePatterns: ['assets/*'],
  web: {
    config: {
      firebase: environment.firebaseConfig
    }
  },
  ios: {
    icon: './assets/icon.png',
    bundleIdentifier: environment.package,
    googleServicesFile: environment.iosGoogleServicesFile
  },
  android: {
    package: environment.package,
    googleServicesFile: environment.androidGoogleServicesFile,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#E10600'
    }
  }
}
