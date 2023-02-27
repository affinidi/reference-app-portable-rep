import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { ErrorResponse } from 'types/error'
import { hostUrl } from 'pages/env'

type VerifyCredentialOutput = {
  isValid: boolean
  errors?: string[]
}


export const useVerifyVcQuery = (data: { hash: string; key: string }) => {
  return useQuery<VerifyCredentialOutput, ErrorResponse>(['verifyVc'], async () => {
    const { data: { isValid, errors } } = await axios<VerifyCredentialOutput>(
      `${hostUrl}/api/verifier/verify-vc`,
      { method: 'POST', data }
    )

    return { isValid, errors }
  }, { enabled: Boolean(data.hash && data.key), retry: false })
}
