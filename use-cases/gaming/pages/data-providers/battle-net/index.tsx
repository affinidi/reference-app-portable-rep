import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { ROUTES } from 'utils'
import { VerifiableCredential } from 'types/vc'
import useVcProfiles from 'hooks/useVcProfiles'
import { LoadingIcon } from 'assets/loading'
import { DataProvider, initiateDataImport } from 'utils/data-providers'
import { Container, Header, Spinner, Tab } from 'components'

import Starcraft from './components/Starcraft/Starcraft'
import Diablo from './components/Diablo/Diablo'
import WorldOfWarcraft from './components/WorldOfWarcraft/WorldOfWarcraft'
import * as S from './Battlenet.styled'

enum TabsEnum {
  TAB_0,
  TAB_1,
  TAB_2,
}

const BattleNet: FC = () => {
  const { push } = useRouter()
  const { status } = useSession()
  const [vc, setVc] = useState<VerifiableCredential>()
  const { vcs } = useVcProfiles()
  const [activeTab, setActiveTab] = useState(TabsEnum.TAB_0)

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
      <Header title="Battletag" hasBackIcon path={ROUTES.profileSetup} />

      <Container>
        <S.Wrapper>
          <S.LastUpdate direction="row" alignItems="center" gap={8}>
            <S.GrayText variant="p3">
              Last import of Battle.net data: {format(new Date(vc.issuanceDate), 'dd/MM/yyyy')}
            </S.GrayText>

            <S.LoadingWrapper>
              <LoadingIcon onClick={() => initiateDataImport(DataProvider.BATTLE_NET)} />
            </S.LoadingWrapper>
          </S.LastUpdate>

          <S.TabsWrapper value={activeTab} onChange={setActiveTab}>
            <Tab index={TabsEnum.TAB_0}>STARCRAFT II</Tab>
            <Tab index={TabsEnum.TAB_1}>DIABLO III</Tab>
            <Tab index={TabsEnum.TAB_2}>WORLD OF WARCRAFT</Tab>
          </S.TabsWrapper>

          {TabsEnum.TAB_0 === activeTab && <Starcraft data={vcs?.battleNet?.credentialSubject?.games?.starcraft2} />}

          {TabsEnum.TAB_1 === activeTab && <Diablo data={vcs?.battleNet?.credentialSubject?.games?.diablo3} />}

          {TabsEnum.TAB_2 === activeTab && <WorldOfWarcraft data={vcs?.battleNet?.credentialSubject?.games?.worldOfWarcraft} />}
        </S.Wrapper>
      </Container>
    </>
  )
}

export default BattleNet
