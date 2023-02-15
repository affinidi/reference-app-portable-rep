export const githubClientId = require(process.env.GITHUB_APP_CLIENT_ID)
export const githubClientSecret = require(process.env.GITHUB_APP_CLIENT_SECRET)

function require<T>(value: T | undefined): T {
  if (!value)
    throw new Error('Environment value is missing')
  return value
}
