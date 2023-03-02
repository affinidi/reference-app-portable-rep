import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import useVcProfiles from 'hooks/useVcProfiles'
import { Container, Header, Spinner } from 'components'
import { useAuthContext } from 'hooks/useAuthContext'
import { ErrorCodes } from 'types/error'
import { showErrorToast } from 'utils/errorToast'
import {
  DataProvider,
  dataProviders,
  initiateDataImport,
} from 'utils/data-providers'

import { messages } from './messages'
import { dataProviderComponents } from './data-providers'
import * as S from './ProfileSetup.styled'

const ProfileSetup: FC = () => {
  const { push } = useRouter()
  const { data, error, isLoading } = useVcProfiles()
  const { setAuthState } = useAuthContext()

  async function handleConnect(provider: DataProvider) {
    if (data?.vcs?.[provider]) {
      push(ROUTES[provider])
    } else {
      await initiateDataImport(provider)
    }
  }

  useEffect(() => {
    if (error) {
      if (error?.response?.data?.error?.code === ErrorCodes.JWT_EXPIRED_ERROR) {
        setAuthState((prevState) => ({
          ...prevState,
          authorized: false,
        }))
      } else {
        showErrorToast(error)
      }
    }
  }, [error, push, setAuthState])

  return (
    <>
      <Header title='Setup your profile' />

      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <S.ServiceSelect variant='p1'>{messages.subTitle}</S.ServiceSelect>

            <S.CardRow className='grid lg:grid-cols-3 lg:gap-16'>
              {dataProviders.map((provider) => {
                const DataProviderComponent = dataProviderComponents[provider]
                return (
                  <DataProviderComponent
                    key={provider}
                    vc={data?.vcs[provider]}
                    onConnect={() => handleConnect(provider)}
                  />
                )
              })}
            </S.CardRow>
          </>
        )}
      </Container>
    </>
  )
}

export default ProfileSetup
