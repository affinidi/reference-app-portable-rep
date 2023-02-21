import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import { ApiError } from '../../../api-error'

export async function authenticateBattleNet(req: NextApiRequest): Promise<string> {
  const session = await getSession({ req })
  const battleNetAccessToken = session?.battleNetAccessToken

  if (!battleNetAccessToken) {
    throw new ApiError({
      code: 'BATTLE_NET_NOT_AUTHENTICATED',
      message: 'Battle.net access token is not present in the cookies',
      httpStatusCode: 401,
    })
  }

  return battleNetAccessToken
}
