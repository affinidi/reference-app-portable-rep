import { FC } from 'react'
import Image from 'next/image'
import { Box, Typography } from 'components'
import { DownloadIcon } from 'assets'
import githubIcon from 'public/images/icon-github.svg'

import * as S from './GithubDataProvider.styled'
import { VerifiableCredential } from '../../../types/vc'

interface Props {
  vc?: VerifiableCredential
  onConnect: () => void
}

const GithubDataProvider: FC<Props> = ({ vc, onConnect }) => {
  return (
    <S.CardWrapper onClick={onConnect}>
      <S.CardHeader direction="row" alignItems="center" justifyContent="space-between">
        <Box direction="row" alignItems="center" gap={16}>
          <S.CardIcon>
            <Image src={githubIcon} alt="GitHub" />
          </S.CardIcon>
          <Typography variant="h6">Github</Typography>
        </Box>

        <S.Download isConnected={Boolean(vc)}>
          <DownloadIcon />
        </S.Download>
      </S.CardHeader>
      <Typography variant="p1">
        Harnessed for productivity. Designed for collaboration. Celebrated for
        built-in security.
      </Typography>
    </S.CardWrapper>
  )
}

export default GithubDataProvider
