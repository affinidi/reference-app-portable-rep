// https://next-auth.js.org/providers/battle.net
const SUPPORTED_BATTLE_NET_ISSUERS = [
  'https://www.battlenet.com.cn/oauth',
  'https://us.battle.net/oauth',
  'https://eu.battle.net/oauth',
  'https://kr.battle.net/oauth',
  'https://tw.battle.net/oauth',
]
const SUPPORTED_BATTLE_NET_REGIONS = ['eu', 'us', 'kr', 'tw', 'cn']

const requiredEnvs = [
  'BATTLENET_CLIENT_ID',
  'BATTLENET_CLIENT_SECRET',
  'BATTLENET_ISSUER',
  'BATTLENET_REGION',
]

const missingEnvs = requiredEnvs.filter((name) => !process.env[name])
if (missingEnvs.length !== 0) {
  throw new Error(`Required envs are not provided: ${missingEnvs.join(', ')}. Please check README file.`)
}

export const battleNetClientId = process.env.BATTLENET_CLIENT_ID!
export const battleNetClientSecret = process.env.BATTLENET_CLIENT_SECRET!
export const battleNetIssuer = process.env.BATTLENET_ISSUER!
export const battleNetRegion = process.env.BATTLENET_REGION!

if (!SUPPORTED_BATTLE_NET_ISSUERS.includes(battleNetIssuer)) {
  throw new Error('Invalid Battle.net issuer, please check README file.')
}

if (!SUPPORTED_BATTLE_NET_REGIONS.includes(battleNetRegion)) {
  throw new Error('Invalid Battle.net region, please check README file.')
}
