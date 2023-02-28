import { FC } from 'react'

import { Typography } from 'components'
import { DownloadIcon } from 'assets/download'
import { BttlenetIcon } from 'assets/battlenet'
import { VerifiableCredential } from 'types/vc'

import * as S from './BattlenetProvider.styled'

interface Props {
  vc?: VerifiableCredential
  onConnect: () => void
}

const BattlenetProvider: FC<Props> = ({ vc, onConnect }) => (
  <S.CardWrapper onClick={onConnect}>
    <S.CardHeader direction="row" alignItems="center" justifyContent="space-between">
      <BttlenetIcon />

      <S.Download isConnected={Boolean(vc)}>
        <DownloadIcon />
      </S.Download>
    </S.CardHeader>
    <Typography variant="p1">
      Battle.net is your one stop shop into the world of Blizzard and Activision.
    </Typography>
  </S.CardWrapper>
)

export default BattlenetProvider
