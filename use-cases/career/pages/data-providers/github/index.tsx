import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { VerifiableCredential } from 'types/vc'
import useVcProfiles from 'hooks/useVcProfiles'
import { LoadingIcon } from 'assets/loading'
import { Box, Container, Header, Spinner } from 'components'
import { DataProvider, initiateDataImport } from 'utils/data-providers'
import { ErrorCodes } from 'types/error'
import { useAuthContext } from 'hooks/useAuthContext'

import { GeneralInfo } from './components/GeneralInfo/GeneralInfo'
import { SubInfo } from './components/SubInfo/SubInfo'
import { ListInfo } from './components/ListlInfo/ListInfo'

import * as S from './Github.styled'
import { showErrorToast } from 'utils/errorToast'


const Github: FC = () => {
  const { push } = useRouter()
  const [vc, setVc] = useState<VerifiableCredential>()
  const { data, error, isLoading } = useVcProfiles()
  const { setAuthState } = useAuthContext()
  
  useEffect(() => {
    if (!data?.vcs) return

    if (data?.vcs.github) {
      setVc(data?.vcs.github)
    } else {
      push(ROUTES.profileSetup)
    }
  }, [push, data])

  useEffect(() => {
    if (error) {
      if (error?.response?.data?.error?.code === ErrorCodes.JWT_EXPIRED_ERROR) {
        setAuthState((prevState) => ({
          ...prevState,
          authorized: false,
        }))
        push(ROUTES.singIn)
      } else {
        showErrorToast(error)
      }
    }
  }, [error, push, setAuthState])

  if (isLoading || !vc) {
    return <Spinner />
  }

  return (
    <>
      <Header
        title='My GitHub profile'
        hasBackIcon
        path={ROUTES.profileSetup}
      />

      <Container>
        <S.Wrapper>
          <S.LastUpdate direction='row' alignItems='center' gap={8}>
            <S.GrayText variant='p3'>
              Last import of Github data:{' '}
              <b>{format(new Date(vc.issuanceDate), 'dd/MM/yyyy')}</b>
            </S.GrayText>

            <S.LoadingWrapper>
              <LoadingIcon
                onClick={() => initiateDataImport(DataProvider.GITHUB)}
              />
            </S.LoadingWrapper>
          </S.LastUpdate>

          <Box gap={64}>
            <GeneralInfo info={vc.credentialSubject} />

            <SubInfo info={vc.credentialSubject} />

            <ListInfo info={vc.credentialSubject} />
          </Box>
        </S.Wrapper>
      </Container>
    </>
  )
}

export default Github
