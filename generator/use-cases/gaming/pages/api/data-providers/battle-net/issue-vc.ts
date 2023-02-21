import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { use } from 'next-api-middleware'
import { VerifiableCredential } from 'types/vc'
import { allowedHttpMethods } from '../../middlewares/allowed-http-methods'
import { errorHandler } from '../../middlewares/error-handler'
import { cloudWalletClient } from '../../clients/cloud-wallet-client'
import { iamClient } from '../../clients/iam-client'
import { projectDid } from '../../env'
import { gatherBattleNetProfile } from './helpers/gather-battle-net-profile'
import { authenticateBattleNet } from './helpers/authenticate-battle-net'
import { generateBattleNetProfileVc } from './helpers/generate-battle-net-profile-vc'

type HandlerResponse = {
  vc: VerifiableCredential;
};

const requestSchema = z
  .object({
    holderDid: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const battleNetAccessToken = await authenticateBattleNet(req)

  const { holderDid } = requestSchema.parse(req.body)

  const credentialSubject = await gatherBattleNetProfile(battleNetAccessToken)

  const unsignedBattleNetProfileVc = generateBattleNetProfileVc(
    holderDid,
    credentialSubject
  )

  const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { vc } = await cloudWalletClient.signCredential(
    { vc: unsignedBattleNetProfileVc },
    { accessToken: cloudWalletAccessToken }
  )

  res.status(200).json({ vc })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
