import { ROUTES } from '.'
import { signIn } from 'next-auth/react'

export enum DataProvider {
  GITHUB = 'github',
}

export const dataProviders = [DataProvider.GITHUB]

export const dataProviderVcTypes = {
  [DataProvider.GITHUB]: 'GithubProfile',
}

export const DATA_PROVIDER_ROUTES = {
  [DataProvider.GITHUB]: '/data-providers/github',
  githubCallback: '/data-providers/github/callback',
}

export const initiateDataImport = async (provider: DataProvider) => {
  if (provider === DataProvider.GITHUB) {
    await signIn('github', { callbackUrl: ROUTES.githubCallback })
  } else {
    throw new Error(`Unknown data provider: ${provider}`)
  }
}
