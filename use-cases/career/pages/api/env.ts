// backend-only envs

const requiredEnvs = [
  'PROJECT_ID',
  'PROJECT_DID',
  'API_KEY_HASH'
]
const missingEnvs = requiredEnvs.filter((name) => !process.env[name])
if (missingEnvs.length !== 0) {
  throw new Error(
     `Required envs are not provided: ${missingEnvs.join(', ')}. Please check README file.`
  )
}

export const cloudWalletApiUrl = process.env.CLOUD_WALLET_API_URL
export const affinidiIamApiUrl = process.env.AFFINIDI_IAM_API_URL
export const issuanceApiUrl = process.env.ISSUANCE_API_URL

export const projectId = process.env.PROJECT_ID
export const projectDid = process.env.PROJECT_DID
export const apiKeyHash = process.env.API_KEY_HASH

export const authJwtSecret = process.env.AUTH_JWT_SECRET

export const logLevel = process.env.LOG_LEVEL || 'info'
