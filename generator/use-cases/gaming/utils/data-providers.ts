import { signIn } from 'next-auth/react'
import { hostUrl } from 'pages/env'

export enum DataProvider {
  BATTLE_NET = 'battleNet',
}

export const dataProviders = [DataProvider.BATTLE_NET]

export const dataProviderVcTypes = {
  [DataProvider.BATTLE_NET]: 'BattleNetProfile',
}

export const DATA_PROVIDER_ROUTES = {
  battleNet: '/data-providers/battle-net',
  battleNetCallback: '/data-providers/battle-net/callback',
}

export const initiateDataImport = async (provider: DataProvider) => {
  if (provider === DataProvider.BATTLE_NET) {
    await signIn('battlenet', { callbackUrl: `${hostUrl}${DATA_PROVIDER_ROUTES.battleNetCallback}` })
  } else {
    throw new Error(`Unknown data provider: ${provider}`)
  }
}
