import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { ROUTES } from 'utils'
import { DataProvider, initiateDataImport } from 'utils/data-providers'
import { showErrorToast } from 'utils/errorToast'
import { VerifiableCredential } from 'types/vc'
import { ErrorCodes } from 'types/error'
import useVcProfiles from 'hooks/useVcProfiles'
import { useAuthContext } from 'hooks/useAuthContext'
import { LoadingIcon } from 'assets/loading'
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
  const [vc, setVc] = useState<VerifiableCredential>()
  const { data, isLoading, error } = useVcProfiles()
  const [activeTab, setActiveTab] = useState(TabsEnum.TAB_0)
  const { updateAuthState } = useAuthContext()

  useEffect(() => {
    if (!data?.vcs) return

    if (data.vcs.battleNet) {
      setVc(data.vcs.battleNet)
    } else {
      push(ROUTES.profileSetup)
    }
  }, [push, data])

  useEffect(() => {
    if (error) {
      if (error?.response?.data?.error?.code === ErrorCodes.JWT_EXPIRED_ERROR) {
        updateAuthState({
          authorized: false,
        })
      } else {
        showErrorToast(error)
      }
    }
  }, [error, push, updateAuthState])

  if (isLoading || !vc) {
    return <Spinner />
  }

  return (
    <>
      <Header title='Battletag' hasBackIcon path={ROUTES.profileSetup} />

      <Container>
        <S.Wrapper>
          <S.LastUpdate direction='row' alignItems='center' gap={8}>
            <S.GrayText variant='p3'>
              Last import of Battle.net data:{' '}
              {format(new Date(vc.issuanceDate), 'dd/MM/yyyy')}
            </S.GrayText>

            <S.LoadingWrapper>
              <LoadingIcon
                onClick={() => initiateDataImport(DataProvider.BATTLE_NET)}
              />
            </S.LoadingWrapper>
          </S.LastUpdate>

          <S.TabsWrapper value={activeTab} onChange={setActiveTab}>
            <Tab index={TabsEnum.TAB_0}>STARCRAFT II</Tab>
            <Tab index={TabsEnum.TAB_1}>DIABLO III</Tab>
            <Tab index={TabsEnum.TAB_2}>WORLD OF WARCRAFT</Tab>
          </S.TabsWrapper>

          {TabsEnum.TAB_0 === activeTab && (
            <Starcraft data={vc.credentialSubject?.games?.starcraft2} />
          )}

          {TabsEnum.TAB_1 === activeTab && (
            <Diablo data={vc.credentialSubject?.games?.diablo3} />
          )}

          {TabsEnum.TAB_2 === activeTab && (
            <WorldOfWarcraft
              data={vc.credentialSubject?.games?.worldOfWarcraft}
            />
          )}
        </S.Wrapper>
      </Container>
    </>
  )
}

export default BattleNet
