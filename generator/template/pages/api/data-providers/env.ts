const requiredEnvs = [
  'GITHUB_APP_CLIENT_ID',
  'GITHUB_APP_CLIENT_SECRET'
]
const missingEnvs = requiredEnvs.filter((name) => !process.env[name])
if (missingEnvs.length !== 0) {
  throw new Error(
     `Required envs are not provided: ${missingEnvs.join(', ')}. Please check README file.`
  )
}

export const githubClientId = process.env.GITHUB_APP_CLIENT_ID!
export const githubClientSecret = process.env.GITHUB_APP_CLIENT_SECRET!
