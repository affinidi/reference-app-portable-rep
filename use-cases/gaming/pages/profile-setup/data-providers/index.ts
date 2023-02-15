import { DataProvider } from 'utils/data-providers'
import GithubDataProvider from './GithubDataProvider'

export const dataProviderComponents = {
  [DataProvider.GITHUB]: GithubDataProvider,
}
