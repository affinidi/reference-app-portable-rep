import { FC, ReactNode, useState } from 'react'

import { MinusIcon } from 'assets/minus'
import { AddIcon } from 'assets/add'
import { Box, Typography } from 'components'

import * as S from './Panel.styled'

type PanelProps = {
  title: string
  children: ReactNode
}

const Panel: FC<PanelProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <S.Wrapper onClick={() => setIsOpen(!isOpen)}>
      <S.Header direction="row" alignItems="center" justifyContent="space-between">
        <Box direction="row" alignItems="center" gap={16}>
          <S.AvatarIconWrapper />

          <Typography variant="h7">{title}</Typography>
        </Box>

        {isOpen ? <MinusIcon /> : <AddIcon />}
      </S.Header>

      {isOpen && (
        <S.Content>
          {children}
        </S.Content>
      )}
    </S.Wrapper>
  )
}

export default Panel
