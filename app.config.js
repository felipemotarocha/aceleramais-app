const APP_VARIANT = process.env.APP_VARIANT || 'development'

function getEnvironment() {
  return {
    development: { name: '(DEV) Acelera+', package: 'com.aceleramais.dev' },
    production: { name: 'Acelera+', package: 'com.aceleramais.app' }
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
  web: {
    config: {
      firebase: {
        apiKey: 'AIzaSyDL4qI8LKb7-MQCWpf8BYmtP41QPxZCBoY',
        authDomain: 'aceleramais-production-352314.firebaseapp.com',
        projectId: 'aceleramais-production-352314',
        storageBucket: 'aceleramais-production-352314.appspot.com',
        messagingSenderId: '116952032771',
        appId: '1:116952032771:web:26aebe149f5b80cba41036',
        measurementId: 'G-CEX5Q2QXHG'
      }
    }
  },
  ios: {
    icon: './assets/icon.png',
    bundleIdentifier: environment.package,
    googleServicesFile: './GoogleService-Info.plist'
  },
  android: {
    package: environment.package,
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#E10600'
    }
  }
}
