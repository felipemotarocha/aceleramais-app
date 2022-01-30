import * as Updates from 'expo-updates'

export const getEnvironment = () => {
  if (Updates.releaseChannel.startsWith('prd')) {
    return { env: 'PRODUCTION', API_URL: '' }
  }

  return {
    env: 'DEVELOPMENT',
    API_URL: 'http://192.168.15.124:5050'
  }
}
