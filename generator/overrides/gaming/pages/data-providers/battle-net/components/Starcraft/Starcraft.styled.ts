import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Typography } from 'components'

export const UserInfo = styled(Box)`
  margin-bottom: ${pxToRem(40)};
`

export const Title = styled(Typography)`
  margin: ${pxToRem(64)} 0 ${pxToRem(16)};
`

export const Block = styled(Box)<{ $isBig?: boolean }>`
  padding: ${pxToRem(16)} ${pxToRem(24)};
  border-radius: 8px;
  background: ${props => props.theme.colors.brand.primary['90']};
  
  ${props => props.$isBig && css`
    height: ${pxToRem(192)};
  `}
`

export const BlockTitle = styled(Typography)`
  color: ${props => props.theme.colors.neutral.primary['50']};
`
