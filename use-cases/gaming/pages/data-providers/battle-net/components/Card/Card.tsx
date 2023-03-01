import * as S from './Card.styled'
import { Box, Typography } from 'components'
import { FC } from 'react'

type CardProps = {
  name: string
  subText?: string
  count?: number | string
}

const Card: FC<CardProps> = ({ count, name, subText }) => (
  <S.Wrapper direction="row" alignItems="center" justifyContent="space-between" gap={16}>
    <Box>
      <Typography variant="p0">{name}</Typography>
      {subText && <S.SubTitle variant="p2">{subText}</S.SubTitle>}
    </Box>

    <Typography variant="h6">{count}</Typography>
  </S.Wrapper>
)

export default Card
