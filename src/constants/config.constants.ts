import { getEnvironment } from '~config/env.config'

export const {
  API_URL,
  env,
  GOOGLE_EXPO_CLIENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  FIREBASE_CONFIG,
  AWS_CLOUDFRONT_URL
} = getEnvironment()
