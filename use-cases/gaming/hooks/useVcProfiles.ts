import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { hostUrl } from 'pages/env'
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication'
import { VcProfileMap } from 'types/profile'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse } from 'types/error'

const useVcProfiles = () => {
  return useQuery<{ vcs: VcProfileMap }, ErrorResponse>(
    ['getVcs'],
    async () => {
      const {
        data: { vcs },
      } = await axios(`${hostUrl}/api/profiles/get-vcs`, {
        method: 'GET',
        headers: createCloudWalletAuthenticationHeaders(),
      })

      return { vcs }
    },
    {
      retry: false,
    }
  )
}

export default useVcProfiles
