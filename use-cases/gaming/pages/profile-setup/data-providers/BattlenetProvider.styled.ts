import styled, { css } from 'styled-components'

import { pxToRem } from '/utils'
import { Box, Card } from 'components'

export const CardWrapper = styled(Card)`
  cursor: pointer;
  
  * {
    cursor: pointer;
  }
`

export const Header = styled(Box)`
  margin-bottom: ${pxToRem(16)};
`

export const Download = styled.div<{ isConnected: boolean }>`
  ${props => props.isConnected && css`
    path {
      fill: ${props.theme.colors.brand.secondary['100']};
    }
  `}
`
