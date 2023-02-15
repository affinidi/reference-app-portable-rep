import { FC } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import useVcProfiles from 'hooks/useVcProfiles'
import { Container, Header, Spinner } from 'components'
import { dataProviderComponents } from './data-providers'
import { DataProvider, dataProviders, initiateDataImport } from 'utils/data-providers'

import * as S from './ProfileSetup.styled'

const ProfileSetup: FC = () => {
  const { push } = useRouter()
  const { vcs } = useVcProfiles()

  async function handleConnect(provider: DataProvider) {
    if (vcs?.[provider]) {
      push(ROUTES[provider])
    } else {
      await initiateDataImport(provider)
    }
  }

  return (
    <>
      <Header title="Setup your profile" />

      <Container>
        {!vcs ? (
          <Spinner />
        ) : (
          <>
            <S.ServiceSelect variant="p1">
              Please select the service that you would like to connect
            </S.ServiceSelect>

            <S.CardRow className="grid lg:grid-cols-3 lg:gap-16">
              {dataProviders.map((provider) => {
                const DataProviderComponent = dataProviderComponents[provider]
                return <DataProviderComponent
                  key={provider}
                  vc={vcs[provider]}
                  onConnect={() => handleConnect(provider)}
                />
              })}
            </S.CardRow>
          </>
        )}
      </Container>
    </>
  )
}

export default ProfileSetup
