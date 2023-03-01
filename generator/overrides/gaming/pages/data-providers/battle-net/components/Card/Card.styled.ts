import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Typography } from 'components'

export const Wrapper = styled(Box)`
  padding: 0 ${pxToRem(24)};
  min-height: ${pxToRem(72)};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.brand.primary['90']};
`

export const SubTitle = styled(Typography)`
  color: ${props => props.theme.colors.neutral.primary['50']};
`
