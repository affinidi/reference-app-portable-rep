// backend-only envs

const requiredEnvs = [
  'PROJECT_ID',
  'PROJECT_DID',
  'API_KEY_HASH',
  'GITHUB_APP_CLIENT_ID',
  'GITHUB_APP_CLIENT_SECRET',
]
const missingEnvs = requiredEnvs.filter((name) => !process.env[name])
if (missingEnvs.length !== 0) {
  throw new Error(
     `Required envs are not provided: ${missingEnvs.join(', ')}. Please check README file.`
  )
}

export const cloudWalletApiUrl = require(process.env.CLOUD_WALLET_API_URL)
export const affinidiIamApiUrl = require(process.env.AFFINIDI_IAM_API_URL)
export const issuanceApiUrl = require(process.env.ISSUANCE_API_URL)

export const projectId = require(process.env.PROJECT_ID)
export const projectDid = require(process.env.PROJECT_DID)
export const apiKeyHash = require(process.env.API_KEY_HASH)

export const authJwtSecret = require(process.env.AUTH_JWT_SECRET)

export const logLevel = process.env.LOG_LEVEL || 'info'

function require<T>(value: T | undefined): T {
  if (!value)
    throw new Error('Environment value is missing')
  return value
}
