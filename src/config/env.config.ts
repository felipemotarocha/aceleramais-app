import * as Updates from 'expo-updates'

export const getEnvironment = () => {
  if (Updates.releaseChannel.startsWith('prd')) {
    return { env: 'PRODUCTION', API_URL: '' }
  }

  return {
    env: 'DEVELOPMENT',
    API_URL: 'http://192.168.15.124:5050',
    GOOGLE_EXPO_CLIENT_ID:
      '277005183601-g1nih0lq8jfsnrc6letqt93u4d8jel9b.apps.googleusercontent.com'
  }
}
