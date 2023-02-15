import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { hostUrl } from 'pages/env'
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication'
import { VcProfileMap } from 'types/profile'

const useVcProfiles = () => {
  const [vcs, setVcs] = useState<VcProfileMap>()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    async function fetchVcProfiles() {
      const {
        data: { vcs },
      } = await axios(`${hostUrl}/api/profiles/get-vcs`, {
        method: 'GET',
        headers: createCloudWalletAuthenticationHeaders(),
      })

      setVcs(vcs)
    }

    fetchVcProfiles()
  }, [status])

  return { vcs }
}

export default useVcProfiles
