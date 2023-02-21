import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { VerifiableCredential } from 'types/vc'
import useVcProfiles from 'hooks/useVcProfiles'
import { Container, Header, Spinner } from 'components'

const BattleNet: FC = () => {
  const { push } = useRouter()
  const { status } = useSession()
  const [vc, setVc] = useState<VerifiableCredential>()
  const { vcs } = useVcProfiles()

  useEffect(() => {
    if (!vcs) return

    if (vcs.battleNet) {
      setVc(vcs.battleNet)
    } else {
      push(ROUTES.profileSetup)
    }
  }, [push, vcs])

  if (status === 'loading' || !vc) {
    return <Spinner />
  }

  return (
    <>
      <Header title="My Battle.net profile" hasBackIcon path={ROUTES.profileSetup} />

      <Container style={{ color: 'white' }}>
        <textarea cols={200} rows={50} value={JSON.stringify(vcs?.battleNet, null, 4)} />
      </Container>
    </>
  )
}

export default BattleNet
