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
  ios: {
    icon: './assets/icon.png',
    bundleIdentifier: environment.package
  },
  android: {
    package: environment.package,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#E10600'
    }
  }
}
