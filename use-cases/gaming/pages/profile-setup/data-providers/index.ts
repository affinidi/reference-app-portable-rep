import { DataProvider } from 'utils/data-providers'
import BattlenetProvider from './battle-net/BattlenetProvider'

export const dataProviderComponents = {
  [DataProvider.BATTLE_NET]: BattlenetProvider,
}
