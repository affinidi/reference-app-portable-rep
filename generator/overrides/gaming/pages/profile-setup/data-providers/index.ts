import { DataProvider } from 'utils/data-providers'
import BattlenetProvider from './BattlenetProvider'

export const dataProviderComponents = {
  [DataProvider.BATTLE_NET]: BattlenetProvider,
}
